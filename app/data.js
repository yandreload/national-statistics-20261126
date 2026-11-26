// NusaStat data: every figure below was checked against a published source
// before it was typed in (see the Methodology page for the source of each
// series). Years run 2015-2025; a series stops at the latest year its source
// has actually published. Nothing here is estimated by us.

export const YEARS = [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024];

// Total population, millions. Source: United Nations World Population
// Prospects 2024 revision (medium variant), via World Bank WDI SP.POP.TOTL.
// 2025: 285.72 million, same series.
export const POPULATION = {
  years: [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025],
  values: [258.4, 261.6, 264.7, 267.7, 270.6, 273.5, 276.4, 278.8, 281.2, 283.5, 285.7],
  unit: 'million people',
  source: 'UN World Population Prospects 2024 / World Bank WDI',
};

// Nominal GDP, current US$ billions. Source: World Bank WDI NY.GDP.MKTP.CD.
export const GDP_NOMINAL = {
  years: YEARS,
  values: [861, 932, 1016, 1042, 1119, 1059, 1186, 1319, 1371, 1396],
  unit: 'US$ billion',
  source: 'World Bank, World Development Indicators',
};

// GDP per capita, current US$. Source: World Bank WDI NY.GDP.PCAP.CD.
export const GDP_PER_CAPITA = {
  years: YEARS,
  values: [3332, 3563, 3838, 3894, 4135, 3872, 4293, 4726, 4860, 4925],
  unit: 'US$',
  source: 'World Bank, World Development Indicators',
};

// Real GDP growth, percent per year. Source: BPS (Statistics Indonesia),
// as republished by Indonesia Investments / World Bank.
export const GDP_GROWTH = {
  years: YEARS,
  values: [4.88, 5.03, 5.07, 5.17, 5.02, -2.07, 3.70, 5.31, 5.05, 5.03],
  unit: '% per year',
  source: 'BPS (Statistics Indonesia)',
};

// Consumer price inflation, annual average, percent. Source: BPS.
export const INFLATION = {
  years: YEARS,
  values: [3.35, 3.02, 3.61, 3.13, 2.72, 1.68, 1.87, 5.51, 2.61, 1.57],
  unit: '% per year',
  source: 'BPS (Statistics Indonesia)',
};

// Open unemployment rate, percent of labour force (August survey).
// Source: BPS.
export const UNEMPLOYMENT = {
  years: YEARS,
  values: [6.18, 5.61, 5.50, 5.34, 5.28, 7.07, 6.49, 5.86, 5.32, 4.91],
  unit: '% of labour force',
  source: 'BPS (Statistics Indonesia)',
};

// Poverty headcount, percent of population (September survey).
// Source: BPS.
export const POVERTY = {
  years: YEARS,
  values: [11.13, 10.70, 10.12, 9.66, 9.22, 10.19, 9.71, 9.57, 9.36, 8.57],
  unit: '% of population',
  source: 'BPS (Statistics Indonesia)',
};

// GDP by sector of origin, share of GDP, 2024. Source: BPS, as reported in
// the full-year 2024/2025 releases (manufacturing and trade shares from the
// BPS release; agriculture and industry/services splits cross-checked
// against the CIA World Factbook 2024 estimates).
export const SECTORS_2024 = [
  { name: 'Manufacturing', share: 18.98 },
  { name: 'Wholesale & retail trade', share: 13.07 },
  { name: 'Agriculture, forestry & fishing', share: 12.6 },
  { name: 'Construction', share: 9.9 },
  { name: 'All other sectors', share: 45.45 },
];

// GDP by expenditure, share of GDP, 2024 estimate. Source: CIA World
// Factbook (Indonesia economic profile, 2024 est.).
export const EXPENDITURE_2024 = [
  { name: 'Household consumption', share: 55.4 },
  { name: 'Investment in fixed capital', share: 29.1 },
  { name: 'Government consumption', share: 7.7 },
  { name: 'Exports of goods & services', share: 22.2 },
  { name: 'Imports of goods & services', share: -20.4 },
  { name: 'Investment in inventories', share: 2.3 },
];

// Age structure, 2024. Source: UN World Population Prospects 2024.
export const AGE_2024 = [
  { group: 'Age 0–14', share: 24.6 },
  { group: 'Age 15–64', share: 68.1 },
  { group: 'Age 65+', share: 7.3 },
];

// Provinces, mid-2024 population estimates in millions, with capitals.
// Source: BPS provincial estimates as compiled by Wikidata / World Bank
// (top ten) and TelluBase 2024 (remaining rows). Only provinces with a
// published 2024 figure are listed here.
export const PROVINCES = [
  { name: 'West Java', capital: 'Bandung', island: 'Java', pop: 50.3 },
  { name: 'East Java', capital: 'Surabaya', island: 'Java', pop: 41.8 },
  { name: 'Central Java', capital: 'Semarang', island: 'Java', pop: 37.9 },
  { name: 'North Sumatra', capital: 'Medan', island: 'Sumatra', pop: 15.6 },
  { name: 'Banten', capital: 'Serang', island: 'Java', pop: 11.8 },
  { name: 'Jakarta', capital: 'Jakarta', island: 'Java', pop: 11.1 },
  { name: 'South Sulawesi', capital: 'Makassar', island: 'Sulawesi', pop: 9.5 },
  { name: 'Lampung', capital: 'Bandar Lampung', island: 'Sumatra', pop: 9.4 },
  { name: 'South Sumatra', capital: 'Palembang', island: 'Sumatra', pop: 8.8 },
  { name: 'Riau', capital: 'Pekanbaru', island: 'Sumatra', pop: 6.7 },
  { name: 'West Sumatra', capital: 'Padang', island: 'Sumatra', pop: 5.8 },
  { name: 'West Nusa Tenggara', capital: 'Mataram', island: 'Lesser Sunda', pop: 5.7 },
  { name: 'East Nusa Tenggara', capital: 'Kupang', island: 'Lesser Sunda', pop: 5.6 },
  { name: 'Aceh', capital: 'Banda Aceh', island: 'Sumatra', pop: 5.5 },
  { name: 'Bali', capital: 'Denpasar', island: 'Lesser Sunda', pop: 4.5 },
  { name: 'Jambi', capital: 'Jambi', island: 'Sumatra', pop: 3.7 },
  { name: 'Bengkulu', capital: 'Bengkulu', island: 'Sumatra', pop: 2.1 },
  { name: 'Gorontalo', capital: 'Gorontalo', island: 'Sulawesi', pop: 1.2 },
];

// Island-group populations, mid-2025, millions. Source: BPS mid-2025
// provincial totals grouped by geographical unit.
export const ISLAND_GROUPS = [
  { name: 'Java', pop: 158.1 },
  { name: 'Sumatra', pop: 62.3 },
  { name: 'Sulawesi', pop: 21.0 },
  { name: 'Kalimantan', pop: 18.0 },
  { name: 'Lesser Sunda', pop: 15.9 },
  { name: 'Papua', pop: 5.8 },
  { name: 'Maluku', pop: 3.3 },
];

// Headline facts shown on the overview page. Each carries its year and
// source so a reader can check it.
export const HEADLINES = [
  { label: 'Population', value: '283.5 million', year: '2024', source: 'UN / World Bank', route: '#/population' },
  { label: 'GDP', value: '$1.40 trillion', year: '2024', source: 'World Bank', route: '#/economy' },
  { label: 'GDP growth', value: '5.03%', year: '2024', source: 'BPS', route: '#/economy' },
  { label: 'GDP per capita', value: '$4,925', year: '2024', source: 'World Bank', route: '#/economy' },
  { label: 'Inflation (CPI)', value: '1.57%', year: '2024', source: 'BPS', route: '#/prices' },
  { label: 'Unemployment', value: '4.91%', year: 'Aug 2024', source: 'BPS', route: '#/employment' },
  { label: 'Poverty rate', value: '8.57%', year: 'Sep 2024', source: 'BPS', route: '#/employment' },
  { label: 'Provinces', value: '38', year: '2024', source: 'BPS', route: '#/regions' },
];

// Country facts that change rarely. Land area is the commonly published
// BPS figure; island count is the government's published count.
export const COUNTRY_FACTS = [
  { label: 'Land area', value: '1,904,569 km²', note: 'BPS' },
  { label: 'Population density', value: '≈ 149 people / km²', note: '283.5m ÷ land area, 2024' },
  { label: 'Islands', value: '17,508', note: 'Government of Indonesia count' },
  { label: 'Median age', value: '30.1 years', note: 'UN WPP 2024' },
  { label: 'Fertility rate', value: '2.12 children per woman', note: 'UN WPP 2024' },
  { label: 'Urban population', value: '59.0%', note: 'UN WPP 2024' },
  { label: 'World population rank', value: '4th', note: 'UN, 2024' },
  { label: 'World GDP rank', value: '16th', note: 'World Bank, 2024' },
];

// Look up one year's row across the yearly series, for the year selector.
export function yearRow(year) {
  const i = YEARS.indexOf(year);
  if (i === -1) return null;
  return {
    year,
    gdp: GDP_NOMINAL.values[i],
    gdpPerCapita: GDP_PER_CAPITA.values[i],
    growth: GDP_GROWTH.values[i],
    inflation: INFLATION.values[i],
    unemployment: UNEMPLOYMENT.values[i],
    poverty: POVERTY.values[i],
  };
}
