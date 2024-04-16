/**
 *
 * @param {string} tag
 * @param {object} attributes
 * @returns  {HTMLElement}
 */
export function createCustomElement({ tag, attributes = {} }) {
  const customElement = document.createElement(tag);
  for (const [attribute, value] of Object.entries(attributes)) {
    if (value !== null) customElement.setAttribute(attribute, value);
  }
  return customElement;
}

{
}
