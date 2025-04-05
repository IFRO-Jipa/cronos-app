export const tableBaseClassName = "renderTable";

export const tableBaseClass = `.${tableBaseClassName}`;

export const getTableStyles = () => `
${tableBaseClass},
${tableBaseClass} :is(div, span, table, tbody, tfoot, thead, tr, th, td) {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font: inherit;
  vertical-align: baseline;
}

${tableBaseClass} {
  line-height: 1;
  font-family: sans-serif;
  border-collapse: collapse;
  border-spacing: 0;
}

${tableBaseClass} :is(*, *::after, *::before) {
  box-sizing: border-box;
}

${tableBaseClass} {
  text-align: center;
  border: 0.125rem solid black;
  border-collapse: collapse;
}

${tableBaseClass} tbody {
  background-color: white;
}

${tableBaseClass} :is(td, th) {
  border: 0.0625rem solid black;
  padding: 0.25rem 0.625rem;
}

${tableBaseClass} thead {
  background-color: #e26b0a;
  font-weight: bold;
  color: white;
}

${tableBaseClass} .col-day {
  font-weight: bold;
  font-size: 1.375rem;
  vertical-align: middle;
}

${tableBaseClass} .col-day span {
  writing-mode: vertical-lr;
  transform: rotate(180deg);
}

${tableBaseClass} td {
  white-space: nowrap;
}

${tableBaseClass} .col-date {
  padding: 0;
  min-width: 2rem;
  
  font-weight: bold;
  font-size: 1.25rem;
  vertical-align: middle;
}

${tableBaseClass} .col-date span {
  writing-mode: vertical-lr;
  transform: rotate(180deg);
}

${tableBaseClass} .col-time {
  vertical-align: middle;
  font-weight: bold;
  padding: 0 0.75rem;
  font-size: 0.8125;
}

${tableBaseClass} .col-text {
  font-weight: 500;
  padding: 0.25rem 0.75rem 0.25rem 0.75rem;
  font-size: 0.875rem;
}

${tableBaseClass} :is(tr:is([data-week-day="1"], [data-week-day="3"], [data-week-day="5"]), .col-day, .col-date, .col-time) {
  background-color: #d9d9d9;
}

${tableBaseClass} tr[data-order="5"] td.col-text {
  border-top-width: 0.125rem;
}

${tableBaseClass} tr:not([data-week-day="0"])[data-order="0"] td {
  border-top-width: 0.125rem;
}

${tableBaseClass} .col-text {
  min-width: 12.5rem;
}
`;
