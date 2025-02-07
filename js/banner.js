var helper = document.getElementById('system-status-helper');
var banner = document.getElementById('system-status');

if (helper && banner) {
  banner.innerHTML = helper.innerHTML;
  banner.classList.remove('hide');
  banner.classList.add('active');
}
