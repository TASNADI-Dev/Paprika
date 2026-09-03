/** Submits the quote form via FormSubmit AJAX and shows an inline success state. */

const root = document.querySelector<HTMLElement>('[data-quote-form]');
const form = root?.querySelector<HTMLFormElement>('[data-quote-form-fields]');
const success = root?.querySelector<HTMLElement>('[data-quote-form-success]');
const errorEl = root?.querySelector<HTMLElement>('[data-quote-form-error]');
const submitBtn = form?.querySelector<HTMLButtonElement>('button[type="submit"]');

if (root && form && success && errorEl && submitBtn) {
  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    errorEl.hidden = true;

    const defaultLabel = submitBtn.textContent;
    submitBtn.disabled = true;
    submitBtn.textContent = 'Submitting…';

    try {
      const response = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' },
      });

      if (!response.ok) throw new Error('FormSubmit request failed');

      form.hidden = true;
      success.hidden = false;
      success.focus();
    } catch {
      errorEl.hidden = false;
      submitBtn.disabled = false;
      submitBtn.textContent = defaultLabel;
    }
  });
}
