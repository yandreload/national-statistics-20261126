// NusaStat charts: hand-written SVG line and bar charts. No library, no
// network, no canvas tricks — plain SVG built from the data arrays so every
// bar and point is a real figure.

const NS = 'http://www.w3.org/2000/svg';

function svgEl(tag, attrs) {
  const el = document.createElementNS(NS, tag);
  for (const [k, v] of Object.entries(attrs)) el.setAttribute(k, String(v));
  return el;
}

function niceMax(values) {
  const top = Math.max(...values);
  const low = Math.min(...values, 0);
  if (top <= 0) return { min: low, max: 1 };
  const span = top - low;
  const step = Math.pow(10, Math.floor(Math.log10(span || 1)));
  const max = Math.ceil(top / step) * step;
  const min = low < 0 ? Math.floor(low / step) * step : 0;
  return { min, max };
}

function fmtTick(v, decimals) {
  if (Math.abs(v) >= 1000) return String(Math.round(v).toLocaleString('en-US'));
  return v.toFixed(decimals ?? 0);
}

// A line chart with labelled axes, gridlines and a dot on every year.
// series: { years: number[], values: number[], label: string, unit: string }
export function lineChart(series, opts = {}) {
  const w = opts.width ?? 760;
  const h = opts.height ?? 300;
  const padL = 56, padR = 16, padT = 18, padB = 34;
  const { min, max } = niceMax(series.values);
  const iw = w - padL - padR;
  const ih = h - padT - padB;
  const x = (i) => padL + (i / (series.years.length - 1)) * iw;
  const y = (v) => padT + (1 - (v - min) / (max - min)) * ih;

  const svg = svgEl('svg', {
    viewBox: `0 0 ${w} ${h}`, role: 'img',
    'aria-label': `${series.label} chart, ${series.years[0]} to ${series.years[series.years.length - 1]}`,
    class: 'chart-svg',
  });
  const title = svgEl('title', {});
  title.textContent = `${series.label}, ${series.years[0]}–${series.years[series.years.length - 1]}`;
  svg.appendChild(title);

  // Horizontal gridlines + value labels.
  const ticks = 4;
  for (let t = 0; t <= ticks; t++) {
    const v = min + ((max - min) * t) / ticks;
    const gy = y(v);
    svg.appendChild(svgEl('line', { x1: padL, x2: w - padR, y1: gy, y2: gy, class: 'grid-line' }));
    const lab = svgEl('text', { x: padL - 8, y: gy + 4, class: 'tick-label', 'text-anchor': 'end' });
    lab.textContent = fmtTick(v, series.decimals ?? 0);
    svg.appendChild(lab);
  }
  // Zero line stands out when the series crosses below zero.
  if (min < 0) {
    svg.appendChild(svgEl('line', { x1: padL, x2: w - padR, y1: y(0), y2: y(0), class: 'zero-line' }));
  }

  const points = series.values.map((v, i) => `${x(i).toFixed(1)},${y(v).toFixed(1)}`).join(' ');
  svg.appendChild(svgEl('polyline', { points, class: 'line-path', fill: 'none' }));
  series.values.forEach((v, i) => {
    svg.appendChild(svgEl('circle', { cx: x(i), cy: y(v), r: 4.5, class: 'line-dot' }));
    const lab = svgEl('text', { x: x(i), y: h - 10, class: 'tick-label', 'text-anchor': 'middle' });
    lab.textContent = String(series.years[i]).slice(2);
    svg.appendChild(lab);
  });
  // Value label on the newest point.
  const last = series.values.length - 1;
  const tag = svgEl('text', { x: x(last) - 4, y: y(series.values[last]) - 12, class: 'last-value', 'text-anchor': 'end' });
  tag.textContent = `${fmtTick(series.values[last], series.decimals ?? 0)}${series.suffix ?? ''} (${series.years[last]})`;
  svg.appendChild(tag);
  return svg;
}

// A horizontal bar chart, longest bar first. rows: [{name, value, note?}]
export function barChart(rows, opts = {}) {
  const w = opts.width ?? 760;
  const rowH = opts.rowHeight ?? 34;
  const padL = opts.labelWidth ?? 190;
  const padR = 76;
  const h = rowH * rows.length + 14;
  const max = Math.max(...rows.map((r) => r.value));
  const svg = svgEl('svg', {
    viewBox: `0 0 ${w} ${h}`, role: 'img',
    'aria-label': `${opts.label ?? 'Bar chart'} of ${rows.length} rows`,
    class: 'chart-svg',
  });
  const title = svgEl('title', {});
  title.textContent = opts.label ?? 'Bar chart';
  svg.appendChild(title);
  rows.forEach((r, i) => {
    const cy = 14 + i * rowH + rowH / 2;
    const bw = ((w - padL - padR) * r.value) / max;
    const lab = svgEl('text', { x: padL - 10, y: cy + 4, class: 'bar-label', 'text-anchor': 'end' });
    lab.textContent = r.name;
    svg.appendChild(lab);
    svg.appendChild(svgEl('rect', {
      x: padL, y: cy - 11, width: Math.max(bw, 2), height: 22, rx: 4, class: 'bar-rect',
    }));
    const val = svgEl('text', { x: padL + bw + 8, y: cy + 4, class: 'bar-value' });
    val.textContent = r.valueText ?? String(r.value);
    svg.appendChild(val);
  });
  return svg;
}
