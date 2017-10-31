import { FORM_FIELDS_MAPPER } from './formFieldsMapper';

const mapApiToFormFields = (place) => {
  const address = {
    lat: place.geometry.location.lat(),
    lng: place.geometry.location.lng()
  };

  place.address_components.forEach((component) => {
    let formField;

    component.types.forEach(function (type) {
      if (FORM_FIELDS_MAPPER[type]) {
        formField = {...FORM_FIELDS_MAPPER[type]};
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