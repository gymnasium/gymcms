// Polyfill for Array.prototype.filter() via @https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter
if (!Array.prototype.filter){
  Array.prototype.filter = function(func, thisArg) {
    'use strict';
    if ( ! ((typeof func === 'Function' || typeof func === 'function') && this) )
        throw new TypeError();

    var len = this.length >>> 0,
        res = new Array(len), // preallocate array
        t = this, c = 0, i = -1;

    var kValue;
    if (thisArg === undefined){
      while (++i !== len){
        // checks to see if the key was set
        if (i in this){
          kValue = t[i]; // in case t is changed in callback
          if (func(t[i], i, t)){
            res[c++] = kValue;
          }
        }
      }
    }
    else{
      while (++i !== len){
        // checks to see if the key was set
        if (i in this){
          kValue = t[i];
          if (func.call(thisArg, t[i], i, t)){
            res[c++] = kValue;
          }
        }
      }
    }

    res.length = c; // shrink down array to proper size
    return res;
  };
}

Array.prototype.shuffle = function () {
  let input = this;

  for (let i = input.length - 1; i >= 0; i--) {

    let randomIndex = Math.floor(Math.random() * (i + 1));
    let itemAtIndex = input[randomIndex];

    input[randomIndex] = input[i];
    input[i] = itemAtIndex;
  }
  return input;
}

// Get URL Parameter
function getUrlParameter(name) {
  name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
  var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
  var results = regex.exec(location.search);
  return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
};

var data;
const jobsContainer = document.getElementById('jobs');
const msgContainer = document.getElementById('messages');
var endpoint = 'https://stag-assets.aquent.com/apps/gym/jobs.json?limit=1500';

// For testing/debugging
if (window.location.host == 'localhost:4000') {
  endpoint = '/feeds/jobs.json';
}

// Add exception for `remote` option in the markets dropdown
var market = getUrlParameter('m') == 'remote' ? undefined : getUrlParameter('m');

// If we have a market populated on page load, update the dropdown
if (typeof market !== 'undefined' && market !== null && market.length) {
  updateDropdown(market);
  
}

if (getUrlParameter('submitted') === 'true') {
  console.log('we gotta scroll to it!');
  location.href = '#location';
}

// Update dropdown to the selected option
function updateDropdown(m) {
  document.querySelector('#m [value="' + m + '"]').selected = true;
}

function showMsg(id) {
  // firstly, hide any visible messaging
  msgContainer.querySelectorAll('div').forEach(el => {
    el.classList.add('hide');
  });

  // show the element we want!
  document.getElementById(id).classList.remove('hide');
}

// If we have jobs stored locally already in the browser session...
if (window.sessionStorage && sessionStorage.getItem('jobs')) {
  data = sessionStorage.getItem('jobs');
  console.log('data from sessionStorage');

  processData(data);
} else {
  // Otherwise, get the jobs from the endpoint

  var request = new XMLHttpRequest();

  request.open('GET', endpoint, true);

  request.onload = function() {

    if (this.status >= 200 && this.status < 400) {
      if (typeof this.response !== "undefined" && this.response !== null) {
        var response = this.response;

        if (window.sessionStorage) {
          // TODO: add an expiration?
          // const now = new Date();
          // response["timestamp"]= now.getTime();

          sessionStorage.setItem('jobs', response);
        } else {
          console.warn('No browser support for sessionStorage!');
        }

        console.log('fetching data from endpoint: ', endpoint);

        processData(response);

      } else {
        // No jobs in market (or there was no data)! Show the appropriate message.
        showMsg('error-results');
      }
    } else {
      // We reached our target server, but it returned an error
      showMsg('error-server');
    }
  };

  request.onerror = function() {
    // There was a connection error of some sort
    showMsg('error-connection');
  };

  request.send();
}

// Process our JSON data
function processData(data) {
  data = JSON.parse(data);

  var items = data.items;

  // Filter the jobs by market if we have a market param
  if (typeof market !== 'undefined' && market !== null && market.length) {
    items = items.filter(item => item.market === market);
    console.log('showing jobs for a specific market');
  } else {
    // Off-site preference key
    // 0 = Unknown
    // 1 = On-Site
    // 2 = Off-Site
    // 3 = Either
    // 4 = Partial on-site
    items = items.filter(item => parseInt(item.remote) == 2);
    updateDropdown('remote');
    console.log('showing remote options…');
  }

  // Randomize the results we show…
  items = items.shuffle();

  // How many results do we have?
  var numResults = items.length;

  if (numResults > 0) {

    var optHeading = jobsContainer.getAttribute('data-h');

    // Start with an empty list
    var list = "";

    // hide our loading message
    document.getElementById('loading').classList.add('hide');

    // Set iteration limits
    var limit = 10;

    if (numResults < limit) {
      limit = numResults;
    }

    // Generate job item
    for (var i = 0; i < limit; i++) {
      el = items[i];
      list += '<li>';
      // Add optional heading prefix
      if (optHeading.length) {
        list += '<' + optHeading + '>';
      }
      list += '<a href="' + decodeURI(el.url) + '?utm_campaign=gymnasium" title="' + el.title + '"><span class="job-title">' + el.title + ' </span><span class="job-location"> ' + el.city + '</span></a>';
      if (optHeading.length) {
        list += '</' + optHeading + '>';
      }
      list += '</li>';
    }

    // close our list
    jobsContainer.innerHTML += `<ul>${list}</ul>`;
  } else {
    // No jobs in market! Show the appropriate message.
    showMsg('error-results');
  }
}
