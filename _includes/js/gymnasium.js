/* Main JS for Gymnasium

File:         gymnasium.js
Description:  library containing helper functions used on Gymnasium
Author:       @mbifulco && @rediris
*/

// Intercept 3rd party script injection via @https://digitalrumpus.wordpress.com/2017/01/18/a-tiny-cross-browser-script-to-intercept-third-party-javascript-injection-via-document-write/
document.writeText = document.write;

document.write = function(parameter) {
  if (!parameter) {
    return;
  }
  var scriptPattern = /<script.*?src=['|"](.*?)['|"]/;
  if (scriptPattern.test(parameter)) {
    var srcAttribute = scriptPattern.exec(parameter)[1];
    var script = document.createElement('script');
    script.src = srcAttribute;
    document.head.appendChild(script); 
  } else {
    document.writeText(parameter);
  }
};

function hasClass(elem,cls) {
  return elem.className.match(new RegExp(`(\\s|^)${cls}(\\s|$)`));
}

// Test for visibility (doesn't work for fixed position elems)
function isHidden(el) {
  return (el.offsetParent === null)
}

class Gymnasium {
  constructor() {}

  // account deletion
  accountDeletion() {

    var updateDeletionContainer = setInterval(function() {
      var deletionContainer = document.getElementById('account-deletion-container'); 

      if (typeof deletionContainer !== 'undefined' && deletionContainer !== null) {
        deletionContainer.innerHTML = document.getElementById('deletion-helper').innerHTML;

        clearInterval(updateDeletionContainer);
      }
    }, 250);

  }

  // countdown timer
  countDown(selector) {
    var elem = document.querySelector(selector);
  
    if (typeof elem !== 'undefined' && elem !== null) {
      var time = elem.innerHTML;
      var url = elem.getAttribute('data-redirect-url');
      var counter = parseInt(time);

      var redirectTimer = setInterval(function() {

        if (counter <= 0){
          clearInterval(redirectTimer);
          window.location.href = url;
        } else {
          elem.innerHTML = counter;
        }

        counter -= 1;
      }, 1000);
    }
  }

  courseTabs() {
    /* this is a nonsense hack to make courseware subnavigation look like
    what we want it to look like until we move to Cypress
    TODO: Unhackify this. */

    $('.course-tabs li a:contains("Course")').each(function(idx, value){
      value.innerHTML = "Lessons";
    });
  
    $('.course-tabs li a:contains("Home")').each(function(idx,value){
      value.innerHTML = "Syllabus";
    });
  
    $('.course-tabs li a:contains("Discussion")').each(function(idx, value) {
      value.innerHTML = "Forum";
    });
  
    // make sure lessons tab comes first
    var syllabusTab = $('.course-tabs li:contains("Lessons")');

    $(syllabusTab).prependTo(
      $(syllabusTab).parent()
    );
  
    $('.course-tabs li a:contains("Forum")').each(function(idx,value){
    /* TODO: Unhack this silly logic to hide forum tab for gym shorts
  
      we're looking at the href property of this anchor to see if it contains
      a course link that has "Gym/00" in it.  All gym shorts start with "0"
      so that should hide this link. Note that this does _not_ disable
      forums... those pages will still exist, but we won't link to them. */
      if ($(value).attr("href").toLowerCase().indexOf("gym/0") > 0)
      {
        $(value).parent().hide();
      }
    })
  
    $('.course-tabs li:contains("Progress")').hide();
    $('.course-tabs').show();
  }

  // Show/hide the caret in the nav login/logout dropdown
  dropdownCaret() {
    var button = document.getElementById('dropdown');
      
    if (typeof button !== 'undefined' && button !== null) {
      var caret = button.querySelector('.caret');
      var menu = document.getElementById('dropdown-menu');

      button.addEventListener('click', function(event) {
        if (menu.style.display !== 'inline') {
          menu.style.display = 'inline';
          caret.classList.add('hide');
        } else {
          menu.style.display = 'none';
          caret.classList.remove('hide');
        }
      }, false);
    }
  }

  ///get a URL parameter passed in with HTTP GET
  ///NOTE: this function is not case sensitive
  getUrlParameter(sParam) {
    var sPageURL = decodeURIComponent(window.location.search.substring(1));
    var sURLVariables = sPageURL.split("&");
    var sParameterName;
    var i;

    for (i = 0; i < sURLVariables.length; i++) {
      sParameterName = sURLVariables[i].split("=");

      if (sParameterName[0].toLowerCase() === sParam.toLowerCase()) {
        return sParameterName[1] === undefined ? true : sParameterName[1];
      }
    }
  }

  /* This function returns Internet Explorer's major version number,
  or 0 for others. It works by finding the "MSIE " string and
  extracting the version number following the space, up to the decimal
  point, ignoring the minor version number
  for more info, see: https://support.microsoft.com/en-us/kb/167820 */
  ieVersion() {
    var ua = window.navigator.userAgent
    var msie = ua.indexOf ( "MSIE " )

    // If Internet Explorer, return version number
    if ( msie > 0 ) {
      return parseInt (ua.substring (msie+5, ua.indexOf (".", msie )))
    } else {
      // If another browser, return 0
      return 0
    }
  }

  displayBrowserWarning() {
    document.getElementById('browserWarning').style.display = 'block';
  }

  ieCheck() {
    var version = gym.ieVersion();

    // make sure that we are using IE > 9
    if (version > 0 && version < 11) {
      gym.displayBrowserWarning();
    }
  }

  injectFBTrackingPixel() {
    // do absolutely nothing. TODO: cleanup after theme release
  }

  recordCourseEnrollment(firstName, lastName, emailAddress, courseId, callback) {
    var data = {
      first_name: firstName,
      last_name: lastName,
      email: emailAddress,
      course: courseId,
      utm_campaign: `${courseId} - Enrollment`,
      carrot_type: "Gymnasium Enrollment",
      carrot_topic:`GYM-${courseId}`,
      PROC: "AWUISubmitExternalLead",
    };

    gym.recordCloudwallRecord(data, callback);
  }

  recordExamGrade(email,courseId,grade,callback) {
    var data = {
      leadDestination: window.CW_ENV,
      email: email,
      score: grade,
      course_id: courseId,
      utm_campaign: `${courseId} - Grade`,
    };
    return gym.recordCloudwallRecord(data, callback);
  }

  recordRegistration(emailAddress,firstName,lastName,cityId,callback) {
    var data = {
      first_name: firstName,
      last_name: lastName,
      email: emailAddress,
      location: cityId,
      utm_campaign: "Registration",
      carrot_type: "Gymnasium Registration", // Lead Source Type in CW
      carrot_topic: "GYM REG", // How Heard Other in CW
      PROC: "AWUISubmitExternalLead",
    };

    Intercom("trackEvent", "registration", data);
    return gym.recordCloudwallRecord(data, callback);
  }

  recordCloudwallRecord(jsonData, callback) {
    jsonData.utm_source = "gymnasium.com";
    jsonData.utm_medium = "web";
    jsonData.utm_content = "not-provided";
    jsonData.utm_term = "not-provided";
    jsonData.agent_email = "gymleads@aquent.com";
    jsonData.agent_id = "1694600";
    jsonData.agent_name = "TALENT LEAD NURTURING";
    jsonData.carrot = "thegymnasium.com";
    jsonData.subdomain = window.CW_ENV;
    jsonData.language = "en_US";
    jsonData.medium = "1009";
    jsonData.referring_site = "thegymnasium.com";
    jsonData.status = "Talent";
    jsonData.referer = "thegymnasium.com";

    $.ajax("https://assets.aquent.com/apps/gym/lead-processor", {
      contentType: "application/json",
      dataType: "jsonp",
      data: jsonData,
    })
    .done(function (event) {
      //console.log("Success!\n", event);
    })
    .fail(function (event, textStatus, errorThrown) {
      //console.log("Failure:\n", textStatus, "\n", errorThrown);
    })
    .always(function (e) {
      //console.log("always:\n", e);
      if (callback) {
        callback();
      }
    });
  }

  getPixel(url) {
    var img = new Image();
    img.src = url;
    var canvas = document.createElement('canvas');
    var context = canvas.getContext('2d');
    context.drawImage(img, 0, 0);
    return context.getImageData(1, 1, 1, 1).data;
  }

  setBgFromImage() {

    var images = document.querySelectorAll('[data-bg="source"');

    if (typeof images !== 'undefined' && images !== null) {
      images.forEach((image, index) => {
        // console.log(`[gym] image (${index})  found, processing`);
        var bgTarget = document.querySelectorAll('[data-bg="target"')[index];
  
        var data = gym.getPixel(image.src);

        // console.log(`image data: ${data}`)
  
        var r = data[0];
        var g = data[1];
        var b = data[2];
        var a = data[3]; // we will likely never need non-opaque values
  
        bgTarget.style = `background-color: rgb(${r},${g},${b})`;

      });
    }
  }

  systemStatus() {
    const helper = document.getElementById('system-status-helper');
    var banner = document.getElementById('system-status');
    var bannerExclude = document.querySelector('meta[name="banner-exclude"]');
    var exclude = false;

    function showBanner() {
      banner.innerHTML = helper.innerHTML;
      banner.classList.remove('hide');
      banner.classList.add('active');
      console.log('[gym] system status banner active!');
    }

    // Method 1: Is there a meta tag for banner exclusion?
    if (typeof bannerExclude !== 'undefined' && bannerExclude !== null) {
      // console.log(`bannerExclude.content: ${bannerExclude.content}`);
      exclude = true;
    }

    if (helper.getAttribute('data-active') === 'true' && exclude !== true) {
      showBanner();
    }
  }
}

// Initialize
var gym = new Gymnasium();

// Countdown timer on info page
gym.countDown('[data-countdown]');

// Do wicked stuff to course tabs
gym.courseTabs();

// initialize nav caret
gym.dropdownCaret();

// check ie browser version
gym.ieCheck();

// Adds dynamic system status banner
gym.systemStatus();

document.onreadystatechange = function() {
  if (document.readyState === 'complete') {
    gym.setBgFromImage();
    gym.accountDeletion();
  }
};
