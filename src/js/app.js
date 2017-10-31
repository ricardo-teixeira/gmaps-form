import {
  FORM_FIELDS_SCHEMA,
  gmaps,
  initializeValues,
  updateForm,
  resetFormFields,
  getFormValues,
  clearFormErrors,
  clearAutocomplete,
  enableFields,
  mapApiToFormFields,
  validateRequiredFields,
  form,
  modal,
  formSubmitBtn,
  autocompletes,
  displayLoading
} from '../modules';

(function (win, doc, $) {
  const INITIAL_STATE = { country: 'Brasil' }
  let isMapsInitialized = false;

  function initMap (apiKey, initialData, afterSubmit) {
    const formFields = {};
    initialData = initialData || { ...INITIAL_STATE };

    if (!win.google) {
      const script = doc.createElement('script');

      script.onload = initializeMaps;
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
      doc.getElementsByTagName('head')[0].appendChild(script);
    } else if (!isMapsInitialized) {
      initializeMaps();
    } else {
      resetFormFields();
      updateForm(initialData);
    }

    const setFormPristine = (fields) => {
      Object.keys(fields).forEach((name) => {
        const field = fields[name];
        if (field) {
          field.touched = false;
        }
      });
    }

    const handleGeocodePosition = (responses, pos) => {
      if (responses && responses.length > 0) {
        let place = responses[0];
        let address = mapApiToFormFields(place);
        address.lat = pos.lat;
        address.lng = pos.lng;

        resetFormFields();
        updateForm(address);
        enableFields(address);
        setFormPristine(formFields);
      }
    };

    const handleMarkerDrag = (event, gmapsInstance) => {
      const latLng = {
        lat: event.latLng.lat(),
        lng: event.latLng.lng()
      };

      gmapsInstance.getGeocodePosition(latLng, handleGeocodePosition);
    };

    const validateForm = () => {
      const formValues = getFormValues();
      const isValid = validateRequiredFields(formValues);
      return isValid;
    };

    const handleSubmit = (event, callback) => {
      event.preventDefault();
      const isValid = validateForm();

      if (isValid) {
        const values = getFormValues();

        Object.keys(values).forEach((name) => {
          if (!formFields[name]) {
            formFields[name] = {
              value: values[name],
              touched: false
            };
          } else {
            formFields[name].value = values[name];
          }
        });

        console.log('submit', formFields)

        if (callback) {
          callback(values);
        }

        clearAutocomplete();
        modal.modal('hide');
      }
    };

    const handleAutocomplete = (autocomplete) => {
      const place = autocomplete.getPlace();

      clearFormErrors();

      if (Object.keys(place).length > 1) {
        const address = mapApiToFormFields(place);

        updateForm(address);
        enableFields(address);
        setFormPristine(formFields);
      }
    };

    const setMarkerPosition = (e, gmapsInstance) => {
      const pos = {
        lat: e.latLng.lat(),
        lng: e.latLng.lng()
      };

      gmapsInstance.marker.setPosition(pos);
      gmapsInstance.getGeocodePosition(pos, handleGeocodePosition);
    };

    function initializeMaps () {
      displayLoading(true);

      const $map = doc.getElementById('map');
      const gmapsInstance = gmaps($map, win.google);

      gmapsInstance.addMapEventListener('tilesloaded', () =>
        displayLoading(false)
      );

      gmapsInstance.addMapEventListener('click', (e) =>
        setMarkerPosition(e, gmapsInstance)
      );

      gmapsInstance.addMarkerEventListener('dragstart', () =>
        gmapsInstance.infoWindow.close()
      );

      gmapsInstance.addMarkerEventListener('dragend', (e) =>
        handleMarkerDrag(e, gmapsInstance)
      );

      gmapsInstance.addAutocompleteEventListeners(autocompletes, (autocomplete) => {
        handleAutocomplete(autocomplete);
        gmapsInstance.focusMarkerPosition(autocomplete.getPlace());
      });

      form.addEventListener('change', (event) => {
        FORM_FIELDS_SCHEMA[event.target.name].onChange(event);

        formFields[event.target.name] = {
          value: event.target.value,
          touched: true
        };
      });

      formSubmitBtn.addEventListener('click', (event) =>
        handleSubmit(event, afterSubmit)
      );

      initializeValues(gmapsInstance, initialData);
      isMapsInitialized = true;
    }
  }

  win.findGoogleAddress = initMap;

})(window, document, jQuery);