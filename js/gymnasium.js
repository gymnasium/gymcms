/* Main JS for Gymnasium

File:         gymnasium.js
Description:  library containing helper functions used on Gymnasium
Author:       @mbifulco && @rediris
*/

// Intercept 3rd party script injection via @https://digitalrumpus.wordpress.com/2017/01/18/a-tiny-cross-browser-script-to-intercept-third-party-javascript-injection-via-document-write/
document.writeText = document.write;

document.write = function(parameter) {
  if (!parameter) return; 
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
  return elem.className.match(new RegExp('(\\s|^)'+cls+'(\\s|$)'));
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
  countDown(selector, time, url) {
    var elem = document.querySelector(selector);
  
    if (typeof elem !== 'undefined' && elem !== null) {
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

    $('.course-tabs li a b:contains("Course")').each(function(idx, value){
      value.innerHTML = "Lessons";
    });
  
    $('.course-tabs li a b:contains("Home")').each(function(idx,value){
      value.innerHTML = "Syllabus";
    });
  
    $('.course-tabs li a b:contains("Discussion")').each(function(idx, value) {
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
    var sPageURL = decodeURIComponent(window.location.search.substring(1)), sURLVariables = sPageURL.split("&"), sParameterName, i;

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
      utm_campaign: courseId + " - Enrollment",
      carrot_type: "Gymnasium Enrollment",
      carrot_topic: "GYM-" + courseId,
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
      utm_campaign: courseId + " - Grade",
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
      //console.log("[gym]: Success!\n", event);
    })
    .fail(function (event, textStatus, errorThrown) {
      //console.log("[gym]: Failure:\n", textStatus, "\n", errorThrown);
    })
    .always(function (e) {
      //console.log("[gym]: always:\n", e);
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
        // console.log(`[gym] image (${index}) found, processing`);
        var bgTarget = document.querySelectorAll('[data-bg="target"')[index];
  
        var data = gym.getPixel(image.src);

        // console.log(`[gym]: image data: ${data}`)
  
        var r = data[0];
        var g = data[1];
        var b = data[2];
        var a = data[3]; // we will likely never need non-opaque values
  
        bgTarget.style = 'background-color: rgb(' + r + ',' + g + ',' + b + ');';

      });
    }
  }

  systemStatus() {
    const helper = document.getElementById('system-status-helper');
    var banner = document.getElementById('system-status');

    if (helper.getAttribute('data-active') === 'true') {
      banner.innerHTML = helper.innerHTML;
      banner.classList.remove('hide');
      console.log('[gym] system status banner active!');
    }
  }

  // Check for browser support of localStorage or sessionStorage
  storageAvailable(type) {
    var storage;
    try {
      storage = window[type];
      var x = '__storage_test__';
      storage.setItem(x, x);
      storage.removeItem(x);
      return true;
    } catch(e) {
      return e instanceof DOMException && (
        // everything except Firefox
        e.code === 22 ||
        // Firefox
        e.code === 1014 ||
        // test name field too, because code might not be present
        // everything except Firefox
        e.name === 'QuotaExceededError' ||
        // Firefox
        e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
        // acknowledge QuotaExceededError only if there's something already stored
        (storage && storage.length !== 0);
    }
  }
  
  // TODO: finish writing out this function to get localStorage object
  getStorage(obj) {
    if (gym.storageAvailable('localStorage')) {
  
    } else {
      console.warn('[gym] no local storage available, fall back to cookie');
    }
  }
  
  // hide all exam messages
  // TODO: this could be rewritten to be element agnostic
  hideModals(cb) {
    document.querySelectorAll('.message').forEach(function(elem) {
      console.log('[gym]: hiding modal: ', elem.id);
      elem.classList.add('hidden');
      elem.setAttribute('aria-hidden', true);
    });
  
    // callback
    if (cb) {
      cb();
    }
  }

  // Main function to handle exam page stuff
  exam() {
    // TODO: add a check to only execute this on the exam page
    let examProblem = document.getElementById('exam-problem');
  
    if (!!examProblem) {
      console.log('[gym]: exam page');

      // show specific exam messages (passed, try_again, failed)
      var showExamMessage = function(status, courseType) {
        let modalsHidden = false;

        gym.hideModals(()=> {
          modalsHidden = true;
        });

        if (modalsHidden) {
          let elems;
          if (courseType) {
            elems = document.querySelectorAll('.' + status + '_modal.' + courseType);
          } else {
            elems = document.querySelectorAll('.' + status + '_modal');
          }

          elems.forEach(function(elem) {
            console.log('[gym]: showing modal: ', elem.id);
            elem.classList.remove('hidden');
            elem.setAttribute('aria-hidden', false);
          });
        }
      }

      // Use the problem-progress element to get a fraction
      var getFraction = function() {
        let [fraction] = document.querySelector('.problem-progress').innerText.trim().split(' ');
        let [numerator, denominator] = fraction.split('/');
      
        return [fraction, parseInt(numerator), parseInt(denominator)];
      }
      
      // get score from fraction numerator/denominator
      var getScoreFromFraction = function() {
        return Number(getFraction()[1] / getFraction()[2] * 100);
      }

      // get score stored in the data attribute on the .problems-wrapper element
      var getScoreFromDataAttr = function() {
        let probElem = document.querySelector('[data-problem-score]');
        return Number(probElem.getAttribute('data-problem-score'));
      }
      
      // Get highest score available?
      var getHighestScore = function(courseNum) {
        return Math.max(getScoreFromDataAttr(), getScoreFromFraction());
      }
      
      // Not sure if localStorage is the best way to go about this, since that value won't persist across different devices
      var getPrevScore = function(courseNum) {
        let prevScore;
        let grades = {};
      
        if (gym.storageAvailable('localStorage')) {
          if (localStorage.getItem('grades')) {
            grades = JSON.parse(localStorage.getItem('grades'));
            prevScore = grades[courseNum] ? grades[courseNum] : getHighestScore();
      
          } else {
            prevScore = getHighestScore();
          }
      
          // update grades object & store
          grades[courseNum] = prevScore;
          localStorage.setItem('grades', JSON.stringify(grades));
      
        } else {
          console.warn('[gym]: no local storage available');
          // TODO: add alternate options
        }
      
        return prevScore;
      }
      
      // This is where we customize how the score is displayed to the end-user
      var prettyScore = function() {
        let examGrade = document.getElementById('exam-grade');
      
        examGrade.innerText = 'Your score: ' + getScoreFromFraction();
      }

      let progressStatusCheck; // this is the interval we'll set to track status on this problem
  
      let prettyScoreCheck; // interval for pretty score check
  
      let previousScore;
  
      let courseNum = parseInt(document.getElementById('__course_number__').innerText, 10);

      const courseTypes = {
        full: 'FULL_COURSE',
        short: 'GYM_SHORT',
      };

      const courseType = courseNum >= 100 ? courseTypes.full : courseTypes.short;

      // full courses have a passing grade of 85
      let passingScore = 85;

      if (courseType === courseTypes.short) {
        // gym shorts have a passing grade of 80
        passingScore = 80;
      }
  
      // this helper function gets a ton of information about the score for this particular problem
      // based on information embedded on this page
      function processScore() {
        console.log('[gym]: processScore function');
  
        var correct = Number(getFraction()[1]);
        var outOf = Number(getFraction()[2]);
  
        var attemptsUsed = Number(document.getElementById('attempts-used').innerText);
        var attemptsTotal = Number(document.getElementById('attempts-allowed').innerText);
  
        return {
          courseType: courseType,
          passingScore: passingScore,
          score: getScoreFromFraction(),
          correct,
          outOf,
          attemptsUsed,
          attemptsTotal,
          attemptsRemaining: attemptsTotal - attemptsUsed,
        };
      };
  
      function showProblemProgress(state) {
        console.log('[gym]: showProblemProgress function');
        let {
          attemptsUsed,
          attemptsTotal,
          attemptsRemaining,
          correct,
          courseType,
          outOf,
          score,
          passingScore,
        } = processScore();
  
        if (!correct || !outOf) {
          return;
        }
  
        // update exam score span
        let examScoreMessage = document.querySelectorAll('.exam-score-container');
  
        examScoreMessage.forEach(function(el) {
          el.innerText = score;
        });
  
        // we have a score, let's do stuff
        if (score >= passingScore) {
          // previousScore = getPrevScore(courseNum);
  
          // if (score > previousScore && attemptsRemaining > 0) {
          //   console.log('[gym]: new high score! ', score, '\nprevious score: ', previousScore);
          // } else {
          //   console.log('[gym]: score is not higher than previous score');
          // }
  
          //we passed! show passing div for the type of course they took
          showExamMessage('passed', courseType);

          //generate the certificate through the API
          // TODO: change this to native JS
          if (state === 'submit') {
            console.log('[gym]: this is where the exam ajax submission occcurs');
            // $.ajax({
            //   type:     'POST',
            //   // TODO: use accredible sandbox to test? sandbox.api.accredible.com
            //   //url:      '/accredible/request_certificate',
            //   async:     false,
            //   data:     {
            //     'course_id': window.$$course_id
            //   },
            //   success:  function(data) {
            //     // console.log('[gym]: certificate request successful: ', data);
            //   }
            // });
          }
          
        } else {
          //we failed :( see if we have another attempt
          if (attemptsRemaining > 0) {
            showExamMessage('try_again', courseType);
          } else {
            showExamMessage('failed', courseType);
          }
        }
      }
  
      function checkStatus(state) {
        console.log('[gym]: checkStatus function');
        const {
          attemptsUsed,
          correct,
        } = processScore();
  
        if (attemptsUsed > 0 || correct > 0) {
          clearInterval(progressStatusCheck);
          showProblemProgress(state);
        }
      }
  
      let problemId = document.getElementById('exam-problem').getAttribute('data-id');

      // previousScore = getPrevScore(courseNum);
  
      // console.log('[gym]: exam page | previous score: ', previousScore);
  
      let observer = new MutationObserver(mutationRecords => {
        // log
        // console.log('[gym]: mutation records: ', mutationRecords);
  
        // reset interval if we detect a grade change
        if (typeof progressStatusCheck !== 'undefined') {
          clearInterval(progressStatusCheck);
        }
        // set interval on initial page load
        progressStatusCheck = setInterval(checkStatus, 200);
  
        // Pretty score stuff
        if (typeof prettyScoreCheck !== 'undefined') {
          clearInterval(prettyScoreCheck);
        }
  
        prettyScoreCheck = setInterval(prettyScore, 2000);
      });
  
      observer.observe(
        document.getElementById(problemId + '-problem-progress'),
        {
          characterData: false,
          attributes: false,
          childList: true,
          subtree: false
        },
      );

      let checkButton = document.getElementById('check-button');

      checkButton.addEventListener('click', function() {
        // console.log('[gym]: check exam button clicked');
        // TODO: re-process the exam score.

        checkStatus('submit');
  
        // scroll to show the results message
        document.getElementById('course_passed_message').scrollIntoView();
      }, false);

      prettyScore();
      checkStatus('load');
    } else {
      console.log('[gym]: not exam page');
    }
  }
}

// Initialize
var gym = new Gymnasium();

// Countdown timer on info page
gym.countDown('[data-countdown]', 10, '/login?next=' + encodeURIComponent(window.location.href));

// Do wicked stuff to course tabs
gym.courseTabs();

// initialize nav caret
gym.dropdownCaret();

// check ie browser version
gym.ieCheck();

// Adds dynamic system status banner
gym.systemStatus();

// Native JS equivalent of jQuery's document.ready
document.addEventListener('readystatechange', event => {
  if (event.target.readyState === 'interactive') {
    console.log('[gym]: document ready state: interactive');

  } else if (event.target.readyState === 'complete') {
    console.log('[gym]: document ready state: complete');

    gym.setBgFromImage();
    gym.accountDeletion();
    gym.exam();

  }
});
