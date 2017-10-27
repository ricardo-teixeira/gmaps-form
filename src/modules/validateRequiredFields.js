import { FORM_FIELDS_SCHEMA } from './formFieldsSchema';
import { clearFormErrors } from './clearFormErrors';
import { createErrorElement } from './createErrorElement';
import { validatePostalCode } from './validatePostalCode';
import { form } from './selectors';

const validateRequiredFields = (values) => {
  clearFormErrors();
  let invalidFields = [];

  Object.keys(values).forEach(function (key) {
    let $field = form.elements[key];
    if ($field.type != 'hidden' && FORM_FIELDS_SCHEMA[key].required) {
      let valid = true;
      let error = '';

      if (!$field.value) {
        valid = false;
        error = 'Obrigatório';
      } else if ($field.name == 'postal_code') {
        if (!validatePostalCode($field.value, values.country)) {
          valid = false;
          error = 'Código postal inválido';
        }
      }

      if (!valid) {
        invalidFields.push(key);
        $field.classList.add('is-invalid');
        $field.parentNode.insertAdjacentHTML('beforeend', createErrorElement(error));
      }
    }
  });

  return invalidFields.length == 0;
};

export { validateRequiredFields };