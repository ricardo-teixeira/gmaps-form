import FORM_FIELDS_SCHEMA from './formFieldsSchema'
import { printBasicLocation } from './printBasicLocation'
import { addFormInput } from './addFormInput'
import { form } from './selectors'

const updateForm = (fields) => {
  if (fields) {
    const address = Object.assign({}, FORM_FIELDS_SCHEMA, fields);

    Object.keys(address).forEach(function (field) {
      const element = form.elements[field];
      if (element) {
        form.elements[field].value = fields[field] || '';
      } else {
        addFormInput(field, fields[field]);
      }
    });

    printBasicLocation();
  }
}

export { updateForm };