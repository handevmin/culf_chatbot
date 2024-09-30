export function parseMathExpression(text) {
    return text.replace(/\$(.*?)\$/g, (match, p1) => `\\(${p1}\\)`);
  }