// Courses Refresh

[].forEach.call(document.querySelectorAll('.courses-refresh'), function(refresh) {
  refresh.addEventListener('click', function() {
    document.querySelector('#toggle-full').checked = true;
    document.querySelector('#toggle-short').checked = true;
    document.querySelector('#toggle-tutorial').checked = true;
  })
});