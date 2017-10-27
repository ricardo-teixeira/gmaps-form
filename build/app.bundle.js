!function(e){function t(o){if(n[o])return n[o].exports;var r=n[o]={i:o,l:!1,exports:{}};return e[o].call(r.exports,r,r.exports,t),r.l=!0,r.exports}var n={};t.m=e,t.c=n,t.d=function(e,n,o){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:o})},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=11)}([function(e,t,n){var o,r,a;!function(n,i){r=[t],o=i,void 0!==(a="function"==typeof o?o.apply(t,r):o)&&(e.exports=a)}(0,function(e){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var t=e.form=document.getElementById("mapsForm");e.formSubmitBtn=t.querySelector("#mapsFormSubmit"),e.autocompletes=document.querySelectorAll('[data-gmaps="autocomplete"]'),e.modal=$("#mapsModal")})},function(e,t,n){var o,r,a;!function(i,u){r=[t,n(13)],o=u,void 0!==(a="function"==typeof o?o.apply(t,r):o)&&(e.exports=a)}(0,function(e,t){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.FORM_FIELDS_SCHEMA=void 0;var n={street:new t.Field,number:new t.Field,country:new t.Field,state:new t.Field,city:new t.Field,neighborhood:new t.Field({required:!1}),postal_code:new t.Field,lat:new t.Field,lng:new t.Field};e.FORM_FIELDS_SCHEMA=n})},function(e,t,n){var o,r,a;!function(n,i){r=[t],o=i,void 0!==(a="function"==typeof o?o.apply(t,r):o)&&(e.exports=a)}(0,function(e){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var t=function(e,t){switch(t){case"Brasil":return 8==e.replace(/\D/,"").length;default:return!0}};e.validatePostalCode=t})},function(e,t,n){var o,r,a;!function(n,i){r=[t],o=i,void 0!==(a="function"==typeof o?o.apply(t,r):o)&&(e.exports=a)}(0,function(e){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var t={route:{value:"long_name",alias:"street"},street_number:{value:"long_name",alias:"number"},country:{value:"long_name",alias:"country"},administrative_area_level_2:{value:"long_name",alias:"city"},administrative_area_level_1:{value:"long_name",alias:"state"},sublocality_level_1:{value:"long_name",alias:"neighborhood"},postal_code:{value:"long_name",alias:"postal_code"}};e.FORM_FIELDS_MAPPER=t})},function(e,t,n){var o,r,a;!function(i,u){r=[t,n(1),n(5),n(7),n(0)],o=u,void 0!==(a="function"==typeof o?o.apply(t,r):o)&&(e.exports=a)}(0,function(e,t,n,o,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.updateForm=void 0;var a=function(e){return e&&e.__esModule?e:{default:e}}(t),i=function(e){if(e){var t=Object.assign({},a.default,e);Object.keys(t).forEach(function(t){r.form.elements[t]?r.form.elements[t].value=e[t]||"":(0,o.addFormInput)(t,e[t])}),(0,n.printBasicLocation)()}};e.updateForm=i})},function(e,t,n){var o,r,a;!function(i,u){r=[t,n(6)],o=u,void 0!==(a="function"==typeof o?o.apply(t,r):o)&&(e.exports=a)}(0,function(e,t){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.printBasicLocation=void 0;var n=function(){var e=(0,t.getFormValues)();document.getElementById("formatedInputLocation").innerText=e.country+", "+e.state+", "+e.city};e.printBasicLocation=n})},function(e,t,n){var o,r,a;!function(i,u){r=[t,n(0)],o=u,void 0!==(a="function"==typeof o?o.apply(t,r):o)&&(e.exports=a)}(0,function(e,t){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.getFormValues=void 0;var n=function(){var e={};return Array.prototype.forEach.call(t.form.elements,function(t){t.name&&(e[t.name]=t.value)}),e};e.getFormValues=n})},function(e,t,n){var o,r,a;!function(i,u){r=[t,n(0)],o=u,void 0!==(a="function"==typeof o?o.apply(t,r):o)&&(e.exports=a)}(0,function(e,t){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.addFormInput=void 0;var n=function(e,n){var o=document.createElement("input");o.type="hidden",o.name=e,o.value=n,t.form.appendChild(o)};e.addFormInput=n})},function(e,t,n){var o,r,a;!function(i,u){r=[t,n(0)],o=u,void 0!==(a="function"==typeof o?o.apply(t,r):o)&&(e.exports=a)}(0,function(e,t){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.clearFormErrors=void 0;var n=function(){var e=t.form.querySelectorAll(".text-danger"),n=t.form.querySelectorAll(".is-invalid");e.forEach(function(e){e.remove()}),n.forEach(function(e){e.classList.remove("is-invalid")})};e.clearFormErrors=n})},function(e,t,n){var o,r,a;!function(n,i){r=[t],o=i,void 0!==(a="function"==typeof o?o.apply(t,r):o)&&(e.exports=a)}(0,function(e){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var t=function(e){return'<div><small class="text-danger mt-2">'+e+"</small></div>"};e.createErrorElement=t})},function(e,t,n){var o,r,a;!function(i,u){r=[t,n(0),n(2)],o=u,void 0!==(a="function"==typeof o?o.apply(t,r):o)&&(e.exports=a)}(0,function(e,t,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.enableFields=void 0;var o=function(e){var o=!!e.postal_code&&(0,n.validatePostalCode)(e.postal_code,e.country);t.form.elements.postal_code.readOnly=o||!1,t.form.elements.street.readOnly=!!e.street||!1};e.enableFields=o})},function(e,t,n){var o,r,a;!function(i,u){r=[n(12)],o=u,void 0!==(a="function"==typeof o?o.apply(t,r):o)&&(e.exports=a)}(0,function(e){"use strict";!function(t,n){function o(o,u){function c(){var t=(0,e.gmaps)(n,google);t.addMapEventListener("click",function(e){return y(e,t)}),t.addMapEventListener("tilesloaded",function(){return(0,e.displayLoading)(!1)}),t.addMarkerEventListener("dragstart",function(){return t.infoWindow.close()}),t.addMarkerEventListener("dragend",function(e){return f(e,t)}),t.addAutocompleteEventListeners(e.autocompletes,function(e){v(e),t.focusMarkerPosition(e.getPlace())}),e.form.addEventListener("change",function(t){e.FORM_FIELDS_SCHEMA[t.target.name].onChange(t)}),e.formSubmitBtn.addEventListener("click",function(e){m(e,u)}),e.modal.on("shown.bs.modal",function(){return(0,e.initializeValues)(t,a)})}if(a=o||{country:"Brasil"},t.google)i||c();else{var l=n.createElement("script");l.onload=c,l.src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDkNOmrr3Ec_sbxVZLY5xfP3hfNqLRKoG8&libraries=places",n.getElementsByTagName("head")[0].appendChild(l)}var s=function(t,n,o){if(t&&t.length>0){var r=t[0],a=(0,e.mapApiToFormFields)(r);a.lat=n.lat,a.lng=n.lng,(0,e.updateForm)(a),(0,e.enableFields)(a)}},f=function(e,t){var n={lat:e.latLng.lat(),lng:e.latLng.lng()};t.getGeocodePosition(n,s)},d=function(){var t=(0,e.getFormValues)(),n=(0,e.validateRequiredFields)(t);return $.Deferred(function(){var e=this;return n?p(t).then(function(){return e.resolve(n)}).fail(function(){return e.reject(!1)}):e.resolve(!1)})},p=function(t){return $.Deferred(function(){var n=this,o={lat:parseFloat(t.lat),lng:parseFloat(t.lng)};r.geocode({location:o},function(o,r){if(r==google.maps.GeocoderStatus.OK){var a=(0,e.mapApiToFormFields)(o[0]);a.street&&a.street!=t.street&&e.form.insertAdjacentHTML("afterend",(0,e.createErrorElement)("Logradouro incorreto")),a.neighborhood&&a.neighborhood!=t.neighborhood&&e.form.insertAdjacentHTML("afterend",(0,e.createErrorElement)("Bairro incorreto")),a.postal_code&&a.postal_code!=t.postal_code&&e.form.insertAdjacentHTML("afterend",(0,e.createErrorElement)("Bairro incorreto")),n.resolve()}else n.reject()})})},m=function(t,n){t.preventDefault(),d().then(function(t){if(t){var o=(0,e.getFormValues)();n&&n(o),e.modal.modal("hide")}})},v=function(t){var n=t.getPlace();if((0,e.clearFormErrors)(),Object.keys(n).length>1){var o=(0,e.mapApiToFormFields)(n);(0,e.updateForm)(o),(0,e.enableFields)(o)}},y=function(e,t){var n={lat:e.latLng.lat(),lng:e.latLng.lng()};t.marker.setPosition(n),t.getGeocodePosition(n,s)}}var r,a,i=!1;t.mapsAddressFinder=o}(window,document)})},function(e,t,n){var o,r,a;!function(i,u){r=[t,n(3),n(1),n(4),n(5),n(7),n(6),n(14),n(18),n(15),n(8),n(2),n(16),n(10),n(0),n(17),n(9)],o=u,void 0!==(a="function"==typeof o?o.apply(t,r):o)&&(e.exports=a)}(0,function(e,t,n,o,r,a,i,u,c,l,s,f,d,p,m,v,y){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),Object.keys(t).forEach(function(n){"default"!==n&&"__esModule"!==n&&Object.defineProperty(e,n,{enumerable:!0,get:function(){return t[n]}})}),Object.keys(n).forEach(function(t){"default"!==t&&"__esModule"!==t&&Object.defineProperty(e,t,{enumerable:!0,get:function(){return n[t]}})}),Object.keys(o).forEach(function(t){"default"!==t&&"__esModule"!==t&&Object.defineProperty(e,t,{enumerable:!0,get:function(){return o[t]}})}),Object.keys(r).forEach(function(t){"default"!==t&&"__esModule"!==t&&Object.defineProperty(e,t,{enumerable:!0,get:function(){return r[t]}})}),Object.keys(a).forEach(function(t){"default"!==t&&"__esModule"!==t&&Object.defineProperty(e,t,{enumerable:!0,get:function(){return a[t]}})}),Object.keys(i).forEach(function(t){"default"!==t&&"__esModule"!==t&&Object.defineProperty(e,t,{enumerable:!0,get:function(){return i[t]}})}),Object.keys(u).forEach(function(t){"default"!==t&&"__esModule"!==t&&Object.defineProperty(e,t,{enumerable:!0,get:function(){return u[t]}})}),Object.keys(c).forEach(function(t){"default"!==t&&"__esModule"!==t&&Object.defineProperty(e,t,{enumerable:!0,get:function(){return c[t]}})}),Object.keys(l).forEach(function(t){"default"!==t&&"__esModule"!==t&&Object.defineProperty(e,t,{enumerable:!0,get:function(){return l[t]}})}),Object.keys(s).forEach(function(t){"default"!==t&&"__esModule"!==t&&Object.defineProperty(e,t,{enumerable:!0,get:function(){return s[t]}})}),Object.keys(f).forEach(function(t){"default"!==t&&"__esModule"!==t&&Object.defineProperty(e,t,{enumerable:!0,get:function(){return f[t]}})}),Object.keys(d).forEach(function(t){"default"!==t&&"__esModule"!==t&&Object.defineProperty(e,t,{enumerable:!0,get:function(){return d[t]}})}),Object.keys(p).forEach(function(t){"default"!==t&&"__esModule"!==t&&Object.defineProperty(e,t,{enumerable:!0,get:function(){return p[t]}})}),Object.keys(m).forEach(function(t){"default"!==t&&"__esModule"!==t&&Object.defineProperty(e,t,{enumerable:!0,get:function(){return m[t]}})}),Object.keys(v).forEach(function(t){"default"!==t&&"__esModule"!==t&&Object.defineProperty(e,t,{enumerable:!0,get:function(){return v[t]}})}),Object.keys(y).forEach(function(t){"default"!==t&&"__esModule"!==t&&Object.defineProperty(e,t,{enumerable:!0,get:function(){return y[t]}})})})},function(e,t,n){var o,r,a;!function(n,i){r=[t],o=i,void 0!==(a="function"==typeof o?o.apply(t,r):o)&&(e.exports=a)}(0,function(e){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var t=function(e){var t={value:"",required:!0,onChange:new Function};return Object.assign({},t,e)};e.Field=t})},function(e,t,n){var o,r,a;!function(n,i){r=[t],o=i,void 0!==(a="function"==typeof o?o.apply(t,r):o)&&(e.exports=a)}(0,function(e){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var t=function(e){return{zoom:12,mapTypeControl:!0,mapTypeControlOptions:{position:e.maps.ControlPosition.TOP_CENTER},fullscreenControl:!1}},n=function(e){return{map:e,draggable:!0}},o=function(e,t){return function(n){return e.maps.event.trigger(t,n)}},r=function(e,t){return function(n,o){return e.addListener(t,n,o)}},a=function(e,t){return function(n,o){n.forEach(function(n){var r=new e.maps.places.Autocomplete(n,{types:["geocode"]});r.bindTo("bounds",t),r.addListener("place_changed",function(){return o(r)})})}},i=function(e){return function(t,n){t&&""!=t&&e.geocode({address:t},function(e,t){n(e,t)})}},u=function(e,t,n,o){return function(r,a){e.geocode({latLng:r},function(e){a(e,r,t),c(t,n,o)(e[0])})}},c=function(e,t,n){return function(o){if(e.close(),o.address_components){var r=o.geometry.location.lat().toFixed(6),a=o.geometry.location.lng().toFixed(6);e.setContent("<div><strong>"+o.formatted_address.replace("Unnamed Road","Logradouro sem nome")+"</strong><br>"+r+", "+a),e.open(t,n)}}},l=function(e,t){return function(n,o){e.setCenter(n),t.setPosition(n),o&&e.setZoom(19)}},s=function(e,t){return function(n){var o={lat:n.geometry.location.lat(),lng:n.geometry.location.lng()};t.setPosition(o),n.geometry.viewport?e.fitBounds(n.geometry.viewport):(e.setCenter(o),e.setZoom(17))}},f=function(e,c){var f=new c.maps.Map(e.getElementById("map"),t(c)),d=new c.maps.Marker(n(f)),p=new c.maps.Geocoder,m=new c.maps.InfoWindow;return{map:f,marker:d,geocoder:p,infoWindow:m,focusMarkerPosition:s(f,d),resetMapPosition:l(f,d),getGeocodePosition:u(p,m,f,d),findLocationByAddress:i(p),addAutocompleteEventListeners:a(c,f),triggerMapEvent:o(c,f),addMapEventListener:r(c.maps.event,f),addMarkerEventListener:r(c.maps.event,d)}};e.gmaps=f})},function(e,t,n){var o,r,a;!function(i,u){r=[t,n(3)],o=u,void 0!==(a="function"==typeof o?o.apply(t,r):o)&&(e.exports=a)}(0,function(e,t){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.mapApiToFormFields=void 0;var n=function(e){var n={};return n.lat=e.geometry.location.lat(),n.lng=e.geometry.location.lng(),e.address_components.forEach(function(e){var o;if(e.types.forEach(function(e){t.FORM_FIELDS_MAPPER[e]&&(o=Object.assign({},t.FORM_FIELDS_MAPPER[e]))}),o){var r=e[o.value]&&"Unnamed Road"!=e[o.value]?e[o.value]:"";n[o.alias]=r}}),n};e.mapApiToFormFields=n})},function(e,t,n){var o,r,a;!function(i,u){r=[t,n(1),n(8),n(9),n(2),n(0)],o=u,void 0!==(a="function"==typeof o?o.apply(t,r):o)&&(e.exports=a)}(0,function(e,t,n,o,r,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.validateRequiredFields=void 0;var i=function(e){(0,n.clearFormErrors)();var i=[];return Object.keys(e).forEach(function(n){var u=a.form.elements[n];if("hidden"!=u.type&&t.FORM_FIELDS_SCHEMA[n].required){var c=!0,l="";u.value?"postal_code"==u.name&&((0,r.validatePostalCode)(u.value,e.country)||(c=!1,l="Código postal inválido")):(c=!1,l="Obrigatório"),c||(i.push(n),u.classList.add("is-invalid"),u.parentNode.insertAdjacentHTML("beforeend",(0,o.createErrorElement)(l)))}}),0==i.length};e.validateRequiredFields=i})},function(e,t,n){var o,r,a;!function(n,i){r=[t],o=i,void 0!==(a="function"==typeof o?o.apply(t,r):o)&&(e.exports=a)}(0,function(e){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var t=function(e){var t=document.getElementById("mapsLoading");t&&(t.style.display=e?"block":"none")};e.displayLoading=t})},function(e,t,n){var o,r,a;!function(i,u){r=[t,n(0),n(4),n(10)],o=u,void 0!==(a="function"==typeof o?o.apply(t,r):o)&&(e.exports=a)}(0,function(e,t,n,o){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.initializeValues=void 0;var r=function(e,r){if(e.triggerMapEvent("resize"),(0,n.updateForm)(r),t.modal.find('[data-gmaps="autocomplete"]')[0].focus(),r.lat&&r.lng){var a={lat:parseFloat(r.lat),lng:parseFloat(r.lng)};e.marker.setPosition(a),e.map.setCenter(a),e.map.setZoom(17)}else{var i=[];Object.keys(r).forEach(function(e){i.push(r[e])}),e.findLocationByAddress(i.join(", "),function(e,t){if("OK"==t){var n=e[0];focusMarkerPosition(n),(0,o.enableFields)(i)}})}};e.initializeValues=r})}]);
//# sourceMappingURL=app.bundle.js.map