// Gymnasium JS

/// File:         gymnasium.js
/// Description:  library containing helper functions used on Gymnasium
/// Author:       @mbifulco && @rediris

// Document 
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

class Gymnasium {
  constructor() {}

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
      forums... those pages will still exist, but we won't like to them. */
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

  // Handle exam/grading/certificate
  exam() {
    const examProblem = document.getElementById('exam-problem');

    if (typeof examProblem !== 'undefined' && examProblem !== null) {
      console.log('exam function active');
      
      let id = examProblem.getAttribute('data-id');

      let progress_status_check; // this is the interval we'll set to track status on this problem

      // this helper function gets a ton of information about the score for this particular problem
      // based on information embedded on this page
      var processScore = () => {
        const COURSE_TYPES = {
          FULL_COURSE: 'FULL_COURSE',
          GYM_SHORT: 'GYM_SHORT',
        };
    
        const COURSE_ID = parseInt($('#__course_number__').text(), 10);
        const COURSE_TYPE = COURSE_ID >= 100 ? COURSE_TYPES.FULL_COURSE : COURSE_TYPES.GYM_SHORT;
        let PASSING_SCORE = 85;
    
        if (COURSE_TYPE === COURSE_TYPES.FULL_COURSE) {
          // full courses have a passing grade of 85
          PASSING_SCORE = 85;
        } else {
          // gym shorts have a passing grade of 80
          PASSING_SCORE = 80;
        }
    
        // look into the div with a class of .problem-progress for our score
        // it contains a string that looks like:
        //    80/100 Points (Graded)
        // so we use .split(' ') to separate the fraction from the rest
        var [fraction] = $('.problem-progress').text().split(' ');

        console.log('grade fraction: ' + [fraction]);
    
        // next we split the fraction in half by "/" to get the numerator and denominator
        var [numerator, denominator] = fraction.split('/');
    
        var attempts_used = Number($('#attempts-used').text());
        var attempts_total = Number($('#attempts-allowed').text());
    
        var correct = Number(numerator);
        var outOf = Number(denominator);
    
        return {
          courseType: COURSE_TYPE,
          passingScore: PASSING_SCORE,
          score: Number(numerator / denominator * 100),
          correct,
          outOf,
          attempts_used,
          attempts_total,
          attempts_remaining: attempts_total - attempts_used,
        };
      };
    
      var show_problem_progress = function(){
        let {
          attempts_used,
          attempts_total,
          attempts_remaining,
          correct,
          courseType,
          outOf,
          score,
          passingScore,
        } = processScore();
    
        if (!correct || !outOf) {
          return
        }
    
        $('.exam-score-container').text(score);
    
    
        //we have a score
        if (score >= passingScore) {
          //we passed! show passing div for the type of course they took
          $(".passed_modal." + courseType).removeClass('hidden');
          $(".try_again_modal").addClass('hidden');
          $(".failed_modal").addClass('hidden');
    
          //generate the certificate through the API
          $.ajax({
            type:     'POST',
            url:      '/accredible/request_certificate',
            async:     false,
            data:     {'course_id': $$course_id},
            success:  function(data) {
            }
          });
        } else {
          //we failed :( see if we have another attempt
          if (attempts_remaining > 0) {
            $(".passed_modal").addClass('hidden');
            $(".try_again_modal." + courseType).removeClass('hidden');
            $(".failed_modal").addClass('hidden');
          } else {
            $(".passed_modal").addClass('hidden');
            $(".try_again_modal").addClass('hidden');
            $(".failed_modal").removeClass('hidden');
          }
        }
      }
    
      function check_status(){
        const {
          attempts_used,
          correct,
        } = processScore();
    
        if (attempts_used > 0 || correct > 0) {
          clearInterval(progress_status_check);
          show_problem_progress();
        }
      }
    
    
      if ($('.problem-header').text().trim() === "Final Exam") {
        let observer = new MutationObserver(mutationRecords => {
          // reset interval if we detect a grade change
          console.log(mutationRecords);
          if (typeof progress_status_check !== 'undefined'){
            clearInterval(progress_status_check);
          }
          // set interval on initial page load
          progress_status_check = setInterval(check_status, 200);
        });
    
        observer.observe(
          document.getElementById(id + '-problem-progress'),
          {
            characterData: false,
            attributes: false,
            childList: true,
            subtree: false
          },
        );
      } else {
        return;
      }
    
      // scroll to show the results message
      $('#check-button').click(function() {
        $('#course_passed_message')[0].scrollIntoView();
      });
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
    var trackingPix = $('<noscript><img height="1" width="1" style="display:none" src="https://www.facebook.com/tr?id=1074612282557779&ev=PageView&noscript=1" /></noscript>');
    $("body").append(trackingPix);
    fbq("init", "1074612282557779");
    fbq("track", "PageView");
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
      leadDestination: CW_ENV,
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
      carrot_type: "Gymnasium Registration",
      carrot_topic: "GYM REG",
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
    jsonData.subdomain = CW_ENV;
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

  setBgFromImage(element, image) {
    var canvas = document.createElement('canvas');
    var dummyImg = document.createElement('img');
    var img = document.querySelector(image);
    var bgTarget = document.querySelector(element);

    img.onload = function() {

      dummyImg.setAttribute('src', img.getAttribute('src'));

      var context = canvas.getContext('2d');
      context.drawImage(dummyImg, 0, 0);

      var data = context.getImageData(1, 1, 1, 1).data;

      var r = data[0];
      var g = data[1];
      var b = data[2];
      var a = data[3];

      bgTarget.style = 'background-color: rgba(' + r + ',' + g + ',' + b + ',' + a + ');';
    }
  }
}

// Facebook Pixel Code
!function(f,b,e,v,n,t,s)
  {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
  n.callMethod.apply(n,arguments):n.queue.push(arguments)};
  if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
  n.queue=[];t=b.createElement(e);t.async=!0;
  t.src=v;s=b.getElementsByTagName(e)[0];
  s.parentNode.insertBefore(t,s)}(window, document,'script',
  'https://connect.facebook.net/en_US/fbevents.js');

// Initialize
var gym = new Gymnasium();


// Do wicked stuff to course tabs
gym.courseTabs();

// initialize nav caret
gym.dropdownCaret();

// check exam
gym.exam();

// check ie browser version
gym.ieCheck();
