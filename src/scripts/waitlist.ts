import { checkEmail, type WaitlistResponse, type WaitlistStatus } from '@/lib/email';

type State = 'idle' | 'invalid' | 'loading' | 'duplicate' | 'error' | 'success';

interface Messages {
  required: string;
  invalid: string;
  tooLong: string;
  server: string;
  network: string;
  rateLimited: string;
  duplicate: string;
  successBody: string;
}

const REQUEST_TIMEOUT_MS = 12_000;

/**
 * Progressive waitlist form: validates in the browser with the same rules as the
 * API, then shows success only after the server confirms the row was stored.
 */
export function initWaitlistForm(form: HTMLFormElement): void {
  const input = form.querySelector<HTMLInputElement>('input[name="email"]');
  const honeypot = form.querySelector<HTMLInputElement>('input[name="website"]');
  const button = form.querySelector<HTMLButtonElement>('[data-submit]');
  const label = form.querySelector<HTMLElement>('[data-label]');
  const message = form.querySelector<HTMLElement>('[data-message]');
  const success = form.parentElement?.querySelector<HTMLElement>('[data-success]');
  const successBody = success?.querySelector<HTMLElement>('[data-success-body]');
  if (!input || !button || !label || !message || !success || !successBody) return;

  const messages = JSON.parse(form.dataset.messages ?? '{}') as Messages;
  let attempted = false;
  let busy = false;

  const setState = (state: State, text = '') => {
    form.dataset.state = state;
    message.textContent = text;
    message.dataset.tone = state === 'duplicate' ? 'info' : state === 'invalid' || state === 'error' ? 'error' : '';
    const invalid = state === 'invalid';
    input.setAttribute('aria-invalid', String(invalid));

    const loading = state === 'loading';
    button.setAttribute('aria-disabled', String(loading));
    form.setAttribute('aria-busy', String(loading));
    label.textContent = (loading ? label.dataset.loading : label.dataset.idle) ?? '';
  };

  const validate = (): string | null => {
    const result = checkEmail(input.value);
    if (result.ok) return result.email;
    setState('invalid', messages[result.reason]);
    return null;
  };

  // After the first attempt, re-check as the visitor types so the error clears on its own.
  input.addEventListener('input', () => {
    if (!attempted) return;
    const result = checkEmail(input.value);
    if (result.ok) setState('idle');
    else if (form.dataset.state === 'invalid') message.textContent = messages[result.reason];
  });

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (busy) return;
    attempted = true;

    const email = validate();
    if (!email) {
      input.focus();
      return;
    }

    busy = true;
    setState('loading');
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

    let status: WaitlistStatus | 'network' = 'server';
    try {
      const response = await fetch(form.action, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ email, website: honeypot?.value ?? '' }),
        signal: controller.signal,
      });
      const data = (await response.json().catch(() => null)) as WaitlistResponse | null;
      status = data?.status ?? 'server';
      // Only a 201 with "success" counts as a confirmed registration.
      if (status === 'success' && response.status !== 201) status = 'server';
    } catch {
      status = 'network';
    } finally {
      window.clearTimeout(timeout);
      busy = false;
    }

    switch (status) {
      case 'success': {
        successBody.textContent = messages.successBody.replace('{email}', email);
        form.hidden = true;
        success.hidden = false;
        success.focus();
        break;
      }
      case 'duplicate':
        setState('duplicate', messages.duplicate);
        break;
      case 'invalid':
      case 'required':
      case 'tooLong':
        setState('invalid', messages[status]);
        input.focus();
        break;
      case 'rateLimited':
        setState('error', messages.rateLimited);
        break;
      case 'network':
        setState('error', messages.network);
        break;
      default:
        setState('error', messages.server);
    }
  });
}
