(function(){
  "use strict";
  function init(){
    var toggle = document.getElementById('menuToggle');
    var menu = document.getElementById('mobileMenu');
    if (!toggle || !menu) return;

    function closeMenu(){
      menu.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    }
    function openMenu(){
      menu.classList.add('open');
      toggle.setAttribute('aria-expanded', 'true');
    }

    toggle.addEventListener('click', function(e){
      e.stopPropagation();
      if (menu.classList.contains('open')) closeMenu(); else openMenu();
    });

    // cerrar al pulsar un enlace del menu
    menu.querySelectorAll('a').forEach(function(a){
      a.addEventListener('click', closeMenu);
    });

    // cerrar al tocar fuera del menu
    document.addEventListener('click', function(e){
      if (menu.classList.contains('open') && !menu.contains(e.target) && e.target !== toggle) {
        closeMenu();
      }
    });

    // cerrar con Escape
    document.addEventListener('keydown', function(e){
      if (e.key === 'Escape') closeMenu();
    });

    // cerrar si la ventana crece por encima del breakpoint movil
    window.addEventListener('resize', function(){
      if (window.innerWidth > 900) closeMenu();
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
