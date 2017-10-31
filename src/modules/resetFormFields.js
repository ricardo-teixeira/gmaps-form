const resetFormFields = (form) => {
  Object.keys(form.elements).forEach((name) => {
    if (name) {
      form.elements[name].value = ''
    }
  });
};

export { resetFormFields };