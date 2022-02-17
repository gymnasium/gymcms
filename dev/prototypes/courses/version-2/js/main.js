// Sort

// Level

var selectLevel = document.querySelector('#select-level');
selectLevel.onchange = function() {
  document.querySelector('#catalog').className = 'courses ' + this.value;
};

// Order

var selectOrder = document.querySelector('#select-order');
selectOrder.onchange = function() {
  document.querySelector('#catalog').className = 'courses ' + this.value;
};


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
