import { clearFormErrors } from './clearFormErrors';
import { createErrorElement } from './createErrorElement';
import { form } from './selectors';

const showFormErrors = (errors) => {
  clearFormErrors();

  errors.forEach((error) => {
    const $field = $(form.elements[error.name]);
    const $fieldContainer = $field.closest('.form-group');

    $fieldContainer.addClass('is-invalid');
    $fieldContainer.append(createErrorElement(error.error));
  });
};

export { showFormErrors };