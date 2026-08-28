/** Staggers fade-in of direct children when elements marked with data-stagger-children scroll into view. */
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  document.querySelectorAll<HTMLElement>('[data-stagger-children]').forEach((trigger) => {
    if (!trigger.children.length) return;

    gsap.from(trigger.children, {
      opacity: 0,
      duration: 0.4,
      delay: 0.1,
      ease: 'power2.inOut',
      stagger: 0.1,
      scrollTrigger: {
        trigger,
        start: 'top bottom',
        end: 'bottom top',
        once: true,
      },
    });
  });
}
