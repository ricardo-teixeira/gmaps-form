function Field (props) {
  var defaults = {
    value: '',
    required: true,
    onChange: function () {}
  };
  return Object.assign({}, defaults, props);
}

const FORM_FIELDS_SCHEMA = {
  street: new Field(),
  country: new Field(),
  state: new Field(),
  city: new Field(),
  neighborhood: new Field({ required: false }),
  postal_code: new Field(),
  lat: new Field(),
  lng: new Field()
};

module.exports = FORM_FIELDS_SCHEMA;