const setFormUntouched = (fields) => {
  Object.keys(fields).forEach((name) => {
    const field = fields[name];
    if (field) {
      field.touched = false;
    }
  });

  console.log(fields)
  return fields;
}

export { setFormUntouched };