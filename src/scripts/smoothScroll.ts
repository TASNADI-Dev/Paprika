/** Smooth-scrolls same-page hash links with a 300ms ease-in-out animation. */
import gsap from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

gsap.registerPlugin(ScrollToPlugin);

const DURATION = 0.3;
const EASE = 'power2.inOut';

function prefersReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function navOffset(): number {
  return document.querySelector<HTMLElement>('[data-nav]')?.offsetHeight ?? 0;
}

function scrollToId(id: string): boolean {
  const target = document.getElementById(id);
  if (!target) return false;

  const y = Math.max(0, target.getBoundingClientRect().top + window.scrollY - navOffset());

  if (prefersReducedMotion()) {
    window.scrollTo(0, y);
    return true;
  }

  gsap.to(window, {
    duration: DURATION,
    ease: EASE,
    scrollTo: { y, autoKill: true },
  });

  return true;
}

function samePageHash(href: string): string | null {
  try {
    const url = new URL(href, window.location.href);
    if (url.origin !== window.location.origin) return null;
    if (url.pathname !== window.location.pathname) return null;
    return url.hash || null;
  } catch {
    return null;
  }
}

document.addEventListener('click', (event) => {
  const link = (event.target as Element | null)?.closest?.('a[href]');
  if (!(link instanceof HTMLAnchorElement)) return;

  const hash = samePageHash(link.href);
  if (!hash || hash === '#') return;

  const id = decodeURIComponent(hash.slice(1));
  if (!id) return;

  event.preventDefault();
  history.pushState(null, '', hash);
  scrollToId(id);
});

if (window.location.hash.length > 1) {
  const id = decodeURIComponent(window.location.hash.slice(1));
  requestAnimationFrame(() => scrollToId(id));
}
