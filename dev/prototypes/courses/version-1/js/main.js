// Format toggle

var toggleFull = document.querySelector("#toggle-full-ui");
toggleFull.addEventListener("click", function() {
  if (document.querySelector("#toggle-full-ui").checked == true) {
    document.querySelector("#toggle-full").checked = true;
  } else {
    document.querySelector("#toggle-full").checked = false;
  }
});

var toggleShort = document.querySelector("#toggle-short-ui");
toggleShort.addEventListener("click", function() {
  if (document.querySelector("#toggle-short-ui").checked == true) {
    document.querySelector("#toggle-short").checked = true;
  } else {
    document.querySelector("#toggle-short").checked = false;
  }
});

var toggleTutorial = document.querySelector("#toggle-tutorial-ui");
toggleTutorial.addEventListener("click", function() {
  if (document.querySelector("#toggle-tutorial-ui").checked == true) {
    document.querySelector("#toggle-tutorial").checked = true;
  } else {
    document.querySelector("#toggle-tutorial").checked = false;
  }
});

// Courses refresh

[].forEach.call(document.querySelectorAll(".courses-refresh"), function(refresh) {
  refresh.addEventListener("click", function() {
    document.querySelector("#toggle-full-ui").checked = true;
    document.querySelector("#toggle-short-ui").checked = true;
    document.querySelector("#toggle-tutorial-ui").checked = true;
    document.querySelector("#toggle-full").checked = true;
    document.querySelector("#toggle-short").checked = true;
    document.querySelector("#toggle-tutorial").checked = true;
  })
});
