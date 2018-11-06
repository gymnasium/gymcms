function equalHeight(e){var t=document.getElementsByClassName("equal-h"),a=[],h=0;if(!0===e)for(h=0;h<t.length;h++)t[h].style.height="auto";for(h=0;h<t.length;h++){var l=t[h].clientHeight;a.push(l)}for(h=0;h<t.length;h++)t[h].style.height=Math.max.apply(Math,a)+"px",!1===e&&(t[h].className=t[h].className+" show")}equalHeight(!1),window.onresize=function(){equalHeight(!0)};

