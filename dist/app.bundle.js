/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else if (typeof exports !== "undefined") {
    factory();
  } else {
    var mod = {
      exports: {}
    };
    factory();
    global.app = mod.exports;
  }
})(this, function () {
  'use strict';

  (function (win, doc) {
    'use strict';

    var $form, $formSubmitBtn, $modal;
    var map, marker, autocomplete, geocoder, infowindow, initialData;
    var isMapsInitialized = false;

    function initMap(formData, afterSubmit) {
      $form = doc.getElementById('mapsForm');
      $formSubmitBtn = $form.querySelector('#mapsFormSubmit');
      $modal = $('#mapsModal');
      initialData = formData || { country: 'Brasil' };

      if (!win.google) {
        var script = doc.createElement('script');
        script.onload = initializeMaps;
        script.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyDkNOmrr3Ec_sbxVZLY5xfP3hfNqLRKoG8&libraries=places";
        doc.getElementsByTagName('head')[0].appendChild(script);
      } else if (!isMapsInitialized) {
        initializeMaps();
      }

      var FORM_FIELDS_SCHEMA = {
        street: new Field(),
        number: new Field(),
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
        street_number: {
          value: 'long_name',
          alias: 'number'
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

      function Field(props) {
        var defaults = {
          value: '',
          required: true,
          onChange: function onChange() {}
        };
        return Object.assign({}, defaults, props);
      }

      function updateForm(fields) {
        if (fields) {
          var address = Object.assign({}, FORM_FIELDS_SCHEMA, fields);

          Object.keys(address).forEach(function (field) {
            var element = $form.elements[field];
            if (element) {
              $form.elements[field].value = fields[field] || '';
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

      function printBasicLocation(fields) {
        var address = getFormValues();
        document.getElementById('formatedInputLocation').innerText = address.country + ', ' + address.state + ', ' + address.city;
      }

      function getGeocodePosition(pos) {
        geocoder.geocode({
          latLng: pos
        }, function (responses) {
          if (responses && responses.length > 0) {
            var place = responses[0];
            var address = mapApiToFormFields(place);
            address.lat = pos.lat;
            address.lng = pos.lng;
            updateForm(address);
            enableFields(address);
            displayInfoWindow(place);
          }
        });
      }

      function enableFields(address) {
        var isValidPostalCode = !!address.postal_code && validatePostalCode(address.postal_code, address.country);
        $form.elements.postal_code.readOnly = isValidPostalCode || false;
        $form.elements.street.readOnly = !!address.street || false;
      }

      function validatePostalCode(postalCode, country) {
        switch (country) {
          case 'Brasil':
            return postalCode.replace(/\D/, '').length == 8;
          default:
            return true;
        }
      }

      function handleMarkerDrag(e) {
        var latLng = {
          lat: e.latLng.lat(),
          lng: e.latLng.lng()
        };
        getGeocodePosition(latLng);
      }

      function clearFormErrors() {
        var $errorsText = $form.querySelectorAll('.text-danger');
        var $errorsClass = $form.querySelectorAll('.is-invalid');

        $errorsText.forEach(function (error) {
          error.remove();
        });

        $errorsClass.forEach(function (error) {
          error.classList.remove('is-invalid');
        });
      }

      function resetMapPosition(pos, zoom) {
        map.setCenter(pos);
        marker.setPosition(pos);
        if (zoom) {
          map.setZoom(19);
        }
      }

      function focusMarkerPosition(place) {
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

      function getFormValues() {
        var values = {};

        Array.prototype.forEach.call($form.elements, function (element) {
          if (element.name) {
            values[element.name] = element.value;
          }
        });

        return values;
      }

      function validateRequiredFields(values) {
        clearFormErrors();
        var invalidFields = [];

        Object.keys(values).forEach(function (key) {
          var $field = $form.elements[key];
          if ($field.type != 'hidden' && FORM_FIELDS_SCHEMA[key].required) {
            var valid = true;
            var error = '';

            if (!$field.value) {
              valid = false;
              error = 'Obrigatório';
            } else if ($field.name == 'postal_code') {
              if (!validatePostalCode($field.value, values.country)) {
                valid = false;
                error = 'Código postal inválido';
              }
            }

            if (!valid) {
              invalidFields.push(key);
              $field.classList.add('is-invalid');
              $field.parentNode.insertAdjacentHTML('beforeend', createErrorElement(error));
            }
          }
        });

        return invalidFields.length == 0;
      }

      function validateForm() {
        var formValues = getFormValues();
        var isValid = validateRequiredFields(formValues);

        return $.Deferred(function () {
          var self = this;

          if (!isValid) {
            return self.resolve(false);
          }

          return validateAddressAsync(formValues).then(function () {
            return self.resolve(isValid);
          }).fail(function () {
            return self.reject(false);
          });
        });
      }

      function createErrorElement(errorText) {
        return '<div><small class="text-danger mt-2">' + errorText + '</small></div>';
      }

      function validateAddressAsync(address) {
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
                $form.insertAdjacentHTML('afterend', createErrorElement('Logradouro incorreto'));
              }

              if (mapsAddress.neighborhood && mapsAddress.neighborhood != address.neighborhood) {
                $form.insertAdjacentHTML('afterend', createErrorElement('Bairro incorreto'));
              }

              if (mapsAddress.postal_code && mapsAddress.postal_code != address.postal_code) {
                $form.insertAdjacentHTML('afterend', createErrorElement('Bairro incorreto'));
              }

              self.resolve();
            } else {
              self.reject();
            }
          });
        });
      }

      function handleSubmit(e, callback) {
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

      function handleAutocomplete(autocomplete) {
        clearFormErrors();
        var place = autocomplete.getPlace();
        if (Object.keys(place).length > 1) {
          var address = mapApiToFormFields(place);
          updateForm(address);
          enableFields(address);
          focusMarkerPosition(place);
          displayInfoWindow(place);
        }
      }

      function displayInfoWindow(place) {
        infowindow.close();
        if (place.address_components) {
          var lat = place.geometry.location.lat().toFixed(6);
          var lng = place.geometry.location.lng().toFixed(6);

          infowindow.setContent('<div><strong>' + place.formatted_address.replace('Unnamed Road', 'Logradouro sem nome') + '</strong><br>' + lat + ', ' + lng);
          infowindow.open(map, marker);
        }
      }

      function findLocation(address) {
        if (address && address != '') {
          geocoder.geocode(address, function (results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
              var place = results[0];
              focusMarkerPosition(place);
              enableFields(address);
            }
          });
        }
      }

      function mapApiToFormFields(place) {
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
            var value = component[formField.value] && component[formField.value] != 'Unnamed Road' ? component[formField.value] : '';
            address[formField.alias] = value;
          }
        });

        return address;
      }

      function setLoading(show) {
        var $loading = document.getElementById('mapsLoading');
        if ($loading) {
          if (!show) {
            $loading.style.display = 'none';
          } else {
            $loading.style.display = 'block';
          }
        }
      }

      function initializeValues() {
        google.maps.event.trigger(map, 'resize');
        updateForm(initialData);
        $modal.find('[data-gmaps="autocomplete"]')[0].focus();

        if (initialData.lat && initialData.lng) {
          var pos = {
            lat: parseFloat(initialData.lat),
            lng: parseFloat(initialData.lng)
          };
          marker.setPosition(pos);
          map.setCenter(pos);
          map.setZoom(17);
        } else {
          var address = [];
          Object.keys(initialData).forEach(function (key) {
            address.push(initialData[key]);
          });

          findLocation({ 'address': address.join(', ') });
        }
      }

      function setMarkerPosition(e) {
        var pos = {
          lat: e.latLng.lat(),
          lng: e.latLng.lng()
        };

        marker.setPosition(pos);
        getGeocodePosition(pos);
      }

      function initializeMaps() {
        infowindow = new google.maps.InfoWindow();
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

        var $autocompletes = doc.querySelectorAll('[data-gmaps="autocomplete"]');

        $autocompletes.forEach(function (elem) {
          var autocomplete = new google.maps.places.Autocomplete(elem, { types: ['geocode'] });
          autocomplete.bindTo('bounds', map);
          autocomplete.addListener('place_changed', function () {
            handleAutocomplete(autocomplete);
          });
        });

        google.maps.event.addListener(map, 'click', setMarkerPosition);
        google.maps.event.addListener(marker, 'dragstart', function () {
          infowindow.close();
        });
        google.maps.event.addListener(marker, 'dragend', handleMarkerDrag);
        google.maps.event.addListener(map, 'tilesloaded', setLoading);

        $formSubmitBtn.addEventListener('click', function (e) {
          handleSubmit(e, afterSubmit);
        });

        $form.addEventListener('change', function (e) {
          FORM_FIELDS_SCHEMA[e.target.name].onChange(e);
        });

        $modal.on('shown.bs.modal', initializeValues);
      }
    }

    win.mapsAddressFinder = initMap;
  })(window, document);
});

/***/ })
/******/ ]);