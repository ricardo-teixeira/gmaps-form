import { modal } from './selectors';

const clearAutocomplete = () => {
  const autocomplete = modal.find('[data-gmaps="autocomplete"]');
  autocomplete.value = '';
};

export { clearAutocomplete };
