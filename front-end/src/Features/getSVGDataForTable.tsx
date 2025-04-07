const PIXEL_FIX_WIDTH = 0;
const PIXEL_FIX_HEIGHT = 17;

export const getSVGDataForTable = (
  tableEl: HTMLTableElement,
  tableStyleEl: HTMLStyleElement,
) => {
  const boundingRect = tableEl.getBoundingClientRect();

  const width = Math.ceil(boundingRect.width + PIXEL_FIX_WIDTH);
  const height = Math.ceil(boundingRect.height + PIXEL_FIX_HEIGHT);

  return `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
  ${tableStyleEl.outerHTML}
  
  <foreignObject width="${width}" height="${height}">
    <div class="root" xmlns="http://www.w3.org/1999/xhtml">${tableEl.outerHTML}</div>
  </foreignObject>
</svg>`;
};
