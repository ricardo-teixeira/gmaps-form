import { validatePostalCode } from './validatePostalCode';

const enableFields = (address) =>
  (form) => {
    const isValidPostalCode = (!!address.postal_code && validatePostalCode(address.postal_code, address.country));
    form.elements.postal_code.readOnly = isValidPostalCode || false;
    form.elements.street.readOnly = !!address.street || false;
    form.elements.neighborhood.readOnly = !!address.neighborhood || false;
  }

export { enableFields };