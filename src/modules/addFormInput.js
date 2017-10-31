const addFormInput = (name, value) => {
  const input = document.createElement('input');
  input.type = 'hidden';
  input.name = name;
  input.value = value;
  return (form) => form.appendChild(input);
};

export { addFormInput };