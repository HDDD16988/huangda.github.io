'use strict';

const rows = [...document.querySelectorAll('tr[data-tags]')];
const tagButtons = [...document.querySelectorAll('.tag-btn')];
tagButtons.forEach(button => {
  const tag = button.dataset.tag;
  const count = tag === 'all' ? rows.length : rows.filter(row => row.dataset.tags.split(',').includes(tag)).length;
  const badge = document.createElement('span');
  badge.className = 'tag-count';
  badge.textContent = count;
  button.append(badge);
  button.addEventListener('click', () => {
    tagButtons.forEach(item => {
      item.classList.toggle('active', item === button);
      item.setAttribute('aria-pressed', String(item === button));
    });
    rows.forEach(row => { row.hidden = tag !== 'all' && !row.dataset.tags.split(',').includes(tag); });
    updateAuthorToggles();
  });
});

// Anchor links remain usable even when a previous filter hid their destination.
function revealHashTarget() {
  const target = document.getElementById(location.hash.slice(1));
  if (target && target.matches('tr[data-tags]') && target.hidden) {
    tagButtons[0].click();
    target.scrollIntoView();
  }
}
window.addEventListener('hashchange', revealHashTarget);
revealHashTarget();

let toastTimer;
function showToast(message) {
  const toast = document.getElementById('toast');
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 2200);
}
async function copyText(text) {
  try {
    if (!navigator.clipboard) throw new Error('Clipboard API unavailable');
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.cssText = 'position:fixed;left:-9999px;top:0';
    document.body.append(textarea);
    textarea.select();
    try { return document.execCommand('copy'); }
    catch { return false; }
    finally { textarea.remove(); }
  }
}
document.getElementById('astronaut-btn').addEventListener('click', async () => {
  const bio = 'Da Huang. ' + [...document.querySelectorAll('.profile-bio > p:not(.contact-links)')].map(p => p.textContent).join(' ');
  showToast(await copyText(bio) ? 'Bio copied' : 'Could not copy bio');
});
document.getElementById('email-copy').addEventListener('click', async event => {
  event.preventDefault();
  if (await copyText('huangda@sii.edu.cn')) showToast('Email copied');
  else location.href = 'mailto:huangda@sii.edu.cn';
});

function updateAuthorToggles() {
  document.querySelectorAll('.publication-authors-shell').forEach(shell => {
    if (shell.closest('tr').hidden) return;
    const authors = shell.querySelector('.publication-authors');
    const button = shell.querySelector('button');
    const expanded = shell.classList.contains('expanded');
    shell.classList.remove('expanded');
    button.hidden = authors.scrollHeight <= authors.clientHeight + 1;
    shell.classList.toggle('expanded', expanded);
  });
}
document.querySelectorAll('.publication-authors-toggle').forEach(button => {
  button.addEventListener('click', () => {
    const expanded = button.parentElement.classList.toggle('expanded');
    button.textContent = expanded ? '▼' : '▶';
    button.setAttribute('aria-expanded', String(expanded));
    button.setAttribute('aria-label', expanded ? 'Collapse author list' : 'Expand author list');
    button.title = button.getAttribute('aria-label');
  });
});
window.addEventListener('resize', updateAuthorToggles);
document.fonts.ready.then(updateAuthorToggles);
updateAuthorToggles();

const dialog = document.getElementById('pipeline-dialog');
document.querySelectorAll('.pipeline-link').forEach(link => {
  link.addEventListener('click', event => {
    if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey || typeof dialog.showModal !== 'function') return;
    event.preventDefault();
    document.getElementById('pipeline-title').textContent = link.dataset.title;
    const image = document.getElementById('pipeline-image');
    image.src = link.href;
    image.alt = link.querySelector('img')?.alt || link.dataset.title;
    document.getElementById('pipeline-original').href = link.href;
    dialog.showModal();
  });
});
document.getElementById('pipeline-close').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => {
  const bounds = dialog.getBoundingClientRect();
  if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) dialog.close();
});
const backToTop = document.getElementById('backToTop');
function updateBackToTop() { backToTop.classList.toggle('visible', window.scrollY > 300); }
window.addEventListener('scroll', updateBackToTop, { passive: true });
backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' }));
updateBackToTop();
