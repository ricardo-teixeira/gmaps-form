
(function (win, doc) {
  'use strict';

  var $form;
  var $formSubmitBtn;
  var $modal;
  var map, marker, autocomplete, geocoder;
  var initialData;
  var isMapsInitialized = false;

  function initMap (formData, callback) {
    $form = doc.getElementById('mapsForm');
    $formSubmitBtn = doc.getElementById('mapsFormSubmit');
    $modal = $('#mapsModal');
    initialData = formData || {};

    function Field (props) {
      var defaults = {
        value: '',
        required: true,
        onChange: function () {}
      };
      return Object.assign({}, defaults, props);
    }

    var FORM_FIELDS_SCHEMA = {
      street: new Field(),
      country: new Field(),
      state: new Field(),
      city: new Field(),
      neighborhood: new Field({ required: false }),
      postal_code: new Field(),
      lat: new Field(),
      lng: new Field()
    };

    var FORM_FIELDS_MAPPER = {
      route: {
        value: 'long_name',
        alias: 'street'
      },
      country: {
        value: 'long_name',
        alias: 'country'
      },
      administrative_area_level_2: {
        value: 'long_name',
        alias: 'city'
      },
      administrative_area_level_1: {
        value: 'long_name',
        alias: 'state'
      },
      sublocality_level_1: {
        value: 'long_name',
        alias: 'neighborhood'
      },
      postal_code: {
        value: 'long_name',
        alias: 'postal_code'
      }
    };

    function updateForm (fields) {
      if (fields) {
        var address = Object.assign({}, FORM_FIELDS_SCHEMA, fields);

        Object.keys(address).forEach(function (field) {
          var element = $form.elements[field];
          if (element) {
            $form.elements[field].value = (fields[field] && fields[field] != 'Unnamed Road') ? fields[field] : '';
          } else {
            addFormInput(field, fields[field]);
          }
        });

        printBasicLocation();
      }
    }

    function addFormInput(name, value) {
      var input = document.createElement('input');
      input.type = 'hidden';
      input.name = name;
      input.value = value;
      $form.appendChild(input);
    }

    function printBasicLocation (fields) {
        var address = getFormValues();
        document.getElementById('formatedInputLocation').innerText = address.country + ', ' + address.state + ', ' + address.city;
    }

    function getGeocodePosition (pos) {
      geocoder.geocode({
        latLng: pos
      }, function (responses) {
        if (responses && responses.length > 0) {
          var address = mapApiToFormFields(responses[0]);
          address.lat = pos.lat;
          address.lng = pos.lng;
          updateForm(address);

          if (!address.postal_code) {
            $form.elements.postal_code.readOnly = false;
          } else if (!address.street) {
            $form.elements.street.readOnly = false;
          } else {
            $form.elements.street.readOnly = true;
            $form.elements.postal_code.readOnly = true;
          }
        }
      });
    }

    function handleMarkerDrag (e) {
      var latLng = {
        lat: e.latLng.lat(),
        lng: e.latLng.lng()
      };
      getGeocodePosition(latLng);
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
      map.setCenter(pos);
      marker.setPosition(pos);
      if (zoom) {
        map.setZoom(19);
      }
    }

    function focusMarkerPosition (place) {
      var pos = {
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng()
      };
      
      marker.setPosition(pos);
      
      if (place.geometry.viewport) {
        map.fitBounds(place.geometry.viewport);
      } else {
        map.setCenter(pos);
        map.setZoom(17);
      }
    }

    function getFormValues () {
      var values = {};

      Array.prototype.forEach.call($form.elements, function (element) {
        if (element.name) {
          values[element.name] = element.value;
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

            if (mapsAddress.postal_code && mapsAddress.postal_code != address.postal_code) {
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
        focusMarkerPosition(place);
      }
    }

    function findLocation (address) {
      if (address && address != '') {
        geocoder.geocode(address, function (results, status) {
          if (status == google.maps.GeocoderStatus.OK) {
            var place = results[0];
            focusMarkerPosition(place);
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
          if (FORM_FIELDS_MAPPER[type]) {
            formField = Object.assign({}, FORM_FIELDS_MAPPER[type]);
          }
        });

        if (formField) {
          var value = component[formField.value];
          address[formField.alias] = value;
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

    /********************************/

    if (!isMapsInitialized) {
      isMapsInitialized = true;

      geocoder = new google.maps.Geocoder();
      map = new google.maps.Map(doc.getElementById('map'), {
        zoom: 12,
        mapTypeControl: true,
        mapTypeControlOptions: {
          position: google.maps.ControlPosition.TOP_CENTER
        },
        fullscreenControl: false
      });

      map.addListener('rightclick', function (e) {
        var pos = {
          lat: e.latLng.lat(),
          lng: e.latLng.lng()
        };

        marker.setPosition(pos);
        getGeocodePosition(pos);
      });

      marker = new google.maps.Marker({
        map: map,
        draggable: true
      });

      google.maps.event.addListener(marker, 'dragend', handleMarkerDrag);
      google.maps.event.addListener(map, 'tilesloaded', setLoading);

      var $autocomplete = document.getElementById('mapsAutocomplete');
      autocomplete = new google.maps.places.Autocomplete($autocomplete, { types: ['geocode'] });
      autocomplete.bindTo('bounds', map);
      autocomplete.addListener('place_changed', handleAutocomplete);

      $formSubmitBtn.addEventListener('click', function (e) {
        handleSubmit(e, callback);
      });

      $form.addEventListener('change', function (e) {
        FORM_FIELDS_SCHEMA[e.target.name].onChange(e);
      });

      $modal.on('shown.bs.modal', function () {
        updateForm(initialData);
        google.maps.event.trigger(map, 'resize');
        
        var address = [];
        Object.keys(initialData).forEach(function (key) {
          address.push(initialData[key]);
        });

        var location = { 'address': address.join(', ') };
        if (address.lat && address.lng) {
          location = { 'location': { lat: address.lat, lng: address.lng }};
        }

        findLocation(location);
      });
    }
  }

  win.mapsAddressFinder = initMap;

})(window, document);