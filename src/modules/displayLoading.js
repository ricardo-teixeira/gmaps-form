const displayLoading = (show) => {
  var $loading = document.getElementById('mapsLoading');
  if ($loading) {
    if (!show) {
      $loading.style.display = 'none';
    } else {
      $loading.style.display = 'block';
    }
  }
}

export { displayLoading }