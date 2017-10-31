const printBasicAddress = (address) => {
  const formattedAddress = [];

  if (address.country) {
    formattedAddress.push(address.country);
  }

  if (address.state) {
    formattedAddress.push(address.state);
  }

  if (address.city) {
    formattedAddress.push(address.city);
  }

  document.getElementById('formatedInputLocation').innerText = formattedAddress.join(', ');
};

export { printBasicAddress };