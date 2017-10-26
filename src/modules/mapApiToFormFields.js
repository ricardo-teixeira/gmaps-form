import { FORM_FIELDS_MAPPER } from './formFieldsMapper'

const mapApiToFormFields = (place) => {
  var address = {};
  address.lat = place.geometry.location.lat();
  address.lng = place.geometry.location.lng();

  place.address_components.forEach(function (component) {
    var formField;

    component.types.forEach(function (type) {
      if (FORM_FIELDS_MAPPER[type]) {
        formField = Object.assign({}, FORM_FIELDS_MAPPER[type]);
      }
    });

    if (formField) {
      var value = (component[formField.value] && component[formField.value] != 'Unnamed Road') ? component[formField.value] : '';
      address[formField.alias] = value;
    }
  });

  return address;
}

export { mapApiToFormFields }