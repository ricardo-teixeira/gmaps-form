import { loading } from './selectors';

const displayLoading = (show, message) => {
  message = message || 'Carregando...';

  if (loading) {
    loading.querySelector('.maps-loading-text').innerText = message;

    if (!show) {
      loading.style.display = 'none';
    } else {
      loading.style.display = 'block';
    }
  }
};

export { displayLoading };