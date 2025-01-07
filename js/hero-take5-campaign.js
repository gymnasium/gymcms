var cta = document.getElementById('cta-take5');
var randomNum = Math.floor(Math.random() * 2) + 1;
var baseUrl = 'https://thegymnasium.com/courses/take5';

if (randomNum === 1) {
  cta.innerHTML = '<b>Learn Something New</b>';
  cta.setAttribute('href', `${baseUrl}?utm_content=learn-something-new`);
} else {
  cta.innerHTML = '<b>Start Learning</b>';
  cta.setAttribute('href', `${baseUrl}?utm_content=start-learning`);
}
