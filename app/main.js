// NusaStat boot: hash routing and the top navigation. One route per page,
// each reached by a plain link in the header.
import {
  viewOverview, viewPopulation, viewEconomy, viewPrices,
  viewEmployment, viewRegions, viewMethodology,
} from './views.js';

const ROUTES = {
  '': { title: 'Overview', render: viewOverview },
  '/': { title: 'Overview', render: viewOverview },
  '/population': { title: 'Population', render: viewPopulation },
  '/economy': { title: 'Economy', render: viewEconomy },
  '/prices': { title: 'Prices & inflation', render: viewPrices },
  '/employment': { title: 'Employment', render: viewEmployment },
  '/regions': { title: 'Regions', render: viewRegions },
  '/methodology': { title: 'Methodology', render: viewMethodology },
};

const NAV = [
  ['', 'Overview'],
  ['/population', 'Population'],
  ['/economy', 'Economy'],
  ['/prices', 'Prices'],
  ['/employment', 'Employment'],
  ['/regions', 'Regions'],
  ['/methodology', 'Methodology'],
];

function routePath() {
  const hash = window.location.hash || '#/';
  return hash.slice(1) || '/';
}

function render() {
  let path = routePath();
  if (!ROUTES[path]) {
    window.location.replace('#/');
    path = '/';
  }
  const route = ROUTES[path];
  const main = document.getElementById('main');
  main.replaceChildren(route.render());
  document.title = `NusaStat — ${route.title} · Indonesia in Numbers`;
  document.querySelectorAll('#nav a').forEach((a) => {
    const key = a.getAttribute('href').slice(1) || '/';
    const on = (path === key) || (path === '/' && key === '/') || (path === '' && key === '/');
    a.classList.toggle('active', on);
    if (on) a.setAttribute('aria-current', 'page');
    else a.removeAttribute('aria-current');
  });
  window.scrollTo(0, 0);
}

const nav = document.getElementById('nav');
for (const [path, label] of NAV) {
  const a = document.createElement('a');
  a.href = `#${path}`;
  a.textContent = label;
  nav.appendChild(a);
}

window.addEventListener('hashchange', render);
render();
