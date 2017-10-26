import { getFormValues } from './getFormValues'

function printBasicLocation () {
  const address = getFormValues();
  document.getElementById('formatedInputLocation').innerText = address.country + ', ' + address.state + ', ' + address.city;
}

export { printBasicLocation }