import { modal } from './selectors'
import { updateForm } from './updateForm'
import { enableFields } from './enableFields'

const initializeValues = (gmapsInstance, initialData) => {
  gmapsInstance.triggerMapEvent('resize');
  updateForm(initialData);
  modal.find('[data-gmaps="autocomplete"]')[0].focus();

  if (initialData.lat && initialData.lng) {
    const pos = {
      lat: parseFloat(initialData.lat),
      lng: parseFloat(initialData.lng)
    };

    gmapsInstance.marker.setPosition(pos);
    gmapsInstance.map.setCenter(pos);
    gmapsInstance.map.setZoom(17);

  } else {
    const address = [];

    Object.keys(initialData).forEach(function (key) {
      address.push(initialData[key]);
    });

    gmapsInstance.findLocationByAddress(address.join(', '), (results, status) => {
      if (status == "OK") {
        const place = results[0];
        focusMarkerPosition(place);
        enableFields(address);
      }
    });
  }
}

export { initializeValues }