/* form autofill/pre-populate */

/*! courtesy of https://gist.github.com/christineosazuwa/44001fca5f3e141e9a449ae4931dd278 */

// modified to decode URL
var autofill = [], hash;
  var q = decodeURIComponent(document.URL.split('?')[1]);
  if (q != undefined) {
    q = q.split('&');
    for (var i = 0; i < q.length; i++) {
      hash = q[i].split('=');
      autofill.push(hash[1]);
      autofill[hash[0]] = hash[1];
    }
}
// autofill inputs
$(".firstname").attr("value", autofill['first_name']);
$(".lastname").attr("value", autofill['last_name']);
$(".email").attr("value", autofill['email']);

/* form validation */

$("#event-form").validate({
  rules: {
    name: {
      required: true,
      minlength: 2
    }
  }
});

/* utm capture */

getParameterByName = function(name) {
  query = window.location.search.toString();
  name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
  var regexS = "[\\?&]" + name + "=([^&#]*)";
  var regex = new RegExp(regexS);
  results = regex.exec(query);
  if (results == null) return "";
  else return decodeURIComponent(results[1].replace(/\+/g, " "));
}
$(document).ready(function() {
  var $utmSource = $('[name=utm_source]'),
      $utmMedium = $('[name=utm_medium]'),
      $utmContent = $('[name=utm_content]'),
      $utmCampaign = $('[name=utm_campaign]');
  $utmSource.val(getParameterByName('utm_source'));
  $utmMedium.val(getParameterByName('utm_medium'));
  $utmContent.val(getParameterByName('utm_content'));
  $utmCampaign.val(getParameterByName('utm_campaign'));
});
