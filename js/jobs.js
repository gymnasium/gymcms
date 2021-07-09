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

// Polyfill for trim @https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/Trim
if (!String.prototype.trim) {
  String.prototype.trim = function () {
    return this.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
  };
}

// Shuffle items
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

// Create IE + others compatible event handler via @https://davidwalsh.name/window-iframe
var eventMethod = window.addEventListener ? "addEventListener" : "attachEvent";
var eventer = window[eventMethod];
var messageEvent = eventMethod == "attachEvent" ? "onmessage" : "message";

// Get URL Parameter
function getUrlParameter(name) {
  name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
  var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
  var results = regex.exec(location.search);
  return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
};

// function to help parse data options
function parseValue(str) {
  if ('true' === str) {
    return true;
  } else if ('false' === str) {
    return false;
  } else if (!isNaN(str * 1)) {
    return parseFloat(str);
  }

  return str;
}

// Create an array of options
function parseOptions(input, output) {
  input.split(';').forEach(function (option, _index) {
    var opt = option.split(':').map(function (el) {
      return el.trim();
    });
    if (opt[0]) {
      output[opt[0]] = parseValue(opt[1])
    };
  });
}

var opts = {};
var debug = getUrlParameter('debug') ? true : false;
var data;
var endpoint;
var fallback;
var endpointExists = false;
var url = new URL(window.location.href);
const jobsContainer = document.getElementById('jobs-container');
const msgContainer = document.getElementById('messages');
const form = document.getElementById('m');

if (jobsContainer.hasAttribute('data-options')) {
  parseOptions(jobsContainer.getAttribute('data-options'),opts);
}

if (jobsContainer.hasAttribute('data-endpoint')) {
  endpoint = jobsContainer.getAttribute('data-endpoint');
}

if (jobsContainer.hasAttribute('data-fallback')) {
  fallback = jobsContainer.getAttribute('data-fallback');
}

// Add exception for `remote` option in the markets dropdown
var market = getUrlParameter('m') === 'remote' ? undefined : getUrlParameter('m');

// If we have a market populated on page load, update the dropdown
if (typeof market !== 'undefined' && market !== null && market.length) {
  updateDropdown(market);
}

function outputDebug(message) {
  if (debug) {
    console.log(message);
  }
}

// Clear results completely
function clearResults() {
  jobsContainer.innerHTML = '';
}

// What to do when the select updates
function selectChange() {
  var value = this.value
  if (value === 'remote') {
    market = undefined;
  } else {
    market = value;
  }

  let params = new URLSearchParams(url.search);

  // add "topic" parameter
  params.set('m', value);

  if(debug) {
    params.set('debug', true);
  }

  params.toString();

  window.history.pushState({}, '', '?' + params + '#location');
  
  outputDebug('[job module] market selected: ' + market);

  hideMsg();
  clearResults();

  conductData();
}

// Update dropdown to the selected option
function updateDropdown(m) {
  document.querySelector('#m [value="' + m + '"]').selected = true;
}

function hideMsg() {
  // firstly, hide any visible messaging
  msgContainer.querySelectorAll('div').forEach(el => {
    el.classList.add('hide');
  });
}

// Show our messaging accordingly
function showMsg(id) {
  // firstly, hide any visible messaging
  hideMsg();

  // show the element we want!
  document.getElementById(id).classList.remove('hide');
}

// Store our data in session storage
function store(name,data) {
  if (window.sessionStorage) {
    sessionStorage.setItem(name, data);
  } else {
    console.warn('[job module] No browser support for sessionStorage!');
  }
}

function handleEvent(e) {
  outputDebug(`[job module] ${e.type}: ${e.loaded} bytes transferred\n`)

  if (e.type === 'error' || e.type === 'abort') {
    endpointExists = false;
  } else if (e.type === 'loadend') {
    endpointExists = true;
  }
}

function addListeners(xhr) {
  xhr.addEventListener('loadstart', handleEvent);
  xhr.addEventListener('load', handleEvent);
  xhr.addEventListener('loadend', handleEvent);
  xhr.addEventListener('progress', handleEvent);
  xhr.addEventListener('error', handleEvent);
  xhr.addEventListener('abort', handleEvent);
}

function testEndpoint(url, cb) {
  var request = new XMLHttpRequest();

  addListeners(request);
  request.open('GET', url, true);

  request.send();

  if (cb) {
    cb();
  }
}

// AJAX fetch
function fetchData(url) {

  var request = new XMLHttpRequest();
  
  request.open('GET', url, true);

  request.send();

  request.onload = function() {

    if (this.status >= 200 && this.status < 400) {
      if (typeof this.response !== "undefined" && this.response !== null) {
        var response = this.response;

        store('jobs', response);

        outputDebug('[job module] fetching data from endpoint: ' + endpoint);

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

  request.onabort = function() {
    // There was a connection error of some sort
    showMsg('error-connection');
  };
}

function conductData() {
  // If we have jobs stored locally already in the browser session...
  if (window.sessionStorage && sessionStorage.getItem('jobs')) {
    data = sessionStorage.getItem('jobs');

    outputDebug('[job module] data from sessionStorage');

    processData(data);
  } else {

    try {
      testEndpoint(endpoint + '?limit=1', function(){
        outputDebug(`[job module] endpoint ${endpoint} exists: ${endpointExists}`)
        if (endpointExists) {
          endpoint += '?limit=1500';
        } else {
          endpoint = fallback;
        }

        outputDebug(`[job module] fetching ${endpoint}`);

        fetchData(endpoint);
      });

    } catch(err) {

      console.warn('[job module] some type of error occurred, reverting to local feed! ', err);

      endpoint = fallback;

      fetchData(endpoint);
    }

    // Stone Age Method (JSONP)
    // function stoneAgeFetch(resp) {
    //   data = JSON.stringify(resp);
    //   console.log('[job module] getting data via the stone age fetch');
    //   store('jobs', data);
    //   processData(data);
    // }
    
    // let script = document.createElement('script');
    // script.src = `${endpoint}?callback=stoneAgeFetch`;
    // script.id = 'stone-age-fetch';
    // document.body.append(script);
    
  }
}

// Process our JSON data
function processData(d) {
  data = JSON.parse(d);

  var items = data.items;

  // Wrap our jobs in headings or no?
  var optHeading = opts.heading ? opts.heading : false;

  // Do we have a specific category?
  var category = opts.category ? opts.category : false;

  // Set iteration limits
  var limit = opts.limit ? parseInt(opts.limit) : 10;

  if (category) {
    items = items.filter(item => item.category === category);

    outputDebug('[job module] showing jobs for a specific category: ' + category);
  }

  // Filter the jobs by market if we have a market param
  if ((typeof market !== 'undefined' && market !== null) && market.length) {
    items = items.filter(item => item.market === market);

    outputDebug('[job module] showing jobs for a specific market: ' + market);
  } else {
    // Off-site preference key
    // 0 = Unknown
    // 1 = On-Site
    // 2 = Off-Site
    // 3 = Either
    // 4 = Partial on-site
    items = items.filter(item => parseInt(item.remote) === 2);
    updateDropdown('remote');

    outputDebug('[job module] showing only remote options…');
  }

  // Randomize the results we show…
  items = items.shuffle();

  // How many results do we have?
  var numResults = items.length;

  outputDebug(`[job module] results: ${numResults} | limit: ${limit}`);

  if (numResults > 0) {
    
    // Start with an empty list
    var list = "";

    // hide our loading message
    document.getElementById('loading').classList.add('hide');

    if (numResults < limit) {
      limit = numResults;
    }

    // Generate job item
    for (var i = 0; i < limit; i++) {
      el = items[i];
      list += '<li>';
      // Add optional heading prefix
      if (optHeading) {
        list += '<' + optHeading + '>';
      }
      list += '<a href="' + decodeURI(el.url) + '?utm_campaign=gymnasium" title="' + el.title + '"><span class="job-title">' + el.title + ' </span><span class="job-location"> ' + el.city + '</span></a>';
      if (optHeading) {
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

if (typeof jobsContainer !== 'undefined' && jobsContainer !== null) {
  conductData();
}

// Listen for change events from form select
form.addEventListener('change', selectChange, false);

// Listen for geolocator messages from our iframe
eventer(messageEvent,function(event) {
  // Reject messages that are not from a valid origin domain
  const regex = new RegExp('https:\/\/.*assets.aquent.com');
  if (regex.test(event.origin)) {
    outputDebug('[geolocator] ' + event.data);

    parseOptions(event.data,opts);
  }
}, false);


// TODO: add iframe dynamically? 
// window.onload = function(){
//   document.getElementById('YOURID').src = 'https://insertYourUrlHere.com'
// };
