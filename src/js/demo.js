import '../styles/demo.scss';
import { syntaxHighlight } from '../utils';

const API_KEY = 'key=AIzaSyDkNOmrr3Ec_sbxVZLY5xfP3hfNqLRKoG8';
const $exampleForm = document.getElementById('exampleForm');
const $submitResultsLeft = document.getElementById('submitResultsLeft');
const $submitResultsRight = document.getElementById('submitResultsRight');
const $newAddressBtn = document.getElementById('addNewAddress');
const initialData = {
  street: 'Rua Mário Carnicelli',
  country: 'Brasil',
  state: 'São Paulo',
  city: 'Campinas',
  // lat: -22.843125677855074,
  // lng: -47.00317025184631
};

const init = () => {
  applyValuesValues(mapFormValuesToApiProps(initialData, true));

  const $appContainer = document.querySelector('[data-gmaps="find-google-address"]');
  const data = getFormValues();
  const formatted = mapFormValuesToApiProps(data);

  findGoogleAddress(
    { apiKey: API_KEY, initialValues: formatted },
    (touched, values) => {
      applyValuesValues(mapFormValuesToApiProps(values, true));
      $submitResultsLeft.innerHTML = '<pre><strong>Maps API values</strong>\n' + syntaxHighlight(values) + '</pre>';
    })($appContainer);

  $newAddressBtn.addEventListener('click', () => {
    const data = getFormValues();
    const formatted = mapFormValuesToApiProps(data);

    findGoogleAddress({ apiKey: API_KEY, initialValues: formatted }, (touched, values) => {
      const formattedResponse = mapFormValuesToApiProps(values, true);

      applyValuesValues(formattedResponse);
    })($appContainer);
  });

  $exampleForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const values = getFormValues();

    $submitResultsRight.innerHTML = '<pre><strong>Submit Values</strong>\n' + syntaxHighlight(values) + '</pre>';
  });
}

document.addEventListener('DOMContentLoaded', init);

const mapFormValuesToApiProps = (values, reverse) => {
  const mappedObj = {};
  const keyMap = {
    pais: 'country',
    estado: 'state',
    cidade: 'city',
    bairro: 'neighborhood',
    rua: 'street',
    cep: 'postal_code',
    lat: 'lat',
    lng: 'lng'
  };

  if (reverse) {
    Object.keys(keyMap).forEach(function (key) {
      if (values[keyMap[key]]) {
        mappedObj[key] = values[keyMap[key]];
      }
    });
  } else {
    Object.keys(values).forEach(function (key) {
      if (values[key]) {
        mappedObj[keyMap[key]] = values[key];
      }
    });
  }

  return mappedObj;
}

const applyValuesValues = (values) => {
  Object.keys(values).forEach((key) => {
    $exampleForm.elements[key].value = values[key];
  });
}

const getFormValues = () => {
  const values = {};

  Array.prototype.forEach.call($exampleForm.elements, (element) => {
    if (element.name) {
      values[element.name] = element.value;
    }
  });

  return values;
}