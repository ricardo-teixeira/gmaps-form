const validatePostalCode = (postalCode, country) => {
  switch (country) {
    case 'Brasil':
      return postalCode.replace(/\D/, '').length == 8;
    default:
      return true;
  }
}

export { validatePostalCode }