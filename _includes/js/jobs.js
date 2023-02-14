// Polyfill for Array.prototype.filter() via @https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter
if (!Array.prototype.filter){
  Array.prototype.filter = function(func, thisArg) {
    'use strict';
    if ( ! ((typeof func === 'Function' || typeof func === 'function') && this) ) {
      throw new TypeError();
    }

    var len = this.length >>> 0;
    var res = new Array(len); // preallocate array
    var t = this;
    var c = 0;
    var i = -1;

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
var messageEvent = eventMethod === "attachEvent" ? "onmessage" : "message";

// Get URL Parameter
function getUrlParameter(name) {
  name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
  var regex = new RegExp(`[\\?&]${name}=([^&#]*)`);
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

function processJobs(JSONP) {
  const jobsContainer = document.getElementById('jobs-container');

  if (typeof jobsContainer !== 'undefined' && jobsContainer !== null) {
    var opts = {};
    var debug = getUrlParameter('debug') ? true : false;
    var data;
    var url = new URL(window.location.href);
    const msgContainer = document.getElementById('messages');
    const form = document.getElementById('m');

    // Off-site preference key
    let remoteLegend = {
      0: "Unknown",
      1: "On-Site",
      2: "Off-Site",
      3: "Either",
      4: "Partial on-site",
    }

    if (jobsContainer.hasAttribute('data-options')) {
      parseOptions(jobsContainer.getAttribute('data-options'),opts);
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
    
      window.history.pushState({}, '', `?${params}#location`);
      
      outputDebug(`[job module] market selected: ${market}`);
    
      hideMsg();
      clearResults();
    
      conductData();
    }
    
    // Update dropdown to the selected option
    function updateDropdown(m) {
      document.querySelector(`#m [value="${m}"]`).selected = true;
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
    
    function conductData() {
      // If we have jobs stored locally already in the browser session...
      if (window.sessionStorage && sessionStorage.getItem('jobs')) {
        try {
          data = sessionStorage.getItem('jobs');
    
          outputDebug('[job module] data from sessionStorage');
      
        } catch(err) {
          console.warn('[job module] error retrieving sessionStorage data.', err);
        }

      } else {
    
        try {
          outputDebug(`[job module] storing JSONP data.`);

          data = JSON.stringify(JSONP);
          store('jobs', data);
    
        } catch(err) {
          console.warn('[job module] error storing/processing JSONP!', err);
        }
      }

      try {
        processData(data);
      } catch(err) {
        console.warn('[job module] error processing data!', err);
      }
    }
    
    // Process our JSON data
    function processData(d) {
      data = JSON.parse(d);
      if (typeof data.items !== 'undefined' && data.items !== null) {
        
        var items = data.items;

        outputDebug(`[job module] ${items.length} total jobs available.`);
    
        // Wrap our jobs in headings or no?
        var optHeading = opts.heading ? opts.heading : false;
      
        // Do we have a specific category?
        var category = opts.category ? opts.category : false;
      
        // Set iteration limits
        var limit = opts.limit ? parseInt(opts.limit) : 10;

        if (category) {
          items = items.filter(item => item.category === category);
      
          outputDebug(`[job module] showing ${items.length} jobs for category: ${category}.`);
        }
      
        // Filter the jobs by market if we have a market param
        if ((typeof market !== 'undefined' && market !== null) && market.length) {
          items = items.filter(item => item.market === market);
      
          outputDebug(`[job module] showing ${items.length} jobs for market: ${market}.`);
        } else {
          // Off-site preference key
          // 0 = Unknown
          // 1 = On-Site
          // 2 = Off-Site
          // 3 = Either
          // 4 = Partial on-site
          items = items.filter(item => parseInt(item.remote) >= 2);
          updateDropdown('remote');
      
          outputDebug('[job module] showing only remote & hybrid options…');
        }
      
        // How many results do we have?
        var numResults = items.length;
      
        outputDebug(`[job module] total results: ${numResults} | limit: ${limit}`);
      
        if (numResults > 0) {
          // Sort array by mod/post date properly, whichever is more recent
          items = items.sort((a, b) => {
            
            const aModDate = new Date(a.modDate).getTime();
            const aPostDate = new Date(a.postedDate).getTime();
            const bModDate = new Date(b.modDate).getTime();
            const bPostDate = new Date(b.postedDate).getTime();

            const compA = aModDate > aPostDate ? aModDate : aPostDate;
            const compB = bModDate > bPostDate ? bModDate : bPostDate;

            return compB - compA;
          });
          
          // Start with an empty list
          var list = "";
      
          // hide our loading message
          document.getElementById('loading').classList.add('hide');
      
          if (numResults < limit) {
            limit = numResults;
          }
      
          // Generate job item
          for (var i = 0; i < limit; i++) {
            var el = items[i];
            var postDate = el.postedDate;
            var modDate = el.modDate;

            outputDebug(`[job module] job id: ${el.id}\n   remote type: ${remoteLegend[el.remote]}\n   posted: ${postDate}\n   mod date: ${modDate}`);

            list += '<li>';
            // Add optional heading prefix
            if (optHeading) {
              list += `<${optHeading}>`;
            }
            list += `<a href="${decodeURI(el.url)}?utm_source=gymnasium&utm_medium=web&utm_campaign=job-module&utm_content=textlink" title="${el.title}"><span class="job-title">${el.title} </span><span class="job-location"> ${el.city}</span></a>`;
            if (optHeading) {
              list += `</${optHeading}>`;
            }
            list += '</li>';
          }
      
          // close our list
          jobsContainer.innerHTML += `<ul>${list}</ul>`;
        } else {
          // No jobs in market! Show the appropriate message.
          showMsg('error-results');
        }
      } else {
        // No data found for some reason...
        showMsg('error-unknown');
      }
    }
    
    conductData();
    
    // Listen for change events from form select
    form.addEventListener('change', selectChange, false);

    /* Currently unused/inactive
    // Listen for geolocator messages from our iframe
    eventer(messageEvent,function(event) {
      // Reject messages that are not from a valid origin domain
      const regex = new RegExp('https:\/\/.*assets.aquent.com');
      if (regex.test(event.origin)) {
        outputDebug(`[geolocator] ${event.data}`);
    
        parseOptions(event.data,opts);
      }
    }, false);
    */
  }
}
