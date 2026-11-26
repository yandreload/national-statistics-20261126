[![make.fun](https://make.fun/badge/best-national-statistics-site-20261126-0539.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539)
[![rank](https://make.fun/badge/best-national-statistics-site-20261126-0539/yandreload/national-statistics-20261126/rank.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539)
[![reward](https://make.fun/badge/best-national-statistics-site-20261126-0539/yandreload/national-statistics-20261126/reward.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539)

# NusaStat — Indonesia in Numbers

A national statistics site for Indonesia: population, economy, prices,
employment and regions — every figure with its source and year, so a reader
can check each number. Built for the [make.fun best national statistics site
bounty](https://make.fun/bounty/best-national-statistics-site-20261126-0539).

## What it is

- **Overview** — headline indicators (population 283.5m, GDP $1.40tn, growth
  5.03%, inflation 1.57%, unemployment 4.91%, poverty 8.57% — all 2024) with
  a live search that filters the cards.
- **Population** — population trend 2015–2025, age structure, year table.
- **Economy** — a year selector (2015–2024) that changes every figure on the
  page, GDP trend, sector and expenditure breakdowns.
- **Prices** — CPI inflation trend and year table, against Bank Indonesia's
  2.5% ± 1 point target.
- **Employment** — unemployment and poverty trends, plus what the headline
  misses (informal work, participation).
- **Regions** — island-group chart and a sortable, filterable table of 18
  provinces with capitals and 2024 populations.
- **Methodology** — the source and latest year of every series, and what was
  deliberately left out.

All figures were verified against published sources before they were typed
in: the World Bank (WDI), the United Nations (World Population Prospects
2024), BPS (Statistics Indonesia) and the CIA World Factbook. Nothing is
estimated or invented — figures we could not verify (for example life
expectancy) were left out, and the Methodology page says so.

## How it works

Static files under `app/` — no build step, no network requests, no
framework. `app/data.js` holds every figure, `app/charts.js` draws the SVG
line and bar charts, `app/views.js` renders one page per hash route, and
`app/main.js` does the routing. Serve it with any static server:

```sh
node serve.ts   # http://localhost:8080
```

## Screenshots

`shots.json` records the four screenshots in `screenshots/`: the overview
(1280×1000), the Economy page, the Regions page, and the overview at phone
size (390×844). Each is a real render of the running site in a browser.

## Handing it in

`main.ts` (Node 22, standard library only) copies `app/` and `screenshots/`
to `/output` and writes `/output/dossier.json` with the vendored
`vendor/makefun-frontend.ts` library:

```sh
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
```

## License

MIT — see [LICENSE](LICENSE).
