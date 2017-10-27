import { form } from './selectors'

const getFormValues = () => {
  var values = {};

  Array.prototype.forEach.call(form.elements, function (element) {
    if (element.name) {
      values[element.name] = element.value;
    }
  });

  return values;
}

export { getFormValues }