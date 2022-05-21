export function decodeHTMLEntities(text: string) {
  const element = document.createElement('div');
  if (typeof text === 'string') {
    element.innerHTML = text
      .replace(/<script[^>]*>([\S\s]*?)<\/script>/gim, '')
      .replace(/<\/?\w(?:[^"'>]|"[^"]*"|'[^']*')*>/gim, '');
  }
  return element.textContent ?? '';
}
