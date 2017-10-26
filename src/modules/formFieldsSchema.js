function Field (props) {
  const defaults = {
    value: '',
    required: true,
    onChange: function () {}
  };
  return Object.assign({}, defaults, props);
}

const FORM_FIELDS_SCHEMA = {
  street: new Field(),
  number: new Field(),
  country: new Field(),
  state: new Field(),
  city: new Field(),
  neighborhood: new Field({ required: false }),
  postal_code: new Field(),
  lat: new Field(),
  lng: new Field()
};

export { FORM_FIELDS_SCHEMA }