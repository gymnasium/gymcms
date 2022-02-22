// Sort Date

var radioDate = document.querySelector('#publish-date');
radioDate.addEventListener('click', function() {
  toggleDate.removeAttribute('disabled');
  toggleLevel.setAttribute('disabled', 'disabled');
});

var courses = document.querySelector('.courses');
var toggleDate = document.querySelector('#toggle-date');
toggleDate.addEventListener('click', function() {
  if (courses.classList.contains('beginner')) {
    courses.classList.remove('beginner');
  } else if (courses.classList.contains('intermediate')) {
    courses.classList.remove('intermediate');
  } else {
    courses.classList.toggle('oldest');
  }
});

// Sort Level

var radioLevel = document.querySelector('#skill-level');
radioLevel.addEventListener('click', function() {
  toggleLevel.removeAttribute('disabled');
  toggleDate.setAttribute('disabled', 'disabled');
});

var toggleLevel = document.querySelector('#toggle-level');
toggleLevel.addEventListener('click', function() {
  courses.classList.remove('oldest');
  if (courses.classList.contains('beginner')) {
    courses.classList.replace('beginner', 'intermediate');
  } else {
    courses.classList.remove('intermediate');
    courses.classList.toggle('beginner');
  }
});

// Format toggle

var toggleFullUi = document.querySelector('#toggle-full-ui');
var toggleFull = document.querySelector('#toggle-full');
toggleFullUi.addEventListener('click', function() {
  if (toggleFullUi.checked == true) {
    toggleFull.checked = true;
  } else {
    toggleFull.checked = false;
  }
});

var toggleShortUi = document.querySelector('#toggle-short-ui');
var toggleShort = document.querySelector('#toggle-short');
toggleShortUi.addEventListener('click', function() {
  if (toggleShortUi.checked == true) {
    toggleShort.checked = true;
  } else {
    toggleShort.checked = false;
  }
});

var toggleTutorialUi = document.querySelector('#toggle-tutorial-ui');
var toggleTutorial = document.querySelector('#toggle-tutorial');
toggleTutorialUi.addEventListener('click', function() {
  if (toggleTutorialUi.checked == true) {
    toggleTutorial.checked = true;
  } else {
    toggleTutorial.checked = false;
  }
});

// Courses refresh

var coursesRefresh = document.querySelectorAll('.courses-refresh');
[].forEach.call(coursesRefresh, function(refresh) {
  refresh.addEventListener('click', function() {
    toggleFullUi.checked = true;
    toggleShortlUi.checked = true;
    toggleTutorialUi.checked = true;
    toggleFull.checked = true;
    toggleShort.checked = true;
    toggleTutorial.checked = true;
  })
});

// Course card disclosure

var toggleDetails = document.querySelectorAll('.info');
[].forEach.call(toggleDetails, function(expanded) {
  expanded.addEventListener('toggle', function() {
    expanded.parentElement.parentElement.classList.toggle('expanded');
  })
});
