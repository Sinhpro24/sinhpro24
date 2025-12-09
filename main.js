document.addEventListener('DOMContentLoaded', () => {
  const body = document.body;
  const overlay = document.querySelector('.overlay');

  // ===== MENU =====
  const menu = document.querySelector('.site-header__nav');
  const menuOpen = document.querySelector('.site-header__menu-btn');
  const menuClose = document.querySelector('.site-header__close-btn');

  // ===== SEARCH =====
  const searchForm = document.querySelector('.search-form');
  const searchInput = document.querySelector('#search-input');
  const searchOpen = document.querySelector('.site-header__search-btn');
  const searchClose = document.querySelector('.search-form__close-btn');

  const lock = () => body.classList.add('locked');
  const unlock = () => body.classList.remove('locked');

  // ==========================
  // MENU HANDLER
  // ==========================
  const openMenu = () => {
    closeSearch(false);
    menu?.classList.add('open');
    overlay?.classList.add('open');
    lock();
  };

  const closeMenu = () => {
    menu?.classList.remove('open');
    overlay?.classList.remove('open');
    unlock();
  };

  menuOpen?.addEventListener('click', openMenu);
  menuClose?.addEventListener('click', closeMenu);

  // ==========================
  // SEARCH HANDLER (Focus tối ưu)
  // ==========================
  const openSearch = () => {
    closeMenu();
    searchForm?.classList.add('open');
    overlay?.classList.add('open');
    lock();

    // Focus chuẩn UX nhất: đảm bảo sau render
    requestAnimationFrame(() => {
      searchInput?.focus({ preventScroll: true });
    });
  };

  const closeSearch = (removeOverlay = true) => {
    searchForm?.classList.remove('open');

    if (removeOverlay) {
      overlay?.classList.remove('open');
      unlock();
    }
  };

  searchOpen?.addEventListener('click', openSearch);
  searchClose?.addEventListener('click', () => closeSearch());

  // ==========================
  // OVERLAY — đóng cả menu lẫn search
  // ==========================
  overlay?.addEventListener('click', () => {
    closeMenu();
    closeSearch();
  });

  // ==========================
  // ESC — chuẩn accessibility UI/UX
  // ==========================
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      closeMenu();
      closeSearch();
    }
  });
});
