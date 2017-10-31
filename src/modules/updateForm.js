import FORM_FIELDS_SCHEMA from './formFieldsSchema';
import { printBasicAddress } from './printBasicAddress';
import { addFormInput } from './addFormInput';

const updateForm = (fields) =>
  (form) => {
    if (fields) {
      const address = { ...FORM_FIELDS_SCHEMA, ...fields };

      Object.keys(address).forEach(function (field) {
        const element = form.elements[field];

        if (element) {
          form.elements[field].value = fields[field] || '';
        } else {
          addFormInput(field, fields[field])(form);
        }
      });

      printBasicAddress(address);
    }
  };

export { updateForm };