import { FORM_FIELDS_MAPPER } from './formFieldsMapper';

const mapApiToFormFields = (place) => {
  let address = {};
  address.lat = place.geometry.location.lat();
  address.lng = place.geometry.location.lng();

  place.address_components.forEach(function (component) {
    let formField;

    component.types.forEach(function (type) {
      if (FORM_FIELDS_MAPPER[type]) {
        formField = Object.assign({}, FORM_FIELDS_MAPPER[type]);
      }
    });

    if (formField) {
      const componentValue = component[formField.value];
      const value = (componentValue && componentValue != 'Unnamed Road') ? componentValue : '';
      address[formField.alias] = value;
    }
  });

  return address;
};

export { mapApiToFormFields };