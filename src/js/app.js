
import {
  FORM_FIELDS_SCHEMA,
  gmaps,
  initializeValues,
  updateForm,
  getFormValues,
  clearFormErrors,
  enableFields,
  mapApiToFormFields,
  validateRequiredFields,
  form,
  modal,
  formSubmitBtn,
  autocompletes,
  displayLoading,
  createErrorElement
} from '../modules';

(function (win, doc, $) {
  'use strict';

  let geocoder, initialData;
  let isMapsInitialized = false;

  function initMap (formData, afterSubmit) {
    initialData = formData || { country: 'Brasil' };

    if (!win.google) {
      let script = doc.createElement('script');
      script.onload = initializeMaps;
      script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyDkNOmrr3Ec_sbxVZLY5xfP3hfNqLRKoG8&libraries=places';
      doc.getElementsByTagName('head')[0].appendChild(script);
    } else if (!isMapsInitialized) {
      initializeMaps();
    }

    const handleGeocodePosition = (responses, pos) => {
      if (responses && responses.length > 0) {
        let place = responses[0];
        let address = mapApiToFormFields(place);
        address.lat = pos.lat;
        address.lng = pos.lng;
        updateForm(address);
        enableFields(address);
      }
    };

    const handleMarkerDrag = (e, gmapsInstance) => {
      let latLng = {
        lat: e.latLng.lat(),
        lng: e.latLng.lng()
      };

      gmapsInstance.getGeocodePosition(latLng, handleGeocodePosition);
    };

    const validateForm = () => {
      let formValues = getFormValues();
      let isValid = validateRequiredFields(formValues);

      return $.Deferred(function () {
        let self = this;

        if (!isValid) {
          return self.resolve(false);
        }

        return validateAddressAsync(formValues).then(function () {
          return self.resolve(isValid);
        }).fail(function () {
          return self.reject(false);
        });

      });
    };

    const validateAddressAsync = (address) => $.Deferred(function () {
      let self = this;
      let latLng = {
        lat: parseFloat(address.lat),
        lng: parseFloat(address.lng)
      };

      geocoder.geocode({ 'location': latLng }, function (results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
          let mapsAddress = mapApiToFormFields(results[0]);

          if (mapsAddress.street && mapsAddress.street != address.street) {
            form.insertAdjacentHTML('afterend', createErrorElement('Logradouro incorreto'));
          }

          if (mapsAddress.neighborhood && mapsAddress.neighborhood != address.neighborhood) {
            form.insertAdjacentHTML('afterend', createErrorElement('Bairro incorreto'));
          }

          if (mapsAddress.postal_code && mapsAddress.postal_code != address.postal_code) {
            form.insertAdjacentHTML('afterend', createErrorElement('Bairro incorreto'));
          }

          self.resolve();
        } else {
          self.reject();
        }
      });
    });

    const handleSubmit = (e, callback) => {
      e.preventDefault();
      validateForm().then(function (valid) {
        if (valid) {
          let values = getFormValues();

          if (callback) {
            callback(values);
          }

          modal.modal('hide');
        }
      });
    };

    const handleAutocomplete = (autocomplete) => {
      let place = autocomplete.getPlace();

      clearFormErrors();

      if (Object.keys(place).length > 1) {
        let address = mapApiToFormFields(place);
        updateForm(address);
        enableFields(address);
      }
    };

    const setMarkerPosition = (e, gmapsInstance) => {
      let pos = {
        lat: e.latLng.lat(),
        lng: e.latLng.lng()
      };

      gmapsInstance.marker.setPosition(pos);
      gmapsInstance.getGeocodePosition(pos, handleGeocodePosition);
    };

    function initializeMaps () {
      const $map = doc.getElementById('map');
      const gmapsInstance = gmaps($map, win.google);

      gmapsInstance.addMapEventListener('click', (e) => setMarkerPosition(e, gmapsInstance));
      gmapsInstance.addMapEventListener('tilesloaded', () => displayLoading(false));
      gmapsInstance.addMarkerEventListener('dragstart', () => gmapsInstance.infoWindow.close());
      gmapsInstance.addMarkerEventListener('dragend', (e) => handleMarkerDrag(e, gmapsInstance));
      gmapsInstance.addAutocompleteEventListeners(autocompletes, (autocomplete) => {
        handleAutocomplete(autocomplete);
        gmapsInstance.focusMarkerPosition(autocomplete.getPlace());
      });

      form.addEventListener('change', function (e) {
        FORM_FIELDS_SCHEMA[e.target.name].onChange(e);
      });

      formSubmitBtn.addEventListener('click', function (e) {
        handleSubmit(e, afterSubmit);
      });

      modal.on('shown.bs.modal', () => initializeValues(gmapsInstance, initialData));
    }
  }

  win.mapsAddressFinder = initMap;

})(window, document, jQuery);