const mergedTouchedWithValues = (values, touched) => {
  const fields = {};

  Object.keys(values).forEach((name) => {
    fields[name] = {
      value: values[name],
      touched: touched[name] || false
    }
  });

  return fields;
};

export { mergedTouchedWithValues };