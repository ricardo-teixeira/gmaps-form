import { FORM_FIELDS_SCHEMA } from './formFieldsSchema';
import { validatePostalCode } from './validatePostalCode';
import { showFormErrors } from './showFormErrors';
import { form } from './selectors';

const validateRequiredFields = (formValues) => {
  const invalidFields = [];

  Object.keys(formValues).forEach(function (name) {
    const $field = form.elements[name];

    if ($field.type != 'hidden' && FORM_FIELDS_SCHEMA[name].required) {
      const value = $field.value;
      let valid = true;
      let error = '';

      if (!value) {
        valid = false;
        error = 'Obrigatório';
      } else if (name == 'postal_code') {
        if (!validatePostalCode(value, formValues.country)) {
          valid = false;
          error = 'Código postal inválido';
        }
      }

      if (!valid) {
        invalidFields.push({name, error});
      }
    }
  });

  showFormErrors(invalidFields);

  return invalidFields.length == 0;
};

export { validateRequiredFields };