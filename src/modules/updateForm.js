var FORM_FIELDS_SCHEMA = require('../modules/formFieldsSchema');

function updateForm (form, fields) {
  if (fields) {
    var address = Object.assign({}, FORM_FIELDS_SCHEMA, fields);

    Object.keys(address).forEach(function (field) {
      var element = form.elements[field];
      if (element) {
        form.elements[field].value = (fields[field] && fields[field] != 'Unnamed Road') ? fields[field] : '';
      }
    });

    return fields;
  }
}

module.exports = updateForm;