const setFormUntouched = (fields) => {
  Object.keys(fields).forEach((name) => {
    fields[name] = false;
  });

  return fields;
}

export { setFormUntouched };