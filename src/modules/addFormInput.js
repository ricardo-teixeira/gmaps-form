import { form } from './selectors'

function addFormInput (name, value) {
  var input = document.createElement('input');
  input.type = 'hidden';
  input.name = name;
  input.value = value;
  form.appendChild(input);
}

export { addFormInput }