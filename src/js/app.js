(function (win, doc) {
  'use strict';

  var $form = doc.getElementById('mapsForm');
  var $modal = $('#mapsModal');
  var map, marker, autocomplete, geocoder;
  var initialData = {};

  function Field (props) {
    var defaults = {
      value: '',
      required: true,
      onChange: function () { }
    }
    return Object.assign({}, defaults, props);
  }

  var FORM_FIELDS_SCHEMA = {
    street: new Field(),
    country: new Field(),
    state: new Field(),
    city: new Field(),
    neighborhood: new Field({ required: false }),
    cep: new Field({
      onChange: function (e) { findLocation(e.target.value); }
    }),
    lat: new Field(),
    lng: new Field()
  }

  var FORM_FIELDS_MAP = {
    route: ['long_name', 'street'],
    country: ['short_name', 'country'],
    administrative_area_level_2: ['long_name', 'city'],
    administrative_area_level_1: ['short_name', 'state'],
    sublocality_level_1: ['long_name', 'neighborhood'],
    postal_code: ['long_name', 'cep']
  };
  /****************************/

  function fetchBasicFields () {
    $.when(getCountries(), getStates(), getCities()).then(function () {
      setTimeout(function () {
        updateForm(initialData);
      }, 1000);
    });
  }

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
    });
  }
  /****************************/

  function updateForm (fields) {
    if (fields) {
      var address = Object.assign({}, FORM_FIELDS_SCHEMA, fields);

      Object.keys(address).forEach(function (field) {
        var element = $form.elements[field];
        if (element) {
          $form.elements[field].value = (fields[field] && fields[field] != 'Unnamed Road') ? fields[field] : '';
        }
      });
    }
  }

  function geocodePosition (pos) {
    geocoder.geocode({
      latLng: pos
    }, function (responses) {
      if (responses && responses.length > 0) {
        var address = mapApiToFormFields(responses[0]);
        address.lat = pos.lat;
        address.lng = pos.lng;
        updateForm(address);
        resetMapPosition(pos, true);
      }
    });
  }

  function handleMarkerDrag (e) {
    var latLng = {
      lat: e.latLng.lat(),
      lng: e.latLng.lng()
    }
    geocodePosition(latLng);
  }

  function cleanFormErrors () {
    var $errorsText = $form.querySelectorAll('.text-danger');
    var $errorsClass = $form.querySelectorAll('.is-invalid');

    $errorsText.forEach(function (error) {
      error.remove();
    });

    $errorsClass.forEach(function (error) {
      error.classList.remove('is-invalid');
    });
  }

  function resetMapPosition (pos, zoom) {
    if (pos.lat && pos.lng) {
      map.setCenter(pos);
      marker.setPosition(pos);
      if (zoom) {
        map.setZoom(19);
      }
    }
  }

  function getFormValues () {
    var values = {};
    Object.keys(FORM_FIELDS_SCHEMA).forEach(function (key) {
      var field = $form.elements[key];
      if (field) {
        values[key] = $form.elements[key].value;
      }
    });

    return values;
  }

  function validateForm () {
    cleanFormErrors();

    var formValues = getFormValues();
    var isValid = Object.keys(formValues).every(function (key) {
      return !!formValues[key] || !FORM_FIELDS_SCHEMA[key].required;
    });

    return $.Deferred(function () {
      var self = this;

      if (!isValid) {
        Object.keys(formValues).forEach(function (key) {
          var $field = $form.elements[key];

          if (!$field.value && $field.type != 'hidden' && FORM_FIELDS_SCHEMA[key].required) {
            $field.classList.add('is-invalid');
            $field.parentNode.insertAdjacentHTML('afterend', '<small class="text-danger mt-2">Obrigatório</small>');
          }
          return !!formValues[key];
        });
        return self.resolve(false);
      }

      return validateAddressAsync(formValues).then(function () {
        return self.resolve(isValid);
      }).fail(function () {
        return self.reject(false);
      });

    });
  }

  function validateAddressAsync (address) {
    return $.Deferred(function () {
      var self = this;
      var latLng = {
        lat: parseFloat(address.lat),
        lng: parseFloat(address.lng)
      };

      geocoder.geocode({ 'location': latLng }, function (results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
          var mapsAddress = mapApiToFormFields(results[0]);

          if (mapsAddress.street && mapsAddress.street != address.street) {
            $form.insertAdjacentHTML('afterend', '<small class="text-danger mt-2">Logradouro incorreto</small>')
          }

          if (mapsAddress.neighborhood && mapsAddress.neighborhood != address.neighborhood) {
            $form.insertAdjacentHTML('afterend', '<div class="is-invalid"><small class="text-danger mt-2">Bairro incorreto</small></div>')
          }

          if (mapsAddress.cep && mapsAddress.cep != address.cep) {
            $form.insertAdjacentHTML('afterend', '<div class="is-invalid"><small class="text-danger mt-2">Bairro incorreto</small></div>')
          }

          self.resolve();
        } else {
          self.reject();
        }
      });
    })
  }

  function handleSubmit (e, callback) {
    e.preventDefault();
    validateForm().then(function (valid) {
      if (valid) {
        var values = getFormValues();

        if (callback) {
          callback(values);
        }

        $modal.modal('hide');
      }
    });
  }

  function handleAutocomplete () {
    cleanFormErrors();
    var place = autocomplete.getPlace();
    if (Object.keys(place).length > 1) {
      var address = mapApiToFormFields(place);
      updateForm(address);
      resetMapPosition({ lat: address.lat, lng: address.lng }, true);
    }
  }

  function findLocation (value) {
    cleanFormErrors();
    if (value && value != '') {
      geocoder.geocode({ 'address': value }, function (results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
          var address = mapApiToFormFields(results[0]);
          var location = results[0].geometry.location;
          resetMapPosition({ lat: location.lat(), lng: location.lng() })
          updateForm(address);
        } else {
          console.error('Nenhum resultado encontrado');
          $form.insertAdjacentHTML('beforeend', '<div class="is-invalid"><small class="text-danger mt-2">Endereço não encontrado</small></div>');
        }
      });
    }
  }

  function mapApiToFormFields (place) {
    var address = {};
    address.lat = place.geometry.location.lat();
    address.lng = place.geometry.location.lng();

    place.address_components.forEach(function (component) {
      var formField;

      component.types.forEach(function (type) {
        if (FORM_FIELDS_MAP[type]) {
          formField = FORM_FIELDS_MAP[type];
        }
      });

      if (formField) {
        var value = component[formField[0]];
        address[formField[1]] = value;
      }
    });

    return address;
  }

  function setLoading (show) {
    var $loading = document.getElementById('mapsLoading');
    if ($loading) {
      if (!show) {
        $loading.style.display = 'none';
      } else {
        $loading.style.display = 'block';
      }
    }
  }

  function initMap (formData, callback) {
    if (formData) {
      initialData = formData;
    }

    fetchBasicFields();

    geocoder = new google.maps.Geocoder();
    map = new google.maps.Map(doc.getElementById('map'), {
      zoom: 12,
      mapTypeControl: true,
      mapTypeControlOptions: {
        position: google.maps.ControlPosition.TOP_CENTER
      },
      fullscreenControl: false
    });

    marker = new google.maps.Marker({
      map: map,
      draggable: true
    });

    google.maps.event.addListener(marker, 'dragend', handleMarkerDrag);
    google.maps.event.addListener(map, 'tilesloaded', setLoading);

    autocomplete = new google.maps.places.Autocomplete((document.getElementById('autocomplete')), { types: ['geocode'] });
    autocomplete.addListener('place_changed', handleAutocomplete);

    $form.addEventListener('submit', function (e) {
      handleSubmit(e, callback);
    });

    $form.addEventListener('change', function (e) {
      FORM_FIELDS_SCHEMA[e.target.name].onChange(e);
    });

    $modal.on("shown.bs.modal", function () {
      google.maps.event.trigger(map, "resize");
      var address = [];

      Object.keys(initialData).forEach(function (key) {
        address.push(initialData[key]);
      });

      geocoder.geocode({ 'address': address.join(', ') }, function (results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
          var location = results[0].geometry.location;
          resetMapPosition({ lat: location.lat(), lng: location.lng() })
        }
      });
    });
  }

  win.mapsAddressFinder = initMap;

})(window, document);