import { modal } from './selectors';
import { updateForm } from './updateForm';
import { enableFields } from './enableFields';

const initializeValues = (gmapsInstance, values) => {
  gmapsInstance.triggerMapEvent('resize');
  updateForm(values);

  if (values.lat && values.lng) {
    const pos = {
      lat: parseFloat(values.lat),
      lng: parseFloat(values.lng)
    };

    gmapsInstance.resetMapPosition(pos);

    // gmapsInstance.marker.setPosition(pos);
    // gmapsInstance.map.setCenter(pos);
    // gmapsInstance.map.setZoom(17);

  } else {
    const address = [];

    Object.keys(values).forEach(function (key) {
      address.push(values[key]);
    });

    gmapsInstance.findLocationByAddress(address.join(', '), (results, status) => {
      if (status == 'OK') {
        const place = results[0];
        gmapsInstance.focusMarkerPosition(place);
        enableFields(address);
      }
    });
  }

  modal.find('[data-gmaps="autocomplete"]')[0].focus();
};

export { initializeValues };