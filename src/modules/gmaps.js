import { mapApiToFormFields } from './mapApiToFormFields';

const mapConfig = (googleApi) => ({
  zoom: 12,
  mapTypeControl: true,
  mapTypeControlOptions: {
    position: googleApi.maps.ControlPosition.TOP_CENTER
  },
  fullscreenControl: false
});

const markerConfig = (map) => ({
  map: map,
  draggable: true
});

const triggerMapEvent = (googleApi, mapInstance) =>
  (event) =>
    googleApi.maps.event.trigger(mapInstance, event);

const addEventListenerGenerator = (event, instance) =>
  (eventName, callback) =>
    event.addListener(instance, eventName, callback);

const addAutocompleteEventListeners = (googleApi, mapInstance) =>
  (elements, callback) => {
    elements.forEach((elem) => {
      const autocomplete = new googleApi.maps.places.Autocomplete(elem, { types: ['geocode'] });
      autocomplete.bindTo('bounds', mapInstance);
      autocomplete.addListener('place_changed', () => callback(autocomplete));
    });
  };

const findLocationByAddress = (geocoder) =>
  (address, callback) => {
    if (address && address != '') {
      geocoder.geocode({ address }, (results, status) => {
        callback(results, status);
      });
    }
  };

const getGeocodePosition = (geocoder, infoWindow, map, marker) =>
  (pos, callback) => {
    geocoder.geocode({
      latLng: pos
    }, (responses) => {
      callback(responses, pos, infoWindow);
      displayInfoWindow(infoWindow, map, marker)(responses[0]);
    });
  };

const displayInfoWindow = (infoWindow, map, marker) =>
  (place) => {
    infoWindow.close();
    if (place.address_components) {
      const lat = place.geometry.location.lat().toFixed(6);
      const lng = place.geometry.location.lng().toFixed(6);

      const address = place.formatted_address.replace('Unnamed Road', 'Logradouro sem nome');
      infoWindow.setContent(`<div><strong> ${address}</strong><br>${lat}, ${lng}`);
      infoWindow.open(map, marker);
    }
  };

const resetMapPosition = (map, marker) =>
  (pos, zoom) => {
    map.setCenter(pos);
    marker.setPosition(pos);
    if (zoom) {
      map.setZoom(19);
    }
  };

const focusMarkerPosition = (map, marker) =>
  (place) => {
    if (place.geometry) {
      const pos = {
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng()
      };

      setTimeout(() => {
        if (place.geometry.viewport) {
          map.fitBounds(place.geometry.viewport);
        } else {
          map.setZoom(17);
        }

        marker.setPosition(pos);
        map.setCenter(pos);
      }, 250);
    }
  };

const gmaps = (selector, googleApi) => {
  const map = new googleApi.maps.Map(selector, mapConfig(googleApi));
  const marker = new googleApi.maps.Marker(markerConfig(map));
  const geocoder = new googleApi.maps.Geocoder();
  const infoWindow = new googleApi.maps.InfoWindow();

  return {
    map,
    marker,
    geocoder,
    infoWindow,
    focusMarkerPosition: focusMarkerPosition(map, marker),
    resetMapPosition: resetMapPosition(map, marker),
    getGeocodePosition: getGeocodePosition(geocoder, infoWindow, map, marker),
    findLocationByAddress: findLocationByAddress(geocoder),
    addAutocompleteEventListeners: addAutocompleteEventListeners(googleApi, map),
    triggerMapEvent: triggerMapEvent(googleApi, map),
    addMapEventListener: addEventListenerGenerator(googleApi.maps.event, map),
    addMarkerEventListener: addEventListenerGenerator(googleApi.maps.event, marker),
  };
};

export { gmaps };