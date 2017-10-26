const FORM_FIELDS_MAPPER = {
  route: {
    value: 'long_name',
    alias: 'street'
  },
  street_number: {
    value: 'long_name',
    alias: 'number'
  },
  country: {
    value: 'long_name',
    alias: 'country'
  },
  administrative_area_level_2: {
    value: 'long_name',
    alias: 'city'
  },
  administrative_area_level_1: {
    value: 'long_name',
    alias: 'state'
  },
  sublocality_level_1: {
    value: 'long_name',
    alias: 'neighborhood'
  },
  postal_code: {
    value: 'long_name',
    alias: 'postal_code'
  }
}

export { FORM_FIELDS_MAPPER }