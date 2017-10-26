import { form } from './selectors'

const clearFormErrors = () => {
  const $errorsText = form.querySelectorAll('.text-danger');
  const $errorsClass = form.querySelectorAll('.is-invalid');

  $errorsText.forEach(function (error) {
    error.remove();
  });

  $errorsClass.forEach(function (error) {
    error.classList.remove('is-invalid');
  });
}

export { clearFormErrors }