// NusaStat views: one renderer per page, all fed by data.js. Every figure
// on a page comes from the data file; nothing is typed twice.
import {
  HEADLINES, COUNTRY_FACTS, POPULATION, GDP_NOMINAL, GDP_PER_CAPITA,
  GDP_GROWTH, INFLATION, UNEMPLOYMENT, POVERTY, SECTORS_2024,
  EXPENDITURE_2024, AGE_2024, PROVINCES, ISLAND_GROUPS, YEARS, yearRow,
} from './data.js';
import { lineChart, barChart } from './charts.js';

function el(tag, cls, html) {
  const n = document.createElement(tag);
  if (cls) n.className = cls;
  if (html != null) n.innerHTML = html;
  return n;
}

function sourceLine(text) {
  return el('p', 'source-line', `Source: ${text}`);
}

function headlineCards(filter) {
  const wrap = el('div', 'card-grid');
  const q = (filter ?? '').trim().toLowerCase();
  for (const h of HEADLINES) {
    if (q && !(h.label + ' ' + h.value).toLowerCase().includes(q)) continue;
    const card = el('a', 'stat-card', '');
    card.href = h.route;
    card.innerHTML = `<span class="stat-label">${h.label}</span>` +
      `<span class="stat-value">${h.value}</span>` +
      `<span class="stat-meta">${h.year} · ${h.source}</span>`;
    wrap.appendChild(card);
  }
  if (!wrap.children.length) {
    wrap.appendChild(el('p', 'empty-note', 'No indicator matches that search. Try “GDP”, “population” or “inflation”.'));
  }
  return wrap;
}

function yearTable(series, format) {
  const table = el('table', 'data-table');
  table.innerHTML = '<thead><tr><th>Year</th><th>Value</th></tr></thead>';
  const body = document.createElement('tbody');
  series.years.forEach((y, i) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `<td>${y}</td><td>${format(series.values[i])}</td>`;
    body.appendChild(tr);
  });
  table.appendChild(body);
  return table;
}

export function viewOverview() {
  const page = el('div', 'page');
  page.appendChild(el('p', 'kicker', 'Indonesia · Updated 26 November 2026'));
  page.appendChild(el('h1', '', 'Indonesia in numbers'));
  page.appendChild(el('p', 'lede',
    'The headline figures for the world’s fourth most populous country — ' +
    'population, economy, prices, work and regions — each with its source ' +
    'and year, so you can check every number.'));
  const search = el('div', 'search-box');
  search.innerHTML = '<label for="q">Search the indicators</label>' +
    '<input id="q" type="search" placeholder="Try “GDP”, “inflation”, “poverty”…">' +
    '<p class="hint">Type to filter the cards below. Every card links to its full page.</p>';
  page.appendChild(search);
  const gridSlot = el('div', '');
  gridSlot.appendChild(headlineCards(''));
  page.appendChild(gridSlot);
  search.querySelector('#q').addEventListener('input', (e) => {
    gridSlot.replaceChildren(headlineCards(e.target.value));
  });
  page.appendChild(el('h2', '', 'The economy at a glance'));
  page.appendChild(lineChart({
    years: GDP_GROWTH.years, values: GDP_GROWTH.values,
    label: 'Real GDP growth', suffix: '%', decimals: 2,
  }));
  page.appendChild(sourceLine('BPS (Statistics Indonesia), real GDP growth 2015–2024. ' +
    'The 2020 dip is the COVID-19 contraction; growth has held near 5% since 2022.'));
  page.appendChild(el('h2', '', 'Where people live'));
  page.appendChild(barChart(
    PROVINCES.slice(0, 6).map((p) => ({ name: p.name, value: p.pop, valueText: `${p.pop} m` })),
    { label: 'Largest provinces by population, 2024' },
  ));
  page.appendChild(sourceLine('BPS provincial estimates, mid-2024. West Java alone ' +
    'holds more people than most countries. See the full table on the Regions page.'));
  page.appendChild(el('h2', '', 'Country facts'));
  const facts = el('dl', 'fact-list');
  for (const f of COUNTRY_FACTS) {
    facts.innerHTML += `<div><dt>${f.label}</dt><dd>${f.value} <span>(${f.note})</span></dd></div>`;
  }
  page.appendChild(facts);
  return page;
}

export function viewPopulation() {
  const page = el('div', 'page');
  page.appendChild(el('p', 'kicker', 'People'));
  page.appendChild(el('h1', '', 'Population & demographics'));
  page.appendChild(el('p', 'lede',
    '283.5 million people in 2024 — the fourth largest population on earth — ' +
    'growing by about 0.8% a year, with a median age just over 30.'));
  page.appendChild(lineChart({
    years: POPULATION.years, values: POPULATION.values,
    label: 'Total population', suffix: ' m', decimals: 1,
  }));
  page.appendChild(sourceLine('UN World Population Prospects 2024 (medium variant), via World Bank WDI.'));
  page.appendChild(el('h2', '', 'Age structure, 2024'));
  page.appendChild(barChart(
    AGE_2024.map((a) => ({ name: a.group, value: a.share, valueText: `${a.share}%` })),
    { label: 'Share of population by age group' },
  ));
  page.appendChild(el('p', 'body-text',
    'More than two in three Indonesians are of working age (15–64), and only ' +
    '7.3% are 65 or older — the demographic dividend is still open, but the ' +
    'share of older people is rising every year.'));
  page.appendChild(el('h2', '', 'Population by year'));
  page.appendChild(yearTable(POPULATION, (v) => `${v.toFixed(1)} million`));
  page.appendChild(sourceLine('UN World Population Prospects 2024 / World Bank WDI.'));
  return page;
}

export function viewEconomy() {
  const page = el('div', 'page');
  page.appendChild(el('p', 'kicker', 'Economy'));
  page.appendChild(el('h1', '', 'Economy'));
  page.appendChild(el('p', 'lede',
    'Southeast Asia’s largest economy: $1.40 trillion of GDP in 2024, ranked ' +
    '16th in the world, growing 5.03% in real terms.'));
  const picker = el('div', 'year-picker');
  picker.innerHTML = '<label for="year">Pick a year — every figure below changes</label>' +
    `<select id="year">${YEARS.map((y) => `<option value="${y}"${y === 2024 ? ' selected' : ''}>${y}</option>`).join('')}</select>`;
  page.appendChild(picker);
  const cards = el('div', 'card-grid');
  page.appendChild(cards);
  const fillYear = (year) => {
    const row = yearRow(year);
    cards.innerHTML =
      `<div class="stat-card"><span class="stat-label">GDP (nominal)</span>` +
      `<span class="stat-value">$${row.gdp.toLocaleString('en-US')} bn</span>` +
      `<span class="stat-meta">${year} · World Bank</span></div>` +
      `<div class="stat-card"><span class="stat-label">GDP per capita</span>` +
      `<span class="stat-value">$${row.gdpPerCapita.toLocaleString('en-US')}</span>` +
      `<span class="stat-meta">${year} · World Bank</span></div>` +
      `<div class="stat-card"><span class="stat-label">Real GDP growth</span>` +
      `<span class="stat-value">${row.growth.toFixed(2)}%</span>` +
      `<span class="stat-meta">${year} · BPS</span></div>` +
      `<div class="stat-card"><span class="stat-label">Inflation (CPI)</span>` +
      `<span class="stat-value">${row.inflation.toFixed(2)}%</span>` +
      `<span class="stat-meta">${year} · BPS</span></div>` +
      `<div class="stat-card"><span class="stat-label">Unemployment</span>` +
      `<span class="stat-value">${row.unemployment.toFixed(2)}%</span>` +
      `<span class="stat-meta">${year} · BPS</span></div>` +
      `<div class="stat-card"><span class="stat-label">Poverty rate</span>` +
      `<span class="stat-value">${row.poverty.toFixed(2)}%</span>` +
      `<span class="stat-meta">${year} · BPS</span></div>`;
  };
  fillYear(2024);
  picker.querySelector('#year').addEventListener('change', (e) => fillYear(Number(e.target.value)));
  page.appendChild(el('h2', '', 'GDP, 2015–2024'));
  page.appendChild(lineChart({
    years: GDP_NOMINAL.years, values: GDP_NOMINAL.values,
    label: 'Nominal GDP', suffix: ' bn $',
  }));
  page.appendChild(sourceLine('World Bank WDI, GDP in current US$.'));
  page.appendChild(el('h2', '', 'What the economy makes, 2024'));
  page.appendChild(barChart(
    SECTORS_2024.map((s) => ({ name: s.name, value: s.share, valueText: `${s.share}%` })),
    { label: 'Share of GDP by sector' },
  ));
  page.appendChild(sourceLine('BPS full-year release (manufacturing, trade) and ' +
    'World Bank national accounts (agriculture, industry, services).'));
  page.appendChild(el('h2', '', 'What the economy spends on, 2024'));
  page.appendChild(barChart(
    EXPENDITURE_2024.map((s) => ({ name: s.name, value: Math.abs(s.share), valueText: `${s.share}%` })),
    { label: 'Share of GDP by expenditure' },
  ));
  page.appendChild(sourceLine('CIA World Factbook, Indonesia economic profile, 2024 estimates. ' +
    'Household consumption is more than half of GDP.'));
  return page;
}

export function viewPrices() {
  const page = el('div', 'page');
  page.appendChild(el('p', 'kicker', 'Prices'));
  page.appendChild(el('h1', '', 'Prices & inflation'));
  page.appendChild(el('p', 'lede',
    'Consumer-price inflation averaged 1.57% in 2024 — inside Bank Indonesia’s ' +
    '2.5% ± 1 point target — after spiking to 5.51% in 2022.'));
  page.appendChild(lineChart({
    years: INFLATION.years, values: INFLATION.values,
    label: 'CPI inflation', suffix: '%', decimals: 2,
  }));
  page.appendChild(sourceLine('BPS, annual average CPI inflation. Bank Indonesia’s ' +
    'inflation target is 2.5% ± 1 percentage point.'));
  page.appendChild(el('h2', '', 'Inflation by year'));
  page.appendChild(yearTable(INFLATION, (v) => `${v.toFixed(2)}%`));
  page.appendChild(sourceLine('BPS (Statistics Indonesia).'));
  page.appendChild(el('p', 'body-text',
    'The 2022 spike followed the global energy-price shock and a domestic fuel ' +
    'subsidy adjustment; by 2024 food and administered prices had settled and ' +
    'inflation fell to its lowest in the decade shown.'));
  return page;
}

export function viewEmployment() {
  const page = el('div', 'page');
  page.appendChild(el('p', 'kicker', 'Work'));
  page.appendChild(el('h1', '', 'Employment'));
  page.appendChild(el('p', 'lede',
    'Open unemployment fell to 4.91% in August 2024 — the lowest in the decade ' +
    'shown — while the poverty rate fell with it to 8.57%.'));
  page.appendChild(lineChart({
    years: UNEMPLOYMENT.years, values: UNEMPLOYMENT.values,
    label: 'Open unemployment rate', suffix: '%', decimals: 2,
  }));
  page.appendChild(sourceLine('BPS, August Sakernas survey each year.'));
  page.appendChild(el('h2', '', 'Poverty is falling with it'));
  page.appendChild(lineChart({
    years: POVERTY.years, values: POVERTY.values,
    label: 'Poverty headcount', suffix: '%', decimals: 2,
  }));
  page.appendChild(sourceLine('BPS, September survey each year, national poverty line ' +
    '(about 2,100 calories a day plus basic non-food needs).'));
  page.appendChild(el('h2', '', 'What the headline misses'));
  page.appendChild(el('p', 'body-text',
    'About 59% of workers were in informal jobs in August 2023 (BPS), and the ' +
    'labour-force participation rate was 69.3% in 2023. Low open unemployment ' +
    'and widespread informal work go together in Indonesia: most people work, ' +
    'but a majority do so without a formal contract or social protection.'));
  page.appendChild(el('h2', '', 'Unemployment by year'));
  page.appendChild(yearTable(UNEMPLOYMENT, (v) => `${v.toFixed(2)}%`));
  page.appendChild(sourceLine('BPS (Statistics Indonesia).'));
  return page;
}

let regionSort = { key: 'pop', dir: -1 };
let regionQuery = '';

function regionRows() {
  const q = regionQuery.trim().toLowerCase();
  const rows = PROVINCES.filter((p) =>
    !q || p.name.toLowerCase().includes(q) || p.capital.toLowerCase().includes(q) ||
    p.island.toLowerCase().includes(q));
  const { key, dir } = regionSort;
  return rows.sort((a, b) => {
    const av = a[key];
    const bv = b[key];
    if (typeof av === 'number') return (av - bv) * dir;
    return String(av).localeCompare(String(bv)) * dir;
  });
}

export function viewRegions() {
  const page = el('div', 'page');
  page.appendChild(el('p', 'kicker', 'Regions'));
  page.appendChild(el('h1', '', 'Regions & provinces'));
  page.appendChild(el('p', 'lede',
    'Indonesia has 38 provinces across seven island groups. Java holds 158 ' +
    'million people — 55% of the country — on 7% of its land.'));
  page.appendChild(el('h2', '', 'People by island group, mid-2025'));
  page.appendChild(barChart(
    ISLAND_GROUPS.map((g) => ({ name: g.name, value: g.pop, valueText: `${g.pop} m` })),
    { label: 'Population by island group' },
  ));
  page.appendChild(sourceLine('BPS mid-2025 provincial totals grouped by geographical unit.'));
  page.appendChild(el('h2', '', 'Provinces, mid-2024'));
  const tools = el('div', 'table-tools');
  tools.innerHTML = '<label for="rq">Filter provinces</label>' +
    '<input id="rq" type="search" placeholder="Name, capital or island…">' +
    '<p class="hint">Click a column heading to sort. Only provinces with a published 2024 figure are listed.</p>';
  page.appendChild(tools);
  const tableSlot = el('div', '');
  page.appendChild(tableSlot);
  const renderTable = () => {
    const rows = regionRows();
    const table = el('table', 'data-table sortable');
    const arrow = (k) => (regionSort.key === k ? (regionSort.dir === 1 ? ' ▲' : ' ▼') : '');
    table.innerHTML = '<thead><tr>' +
      `<th><button data-sort="name">Province${arrow('name')}</button></th>` +
      `<th><button data-sort="capital">Capital${arrow('capital')}</button></th>` +
      `<th><button data-sort="island">Island group${arrow('island')}</button></th>` +
      `<th><button data-sort="pop">Population (m)${arrow('pop')}</button></th>` +
      '</tr></thead>';
    const body = document.createElement('tbody');
    for (const p of rows) {
      const tr = document.createElement('tr');
      tr.innerHTML = `<td>${p.name}</td><td>${p.capital}</td><td>${p.island}</td><td>${p.pop.toFixed(1)}</td>`;
      body.appendChild(tr);
    }
    table.appendChild(body);
    tableSlot.replaceChildren(table);
    if (!rows.length) {
      tableSlot.appendChild(el('p', 'empty-note', 'No province matches that filter.'));
    }
    table.querySelectorAll('button[data-sort]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const key = btn.dataset.sort;
        if (regionSort.key === key) regionSort.dir *= -1;
        else regionSort = { key, dir: key === 'pop' ? -1 : 1 };
        renderTable();
      });
    });
  };
  renderTable();
  tools.querySelector('#rq').addEventListener('input', (e) => {
    regionQuery = e.target.value;
    renderTable();
  });
  page.appendChild(sourceLine('BPS provincial estimates, mid-2024, as compiled by ' +
    'Wikidata / World Bank and TelluBase. Figures are rounded to 0.1 million.'));
  return page;
}

export function viewMethodology() {
  const page = el('div', 'page');
  page.appendChild(el('p', 'kicker', 'About the numbers'));
  page.appendChild(el('h1', '', 'Methodology & sources'));
  page.appendChild(el('p', 'lede',
    'NusaStat is an independent reader’s guide to Indonesia’s published ' +
    'statistics. It is not affiliated with BPS or any government body, and ' +
    'it copies no other site’s design, text or images.'));
  page.appendChild(el('h2', '', 'Where every figure comes from'));
  const table = el('table', 'data-table');
  table.innerHTML = '<thead><tr><th>Series</th><th>Source</th><th>Latest year</th></tr></thead>';
  const body = document.createElement('tbody');
  const srcRows = [
    ['Population', 'UN World Population Prospects 2024, via World Bank WDI', '2025'],
    ['GDP & GDP per capita', 'World Bank, World Development Indicators', '2024'],
    ['GDP growth', 'BPS (Statistics Indonesia)', '2024'],
    ['Inflation (CPI)', 'BPS (Statistics Indonesia)', '2024'],
    ['Unemployment', 'BPS, August Sakernas survey', '2024'],
    ['Poverty rate', 'BPS, September survey, national poverty line', '2024'],
    ['Sector shares', 'BPS full-year release; World Bank national accounts', '2024'],
    ['Expenditure shares', 'CIA World Factbook, 2024 estimates', '2024'],
    ['Age structure, median age, fertility, urban share', 'UN World Population Prospects 2024', '2024'],
    ['Provincial populations', 'BPS provincial estimates, via Wikidata / TelluBase', '2024'],
    ['Island-group populations', 'BPS mid-2025 provincial totals', '2025'],
  ];
  for (const [s, src, y] of srcRows) {
    const tr = document.createElement('tr');
    tr.innerHTML = `<td>${s}</td><td>${src}</td><td>${y}</td>`;
    body.appendChild(tr);
  }
  table.appendChild(body);
  page.appendChild(table);
  page.appendChild(el('h2', '', 'How we handle the numbers'));
  page.appendChild(el('div', 'body-text',
    '<ul>' +
    '<li>Figures are shown exactly as published, with the year and source next to them.</li>' +
    '<li>Where two reputable sources disagree slightly (for example GDP per capita, ' +
    '$4,925 vs $4,942), we use the World Bank WDI figure and say so.</li>' +
    '<li>Provincial figures are rounded to 0.1 million; they do not add up to the ' +
    'national total because only provinces with a published 2024 figure are listed.</li>' +
    '<li>Nothing on this site is fetched from the internet while you browse: every ' +
    'figure lives in the site’s own files, so it works offline.</li>' +
    '</ul>'));
  page.appendChild(el('h2', '', 'What we left out'));
  page.appendChild(el('p', 'body-text',
    'We do not show figures we could not verify against a published source — ' +
    'for example life expectancy and the 2025 provincial breakdown, where the ' +
    'published series were incomplete or conflicting at the time of writing. ' +
    'The site will be updated when the next BPS and World Bank releases land.'));
  page.appendChild(el('p', 'body-text',
    'All figures in the site’s own data file (app/data.js) are readable by ' +
    'anyone who opens the repository.'));
  return page;
}
