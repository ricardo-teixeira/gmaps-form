const Field = (props) => {
  const defaults = {
    value: '',
    required: true,
    onChange: new Function()
  };

  return Object.assign({}, defaults, props);
};

export { Field };