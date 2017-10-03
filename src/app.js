(function (win, doc) {
  "use strict"

  var $form = doc.getElementById('mapsForm');
  var $modal = $('#mapsModal');
  var map, marker, autocomplete, geocoder;
  var initialData = {
    lat: -22.889765,
    lng: -47.046664
  }

  var defaultFormFields = {
    street: '',
    country: 'BR',
    state: 'SP',
    city: 'Campinas',
    neighborhood: '',
    cep: '',
    lat: '',
    lng: ''
  }

  var formFieldsMap = {
    route: ['long_name', 'street'],
    country: ['short_name', 'country'],
    administrative_area_level_2: ['long_name', 'city'],
    administrative_area_level_1: ['short_name', 'state'],
    political: ['long_name', 'neighborhood'],
    postal_code: ['long_name', 'cep']
  }

  /****************************/
  
  $.when(getCountries(), getStates(), getCities()).then(function () {
    setTimeout(function () {
      updateForm(defaultFormFields);
    }, 100)
  })

  function getCountries () {
    $.ajax({
      method: 'GET',
      url: 'src/json/countries.json'
    }).then(function (response) {
      var $countriesSelect = $form.querySelector('[name="country"]')
      var $countryList = '<option value="">Selecione</option>';
      response.forEach(function (country) {
        return $countryList += '<option value="' + country.iso + '">' + country.name + '</option>';
      })

      $countriesSelect.innerHTML = $countryList;
    })
  }

  function getStates () {
    $.ajax({
      method: 'GET',
      url: 'src/json/states.json'
    }).then(function (response) {
      var $statesSelect = $form.querySelector('[name="state"]')
      var $stateList = '<option value="">Selecione</option>';
      response.forEach(function (state) {
        return $stateList += '<option value="' + state.code + '">' + state.name + '</option>';
      })

      $statesSelect.innerHTML = $stateList;
    })
  }

  function getCities () {
    $.ajax({
      method: 'GET',
      url: 'src/json/cities.json'
    }).then(function (response) {
      var $citiesSelect = $form.querySelector('[name="city"]')
      var $cityList = '<option value="">Selecione</option>';
      response.forEach(function (city) {
        return $cityList += '<option value="' + city.name + '">' + city.name + '</option>';
      })

      $citiesSelect.innerHTML = $cityList;
    })
  }

  /****************************/

  function updateForm (fields) {
    if (fields) {
      var address = Object.assign({}, defaultFormFields, fields);

      Object.keys(address).forEach(function (field) {
        var element = $form.elements[field];
        if (element) {
          $form.elements[field].value = fields[field] || '';
        }
      })
    }
  }

  function geocodePosition (pos) {
    geocoder.geocode({
      latLng: pos
    }, function (responses) {
      // resetMapPosition(pos);
      if (responses && responses.length > 0) {
        var address = mapApiToFormFields(responses[0]);
        address.lat = pos.lat;
        address.lng = pos.lng;
        updateForm(address);
      }
    });
  }

  function handleMarkerDrag (evt) {
    var latLng = {
      lat: evt.latLng.lat(),
      lng: evt.latLng.lng()
    }
    geocodePosition(latLng);
  }

  function cleanErrors () {
    var $errorsText = $form.querySelectorAll('.text-danger');
    var $errorsClass = $form.querySelectorAll('.is-invalid');

    $errorsText.forEach((error) => {
      error.remove();
    })

    $errorsClass.forEach((error) => {
      error.classList.remove('is-invalid');
    })
  }

  function resetMapPosition (pos) {
    google.maps.event.trigger(map, "resize");
    map.setCenter(pos);
    marker.setPosition(pos);
  }

  function validateForm () {
    cleanErrors();
    // TODO: Validate form
    console.warn('TODO: Validate form')

    var formFields = {};
    Object.keys(defaultFormFields).forEach(function (key) {
      var field = $form.elements[key];
      if (field) {
        formFields[key] = $form.elements[key].value;
      }
    })

    var latLng = {
      lat: parseFloat(formFields.lat),
      lng: parseFloat(formFields.lng)
    };

    geocoder.geocode({ 'location': latLng }, function (results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        var address = mapApiToFormFields(results[0]);

        if (address.street != '' && address.street != formFields.street) {
          $form.insertAdjacentHTML('afterend', '<small class="text-danger mt-2">Logradouro incorreto</small>')
        }

        if (address.neighborhood != '' && address.neighborhood != formFields.neighborhood) {
          $form.insertAdjacentHTML('afterend', '<div class="is-invalid"><small class="text-danger mt-2">Bairro incorreto</small></div>')
        }

        if (address.cep != '' && address.cep != formFields.cep) {
          $form.insertAdjacentHTML('afterend', '<div class="is-invalid"><small class="text-danger mt-2">Bairro incorreto</small></div>')
        }
      } else {
        console.error('Nenhum resultado encontrado')
        // $nameField.classList.add('is-invalid');
        // $nameField.insertAdjacentHTML('afterend', '<small class="text-danger mt-2">Endereço não encontrado</small>')
      }
    });

    var isValid = true;
    return isValid;
  }

  function handleSubmit (e) {
    e.preventDefault();
    var valid = validateForm();

    if (valid) {
      var $nameField = $form.querySelector('[name="address"]');
  
      var addressString = '';

      var formFields = {};
      Object.keys(defaultFormFields).forEach(function (key) {
        var field = $form.elements[key];
        if (field) {
          formFields[key] = $form.elements[key].value;
        }
      })
  
      console.log('formFields', formFields)
      return
    }
  }

  function handleAutocomplete () {
    var place = autocomplete.getPlace();
    if (Object.keys(place).length > 1) {
      var address = mapApiToFormFields(place)
      updateForm(address)
      geocodePosition({ lat: address.lat, lng: address.lng })
    }
  }

  function findLocation (value) {
      geocoder.geocode({ 'address': value }, function (results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
          debugger
          var location = results[0].geometry.location;
          resetMapPosition({lat: location.lat(), lng: location.lng()})
          // map.setCenter(location);
          // marker.setPosition(location);
          var address = mapApiToFormFields(results[0]);
          updateForm(address);
        } else {
          console.error('Nenhum resultado encontrado')
          // $nameField.classList.add('is-invalid');
          // $nameField.insertAdjacentHTML('afterend', '<small class="text-danger mt-2">Endereço não encontrado</small>')
        }
      });
  }

  function mapApiToFormFields (place) {
    var address = {};
    address.lat = place.geometry.location.lat();
    address.lng = place.geometry.location.lng();

    for (var i = 0; i < place.address_components.length; i++) {
      var addressType = place.address_components[i].types[0];
      if (formFieldsMap[addressType]) {
        var addressApiProp = formFieldsMap[addressType][0];
        var value = place.address_components[i][addressApiProp];
        address[formFieldsMap[addressType][1]] = value;
      }
    }

    return address;
  }

  function initMap () {
    var latLng = {
      lat: initialData.lat,
      lng: initialData.lng
    };

    geocoder = new google.maps.Geocoder();
    map = new google.maps.Map(doc.getElementById('map'), {
      center: latLng,
      zoom: 11,
      mapTypeControl: true,
      mapTypeControlOptions: {
        position: google.maps.ControlPosition.TOP_CENTER
      },
      fullscreenControl: false
    });

    marker = new google.maps.Marker({
      position: latLng,
      map: map,
      draggable: true
    });

    google.maps.event.addListener(marker, 'dragend', handleMarkerDrag);

    google.maps.event.addListener(map, 'tilesloaded', function (e) {
      var $loading = document.getElementById('mapsLoading');
      if ($loading) {
        $loading.remove();
      }
    });

    autocomplete = new google.maps.places.Autocomplete((document.getElementById('autocomplete')), { types: ['geocode'] });
    autocomplete.addListener('place_changed', handleAutocomplete);

    $form.addEventListener('submit', handleSubmit);
    $form.addEventListener('change', function (e) {
      
      console.dir(e.target.name)
      switch(e.target.name) {
        case 'cep':
          findLocation(e.target.value);
        default:
          return false; 
      }
    });

    $modal.modal('show').on("shown.bs.modal", function () {
      resetMapPosition({
        lat: initialData.lat,
        lng: initialData.lng
      })
    });
  }

  doc.addEventListener('DOMContentLoaded', initMap)
})(window, document)