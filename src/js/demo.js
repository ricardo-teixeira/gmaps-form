(function () {
  var $exampleForm = document.getElementById('exampleForm');
  var $submitResults = document.getElementById('submitResults');
  var $newAddressBtn = document.getElementById('addNewAddress');

  var initialData = {
    pais: 'Brasil',
    estado: 'São Paulo',
    cidade: 'Campinas',
    lat: -22.885093680732655,
    lng: -47.007358083605936
  };

  var mappedData = mapFormValuesToApiProps(initialData);
  applyValuesValues(initialData);

  document.addEventListener('DOMContentLoaded', function () {
    var data = getFormValues();
    var formatted = mapFormValuesToApiProps(data);

    mapsAddressFinder(formatted, function (values) {
      applyValuesValues(mapFormValuesToApiProps(values, true));
    });

    $('#mapsModal').modal('show');
  });

  $newAddressBtn.addEventListener('click', function () {
    var data = getFormValues();
    var formatted = mapFormValuesToApiProps(data);

    mapsAddressFinder(formatted, function (values) {
      applyValuesValues(mapFormValuesToApiProps(values, true));
    });
  });

  $exampleForm.addEventListener('submit', function (e) {
    e.preventDefault();
    var values = getFormValues();
    $submitResults.innerHTML = '<pre>' + syntaxHighlight(values) + '</pre>';
  });

  function mapFormValuesToApiProps (values, reverse) {
    var mappedObj = {};
    var keyMap = {
      pais: 'country',
      estado: 'state',
      cidade: 'city',
      bairro: 'neighborhood',
      rua: 'street',
      cep: 'postal_code',
      lat: 'lat',
      lng: 'lng'
    };

    if (reverse) {
      Object.keys(keyMap).forEach(function (key) {
        if (values[keyMap[key]]) {
          mappedObj[key] = values[keyMap[key]];
        }
      });
    } else {
      Object.keys(values).forEach(function (key) {
        if (values[key]) {
          mappedObj[keyMap[key]] = values[key];
        }
      });
    }

    return mappedObj;
  }

  function applyValuesValues (values) {
    Object.keys(values).forEach(function (key) {
      $exampleForm.elements[key].value = values[key];
    });
  }

  function getFormValues (values) {
    var values = {};
    Array.prototype.forEach.call($exampleForm.elements, function (element) {
      if (element.name) {
        values[element.name] = element.value;
      }
    });

    return values;
  }

  function syntaxHighlight (json) {
    if (typeof json != 'string') {
      json = JSON.stringify(json, undefined, 2);
    }
    json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
      var cls = 'number';
      if (/^"/.test(match)) {
        if (/:$/.test(match)) {
          cls = 'key';
        } else {
          cls = 'string';
        }
      } else if (/true|false/.test(match)) {
        cls = 'boolean';
      } else if (/null/.test(match)) {
        cls = 'null';
      }
      return '<span class="' + cls + '">' + match + '</span>';
    });
  }

})();