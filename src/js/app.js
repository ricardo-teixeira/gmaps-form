import '../styles/app.scss';
import $template from '../template.html';

import {
  FORM_FIELDS_SCHEMA,
  gmaps,
  initializeValues,
  updateForm,
  resetFormFields,
  getFormValues,
  clearFormErrors,
  enableFields,
  mapApiToFormFields,
  validateRequiredFields,
  displayLoading
} from '../modules';

const findGoogleAddress = (win, doc) => {
  let isMapsInitialized = false;
  let gmapsInstance;

  const INITIAL_STATE = {
    apiKey: '',
    initialValues: {
      country: 'Brasil'
    }
  };

  const init = (config, afterSubmit) =>
    ($containerElement) => {
      const initialValues = config.initialValues ? config.initialValues : { ...INITIAL_STATE.initialValues };
      const formFields = {};

      if (!isMapsInitialized) {
        $containerElement.innerHTML = $template;
      }

      const $form = $containerElement.querySelector('[data-gmaps="mapsForm"]');
      const $formSubmitBtn = $form.querySelector('[data-gmaps="mapsFormSubmit');
      const $autocompletes = $containerElement.querySelectorAll('[data-gmaps="autocomplete"]');
      const $loading = $containerElement.querySelector('[data-gmaps="mapsLoading"]');
      const $modal = $('#mapsModal');
      $modal.modal('show');

      if (!win.google) {
        const script = doc.createElement('script');

        script.onload = creatGoogleMaps;
        script.onerror = (err) => {
          displayLoading(true, 'Erro ao carregar Google Maps')($loading);
        };
        script.src = `https://maps.googleapis.com/maps/api/js?key=${config.apiKey}&libraries=places`;
        doc.getElementsByTagName('head')[0].appendChild(script);
      } else if (!isMapsInitialized) {
        creatGoogleMaps();
      } else {
        initializeValues(gmapsInstance, initialValues)($form);
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

          resetFormFields($form);
          updateForm(address)($form);
          enableFields(address)($form);
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
        const formValues = getFormValues($form);
        const isValid = validateRequiredFields($form, formValues);
        return isValid;
      };

      const handleSubmit = (event, callback) => {
        event.preventDefault();
        const isValid = validateForm();

        if (isValid) {
          const values = getFormValues($form);

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

          if (callback) {
            callback(formFields, values);
          }

          $modal.find('[data-gmaps="autocomplete"]').value = '';
          $modal.modal('hide');
        }
      };

      const handleAutocomplete = (autocomplete) => {
        const place = autocomplete.getPlace();

        clearFormErrors($form);

        if (Object.keys(place).length > 1) {
          const address = mapApiToFormFields(place);

          updateForm(address)($form);
          enableFields(address)($form);
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

      function creatGoogleMaps () {
        displayLoading(true)($loading);

        const $map = doc.getElementById('findGoogleAddressMap');
        gmapsInstance = gmaps($map, win.google);

        gmapsInstance.addMapEventListener('tilesloaded', () =>
          displayLoading(false)($loading)
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

        gmapsInstance.addAutocompleteEventListeners($autocompletes, (autocomplete) => {
          handleAutocomplete(autocomplete);
          gmapsInstance.focusMarkerPosition(autocomplete.getPlace());
        });

        $form.addEventListener('change', (event) => {
          FORM_FIELDS_SCHEMA[event.target.name].onChange(event);

          formFields[event.target.name] = {
            value: event.target.value,
            touched: true
          };
        });

        $formSubmitBtn.addEventListener('click', (event) =>
          handleSubmit(event, afterSubmit)
        );

        $modal.on('shown.bs.modal', () => {
          $modal.find('[data-gmaps="autocomplete"]')[0].focus();
          gmapsInstance.triggerMapEvent('resize');
        });

        initializeValues(gmapsInstance, initialValues)($form);

        isMapsInitialized = true;
      }
    };

  return init;

};

const { window, document } = global;
window.findGoogleAddress = findGoogleAddress(window, document);

export default findGoogleAddress;