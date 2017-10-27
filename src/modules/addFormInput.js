import { form } from './selectors'

const addFormInput = (name, value) => {
  var input = document.createElement('input');
  input.type = 'hidden';
  input.name = name;
  input.value = value;
  form.appendChild(input);
}

export { addFormInput }