/** Accessible product category tabs with arrow-key support and mobile select sync. */

const productsTabsRoot = document.querySelector<HTMLElement>('[data-products-tabs]');

if (productsTabsRoot) {
  const tabs = Array.from(
    productsTabsRoot.querySelectorAll<HTMLButtonElement>('[role="tab"]'),
  );
  const panels = Array.from(
    productsTabsRoot.querySelectorAll<HTMLElement>('[role="tabpanel"]'),
  );
  const select = productsTabsRoot.querySelector<HTMLSelectElement>(
    '[data-products-select]',
  );

  const activate = (id: string, focusTab = false) => {
    tabs.forEach((tab) => {
      const selected = tab.dataset.tabId === id;
      tab.setAttribute('aria-selected', String(selected));
      tab.tabIndex = selected ? 0 : -1;
      if (selected && focusTab) tab.focus();
    });

    panels.forEach((panel) => {
      const selected = panel.dataset.panelId === id;
      panel.hidden = !selected;
    });

    if (select && select.value !== id) {
      select.value = id;
    }
  };

  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => {
      const id = tab.dataset.tabId;
      if (id) activate(id);
    });

    tab.addEventListener('keydown', (event) => {
      const key = event.key;
      let nextIndex = index;

      if (key === 'ArrowRight' || key === 'ArrowDown') {
        nextIndex = (index + 1) % tabs.length;
      } else if (key === 'ArrowLeft' || key === 'ArrowUp') {
        nextIndex = (index - 1 + tabs.length) % tabs.length;
      } else if (key === 'Home') {
        nextIndex = 0;
      } else if (key === 'End') {
        nextIndex = tabs.length - 1;
      } else {
        return;
      }

      event.preventDefault();
      const nextId = tabs[nextIndex]?.dataset.tabId;
      if (nextId) activate(nextId, true);
    });
  });

  select?.addEventListener('change', () => {
    activate(select.value);
  });
}
