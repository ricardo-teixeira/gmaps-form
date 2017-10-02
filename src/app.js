(function (win, doc) {
  "use strict"

  var $form = doc.getElementById('mapsForm');
  var map, autocomplete, geocoder;
  var initialData = {
    lat: -22.889765,
    lng: -47.046664
  }

  updateForm(initialData)

  function updateForm (fields) {
    if (!fields) {
      var place = autocomplete.getPlace();
      if (Object.keys(place).length > 1) {
        fields = {
          address: place.formatted_address,
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng()
        }
      } else {
        return false;
      }
    }

    Object.keys(fields).forEach(function (field) {
      $form.elements[field].value = fields[field];
    })
  }

  function geocodePosition (pos) {
    geocoder.geocode({
      latLng: pos
    }, function (responses) {
      if (responses && responses.length > 0) {
        console.log(responses[0])
        var data = {
          address: responses[0].formatted_address,
          lat: pos.lat(),
          lng: pos.lng()
        }
        updateForm(data)
      }
    });
  }

  function initMap () {
    var latLng = {
      lat: initialData.lat,
      lng: initialData.lng
    };
    
    geocoder =  new google.maps.Geocoder();

    map = new google.maps.Map(doc.getElementById('map'), {
      center: latLng,
      zoom: 15,
      mapTypeControl: true,
      mapTypeControlOptions: {
        position: google.maps.ControlPosition.TOP_CENTER
      },
      fullscreenControl: false
    });

    var marker = new google.maps.Marker({
      position: latLng,
      map: map,
      draggable: true
    });

    google.maps.event.addListener(marker, 'dragend', function (evt) {
      geocodePosition(marker.getPosition());
    });

    google.maps.event.addListener(map, 'tilesloaded', function (e) {
      var $loading = document.getElementById('mapsLoading');
      if ($loading) {
        $loading.remove()
      }
    });

    $('#mapsModal').modal('show').on("shown.bs.modal", function () {
      google.maps.event.trigger(map, "resize");
      map.setCenter({
        lat: initialData.lat,
        lng: initialData.lng
      });
    });

    $form.addEventListener('submit', function (e) {
      console.log(e.target, e)
      e.preventDefault()

      var errors = $form.querySelectorAll('.text-danger');
      errors.forEach((error) => {
        error.remove()
      })

      var address = $form.elements['address'].value;
      if (address != '') {
        geocoder.geocode({ 'address': address }, function (results, status) {
          if (status == google.maps.GeocoderStatus.OK) {
            map.setCenter(results[0].geometry.location);
            marker.setPosition(results[0].geometry.location);
          } else {
            var $nameField = $form.querySelector('[name="address"]');
            $nameField.classList.add('is-invalid');
            $nameField.insertAdjacentHTML('afterend', '<small class="text-danger mt-2">Endereço não encontrado</small>')
          }
        });
      }
    })


    var componentForm = {
      street_number: 'short_name',
      route: 'long_name',
      locality: 'long_name',
      administrative_area_level_1: 'short_name',
      country: 'long_name',
      postal_code: 'short_name'
    };

    autocomplete = new google.maps.places.Autocomplete((document.getElementById('autocomplete')), { types: ['geocode'] });
    autocomplete.addListener('place_changed', updateForm);
  }

  doc.addEventListener('DOMContentLoaded', initMap)
})(window, document)