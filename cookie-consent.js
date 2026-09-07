(function(){
  "use strict";
  var CONSENT_KEY = "pb_cookie_consent";
  var GA_ID = "G-Q03596FGTP";

  function loadGoogleAnalytics(){
    if (window.__pbGaLoaded) return;
    window.__pbGaLoaded = true;
    var s = document.createElement('script');
    s.async = true;
    s.src = "https://www.googletagmanager.com/gtag/js?id=" + GA_ID;
    document.head.appendChild(s);
    window.dataLayer = window.dataLayer || [];
    function gtag(){ window.dataLayer.push(arguments); }
    window.gtag = gtag;
    gtag('js', new Date());
    gtag('config', GA_ID);
  }

  function getConsent(){
    try { return localStorage.getItem(CONSENT_KEY); } catch(e){ return null; }
  }
  function setConsent(value){
    try { localStorage.setItem(CONSENT_KEY, value); } catch(e){}
  }

  function injectStyles(){
    var css = '' +
      '#pb-cookie-banner{position:fixed;left:0;right:0;bottom:0;z-index:9999;background:#06133A;color:#F4F7FF;' +
      'border-top:1px solid rgba(255,255,255,.12);box-shadow:0 -8px 30px rgba(0,0,0,.35);' +
      'font-family:Inter,ui-sans-serif,system-ui,sans-serif;padding:18px 20px;}' +
      '#pb-cookie-banner .pb-cc-inner{max-width:1140px;margin:0 auto;display:flex;align-items:center;' +
      'justify-content:space-between;gap:24px;flex-wrap:wrap;}' +
      '#pb-cookie-banner p{margin:0;font-size:13.5px;line-height:1.5;color:#AAB9D8;max-width:640px;}' +
      '#pb-cookie-banner a{color:#36B8FF;text-decoration:underline;}' +
      '#pb-cookie-banner .pb-cc-actions{display:flex;gap:10px;flex-wrap:wrap;flex-shrink:0;}' +
      '#pb-cookie-banner button{font-family:inherit;font-size:13px;font-weight:800;border-radius:10px;' +
      'padding:10px 18px;cursor:pointer;border:1px solid transparent;}' +
      '#pb-cc-accept{color:#fff;background:linear-gradient(100deg,#733CFF,#FF19D4,#08a8ff);}' +
      '#pb-cc-reject{color:#F4F7FF;background:transparent;border-color:rgba(255,255,255,.28);}' +
      '@media(max-width:640px){#pb-cookie-banner .pb-cc-inner{flex-direction:column;align-items:stretch;text-align:left;}' +
      '#pb-cookie-banner .pb-cc-actions{width:100%;}#pb-cookie-banner button{flex:1;}}';
    var style = document.createElement('style');
    style.textContent = css;
    document.head.appendChild(style);
  }

  function showBanner(){
    injectStyles();
    var banner = document.createElement('div');
    banner.id = 'pb-cookie-banner';
    banner.setAttribute('role', 'region');
    banner.setAttribute('aria-label', 'Aviso de cookies');
    banner.innerHTML =
      '<div class="pb-cc-inner">' +
        '<p>Usamos cookies propias de analítica (Google Analytics) para entender cómo se usa la web y mejorarla. No usamos cookies de publicidad. Puedes leer más en nuestra <a href="/cookies/">política de cookies</a>.</p>' +
        '<div class="pb-cc-actions">' +
          '<button id="pb-cc-reject" type="button">Rechazar</button>' +
          '<button id="pb-cc-accept" type="button">Aceptar</button>' +
        '</div>' +
      '</div>';
    document.body.appendChild(banner);

    document.getElementById('pb-cc-accept').addEventListener('click', function(){
      setConsent('accepted');
      loadGoogleAnalytics();
      banner.remove();
    });
    document.getElementById('pb-cc-reject').addEventListener('click', function(){
      setConsent('rejected');
      banner.remove();
    });
  }

  function init(){
    var consent = getConsent();
    if (consent === 'accepted') {
      loadGoogleAnalytics();
    } else if (consent === 'rejected') {
      // no cargar Google Analytics
    } else {
      if (document.body) showBanner();
      else document.addEventListener('DOMContentLoaded', showBanner);
    }
  }

  init();
})();
