// Sort

// Date

var catalog = document.querySelector('.courses');
var toggleDate = document.querySelector('#toggle-date');
toggleDate.addEventListener('click', function() {
  catalog.classList.toggle('oldest');
});

// Level

var toggleLevel = document.querySelector('#toggle-level');
toggleLevel.addEventListener('click', function() {
  catalog.classList.remove('oldest');
  if (catalog.classList.contains('beginner')) {
    catalog.classList.remove('beginner');
    catalog.classList.add('intermediate');
  } else {
    catalog.classList.remove('intermediate');
    catalog.classList.add('beginner');
  }
});

var radioLevel = document.querySelector('#skill-level');
radioLevel.addEventListener('click', function () {
  toggleLevel.removeAttribute('disabled');
  toggleDate.setAttribute('disabled', 'disabled');
});

var radioDate = document.querySelector('#publish-date');
radioDate.addEventListener('click', function () {
  toggleDate.removeAttribute('disabled');
  toggleLevel.setAttribute('disabled', 'disabled');
});

// Format toggle

var toggleFull = document.querySelector('#toggle-full-ui');
toggleFull.addEventListener('click', function() {
  if (document.querySelector('#toggle-full-ui').checked == true) {
    document.querySelector('#toggle-full').checked = true;
  } else {
    document.querySelector('#toggle-full').checked = false;
  }
});

var toggleShort = document.querySelector('#toggle-short-ui');
toggleShort.addEventListener('click', function() {
  if (document.querySelector('#toggle-short-ui').checked == true) {
    document.querySelector('#toggle-short').checked = true;
  } else {
    document.querySelector('#toggle-short').checked = false;
  }
});

var toggleTutorial = document.querySelector('#toggle-tutorial-ui');
toggleTutorial.addEventListener('click', function() {
  if (document.querySelector('#toggle-tutorial-ui').checked == true) {
    document.querySelector('#toggle-tutorial').checked = true;
  } else {
    document.querySelector('#toggle-tutorial').checked = false;
  }
});

// Course card disclosure

[].forEach.call(document.querySelectorAll('.info'), function(expanded) {
  expanded.addEventListener('toggle', function() {
    expanded.parentElement.parentElement.classList.toggle('expanded');
  })
});

// Courses refresh

[].forEach.call(document.querySelectorAll('.courses-refresh'), function(refresh) {
  refresh.addEventListener('click', function() {
    document.querySelector('#toggle-full-ui').checked = true;
    document.querySelector('#toggle-short-ui').checked = true;
    document.querySelector('#toggle-tutorial-ui').checked = true;
    document.querySelector('#toggle-full').checked = true;
    document.querySelector('#toggle-short').checked = true;
    document.querySelector('#toggle-tutorial').checked = true;
  })
});
