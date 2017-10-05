(function () {
  var $exampleForm = document.getElementById('exampleForm');
  var $newAddressBtn = document.getElementById('addNewAddress');

  var data = {
    street: 'Mário Carniceli',
    country: 'BR',
    state: 'SP',
    city: 'Campinas'
  }

  applyValuesValues(data);

  $newAddressBtn.addEventListener('click', function () {
    mapsAddressFinder(data, applyValuesValues);
  });

  function applyValuesValues (values) {
    Object.keys(values).forEach(function (key) {
      $exampleForm.elements[key].value = values[key];
    });
  }

})();