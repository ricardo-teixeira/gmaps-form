import { updateForm } from './updateForm';

const initializeValues = (gmapsInstance, values, callback) =>
  (form) => {
    updateForm(values)(form);

    if (values.lat && values.lng) {
      const pos = {
        lat: parseFloat(values.lat),
        lng: parseFloat(values.lng)
      };

      gmapsInstance.resetMapPosition(pos, true);
    } else {
      const address = [
        values.country || '',
        values.state || '',
        values.city || ''
      ];

      gmapsInstance.findLocationByAddress(address.join(', '), (results, status) => {
        if (status == 'OK') {
          gmapsInstance.focusMarkerPosition(results[0]);
        }
      });
    }

    if (callback) {
      callback();
    }
  };

export { initializeValues };