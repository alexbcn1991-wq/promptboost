(function(){
  "use strict";
  function init(){
    var btn = document.getElementById('backToTop');
    if (!btn) return;

    function adjustForCookieBanner(){
      var banner = document.getElementById('pb-cookie-banner');
      if (banner) {
        btn.style.bottom = (banner.offsetHeight + 16) + 'px';
      } else {
        btn.style.bottom = '';
      }
    }

    window.addEventListener('scroll', function(){
      btn.classList.toggle('show', window.scrollY > window.innerHeight * 0.8);
    });
    btn.addEventListener('click', function(){
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    adjustForCookieBanner();
    window.addEventListener('resize', adjustForCookieBanner);
    var observer = new MutationObserver(adjustForCookieBanner);
    observer.observe(document.body, { childList: true });
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
