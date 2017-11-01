import { updateForm } from './updateForm';
import { enableFields } from './enableFields';

const initializeValues = (gmapsInstance, values, callback) =>
  (form) => {
    updateForm(values)(form);

    if (values.lat && values.lng) {
      const pos = {
        lat: parseFloat(values.lat),
        lng: parseFloat(values.lng)
      };

      gmapsInstance.resetMapPosition(pos);
    } else {
      const address = [];

      Object.keys(values).forEach(function (key) {
        address.push(values[key]);
      });

      gmapsInstance.findLocationByAddress(address.join(', '), (results, status) => {
        if (status == 'OK') {
          gmapsInstance.focusMarkerPosition(results[0]);
          enableFields(address)(form);
        }
      });
    }

    if (callback) {
      callback();
    }
  };

export { initializeValues };