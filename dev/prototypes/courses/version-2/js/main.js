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

// Sort by

var catalog = document.querySelector('#catalog');
var selectSort = document.querySelector('#select-sort');
selectSort.onchange = function() {
  catalog.className = 'courses ' + this.value;
};

// Courses refresh

var coursesRefresh = document.querySelectorAll('.courses-refresh');
[].forEach.call(coursesRefresh, function(refresh) {
  refresh.addEventListener('click', function() {
    toggleFullUi.checked = true;
    toggleShortUi.checked = true;
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
