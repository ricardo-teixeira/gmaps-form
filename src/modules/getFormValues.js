
const getFormValues = (form) => {
  const values = {};

  Array.prototype.forEach.call(form.elements, function (element) {
    if (element.name) {
      values[element.name] = element.value;
    }
  });

  return values;
};

export { getFormValues };