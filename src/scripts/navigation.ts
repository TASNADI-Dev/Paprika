/** Toggles the mobile nav overlay and animates the hamburger into a close icon with GSAP. */
import gsap from 'gsap';

const header = document.querySelector<HTMLElement>('[data-nav]');
const toggle = document.querySelector<HTMLButtonElement>('[data-nav-toggle]');
const panel = document.querySelector<HTMLElement>('[data-nav-panel]');
const topBar = toggle?.querySelector<HTMLElement>('[data-nav-bar="top"]');
const middleBar = toggle?.querySelector<HTMLElement>('[data-nav-bar="middle"]');
const bottomBar = toggle?.querySelector<HTMLElement>('[data-nav-bar="bottom"]');

if (header && toggle && panel && topBar && middleBar && bottomBar) {
  const openLabel = toggle.getAttribute('data-open-label') ?? 'Open menu';
  const closeLabel = toggle.getAttribute('data-close-label') ?? 'Close menu';
  const iconTl = gsap.timeline({ paused: true });

  // Bars sit 8px apart in a 17px box (1 + 8 + 1 + 8 + 1); move ends to center for the X.
  iconTl
    .to(topBar, { y: 8, duration: 0.2, ease: 'power2.inOut' }, 0)
    .to(bottomBar, { y: -8, duration: 0.2, ease: 'power2.inOut' }, 0)
    .to(middleBar, { opacity: 0, duration: 0.15, ease: 'power2.inOut' }, 0)
    .to(topBar, { rotate: 45, duration: 0.25, ease: 'power2.inOut' }, 0.15)
    .to(bottomBar, { rotate: -45, duration: 0.25, ease: 'power2.inOut' }, 0.15);

  const setOpen = (open: boolean) => {
    header.dataset.navOpen = open ? 'true' : 'false';
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? closeLabel : openLabel);
    panel.hidden = !open;
    document.body.classList.toggle('overflow-hidden', open);

    if (open) {
      iconTl.play();
    } else {
      iconTl.reverse();
    }
  };

  toggle.addEventListener('click', () => {
    setOpen(header.dataset.navOpen !== 'true');
  });

  panel.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => setOpen(false));
  });

  window.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && header.dataset.navOpen === 'true') {
      setOpen(false);
    }
  });

  window.matchMedia('(min-width: 1024px)').addEventListener('change', (event) => {
    if (event.matches) setOpen(false);
  });
}
