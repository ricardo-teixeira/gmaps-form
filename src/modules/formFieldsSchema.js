import { Field } from './field';

const FORM_FIELDS_SCHEMA = {
  street: new Field(),
  number: new Field(),
  country: new Field(),
  state: new Field(),
  city: new Field(),
  neighborhood: new Field(),
  postal_code: new Field(),
  lat: new Field(),
  lng: new Field()
};

export { FORM_FIELDS_SCHEMA };