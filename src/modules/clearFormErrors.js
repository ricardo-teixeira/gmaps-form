import { form } from './selectors';

const clearFormErrors = () => {
  const $errors = form.querySelectorAll('.form-error');

  $errors.forEach((error) => {
    error.remove();
  });
};

export { clearFormErrors };