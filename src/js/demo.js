let $exampleForm = document.getElementById('exampleForm');
let $submitResultsLeft = document.getElementById('submitResultsLeft');
let $submitResultsRight = document.getElementById('submitResultsRight');
let $newAddressBtn = document.getElementById('addNewAddress');

let initialData = {
  pais: 'Brasil',
  estado: 'São Paulo',
  cidade: 'Campinas',
  lat: -22.843125677855074,
  lng: -47.00317025184631
};

let mappedData = mapFormValuesToApiProps(initialData);
applyValuesValues(initialData);

document.addEventListener('DOMContentLoaded', function () {
  let data = getFormValues();
  let formatted = mapFormValuesToApiProps(data);

  mapsAddressFinder(formatted, function (values) {
    applyValuesValues(mapFormValuesToApiProps(values, true));
    $submitResultsLeft.innerHTML = '<pre><strong>Maps API values</strong>\n' + syntaxHighlight(values) + '</pre>';
  });

  $('#mapsModal').modal('show');
});

$newAddressBtn.addEventListener('click', function () {
  let data = getFormValues();
  let formatted = mapFormValuesToApiProps(data);

  mapsAddressFinder(formatted, function (values) {
    let formattedResponse = mapFormValuesToApiProps(values, true);
    applyValuesValues(formattedResponse);
  });
});

$exampleForm.addEventListener('submit', function (e) {
  e.preventDefault();
  let values = getFormValues();
  $submitResultsRight.innerHTML = '<pre><strong>Submit Values</strong>\n' + syntaxHighlight(values) + '</pre>';
});

function mapFormValuesToApiProps (values, reverse) {
  let mappedObj = {};
  let keyMap = {
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
    let cls = 'number';
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