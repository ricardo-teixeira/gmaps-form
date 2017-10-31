const clearFormErrors = (form) => {
  const $errors = form.querySelectorAll('.form-error');

  $errors.forEach((error) => {
    error.remove();
  });
};

export { clearFormErrors };