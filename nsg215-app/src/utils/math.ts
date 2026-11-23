function extractBraced(str: string, startIndex: number): { content: string; endIndex: number } | null {
  if (str[startIndex] !== '{') return null;
  let depth = 0;
  for (let i = startIndex; i < str.length; i++) {
    if (str[i] === '{') depth++;
    else if (str[i] === '}') {
      depth--;
      if (depth === 0) {
        return { content: str.slice(startIndex + 1, i), endIndex: i };
      }
    }
  }
  return null;
}

function replaceCommandWithBraced(
  str: string,
  command: string,
  formatFn: (...args: string[]) => string
): string {
  let result = '';
  let i = 0;
  while (i < str.length) {
    if (str.startsWith(command, i)) {
      let arg1Start = i + command.length;
      while (arg1Start < str.length && /\s/.test(str[arg1Start])) arg1Start++;
      const arg1 = extractBraced(str, arg1Start);
      if (arg1) {
        let arg2Start = arg1.endIndex + 1;
        while (arg2Start < str.length && /\s/.test(str[arg2Start])) arg2Start++;
        const arg2 = extractBraced(str, arg2Start);
        if (arg2) {
          result += formatFn(arg1.content, arg2.content);
          i = arg2.endIndex + 1;
          continue;
        } else if (formatFn.length === 1) {
          result += formatFn(arg1.content);
          i = arg1.endIndex + 1;
          continue;
        }
      }
    }
    result += str[i];
    i++;
  }
  return result;
}

/**
 * Formats LaTeX strings ($...$, \frac, Greek symbols, powers, subscripts)
 * into clean, readable mathematical typography with zero raw backslashes.
 */
export function formatMathText(text: string): string {
  if (!text || typeof text !== 'string') return text;

  let out = replaceCommandWithBraced(text, '\\text', (content) => content);
  out = replaceCommandWithBraced(out, '\\frac', (num, den) => `(${num}) / (${den})`);
  out = replaceCommandWithBraced(out, '\\binom', (n, k) => `(${n} choose ${k})`);
  out = replaceCommandWithBraced(out, '\\sqrt', (content) => `√(${content})`);

  const replacements: [RegExp, string][] = [
    [/\\bar\{x\}/gi, 'x̄'],
    [/\\bar\{X\}/gi, 'X̄'],
    [/\\hat\{y\}/gi, 'ŷ'],
    [/\\hat\{Y\}/gi, 'Ŷ'],
    [/\\hat\{\\beta\}_0/gi, 'β̂₀'],
    [/\\hat\{\\beta\}_1/gi, 'β̂₁'],
    [/\\hat\{\\beta\}/gi, 'β̂'],
    [/\\mu/g, 'μ'],
    [/\\sigma\^2/g, 'σ²'],
    [/\\sigma/g, 'σ'],
    [/\\Sigma/g, 'Σ'],
    [/\\sum_\{[^}]+\}\^\{[^}]+\}/g, '∑'],
    [/\\sum_\{[^}]+\}/g, '∑'],
    [/\\sum/g, '∑'],
    [/\\rho/g, 'ρ'],
    [/\\pi/g, 'π'],
    [/\\Pi/g, 'Π'],
    [/\\lambda/g, 'λ'],
    [/\\alpha/g, 'α'],
    [/\\beta/g, 'β'],
    [/\\chi\^2/g, 'χ²'],
    [/\\chi/g, 'χ'],
    [/\\Delta/g, 'Δ'],
    [/\\infty/g, '∞'],
    [/\\approx/g, '≈'],
    [/\\ne/g, '≠'],
    [/\\le/g, '≤'],
    [/\\ge/g, '≥'],
    [/\\times/g, '×'],
    [/\\pm/g, '±'],
    [/\\circ/g, '°'],
    [/\\cap/g, '∩'],
    [/\\cup/g, '∪'],
    [/\\mid/g, '|'],
    [/\\sim/g, '~'],
    [/\\rightarrow/g, '→'],
    [/\\(?:c)?dots/g, '...'],
    [/\\left/g, ''],
    [/\\right/g, ''],
    [/\\%/g, '%'],
    [/\\,/g, ' '],
    [/\\;/g, ' '],
    [/\\ /g, ' '],
    [/\\!/g, ''],
    [/\^2/g, '²'],
    [/\^3/g, '³'],
    [/_0/g, '₀'],
    [/_1/g, '₁'],
    [/_2/g, '₂'],
    [/_i/g, 'ᵢ'],
    [/\$/g, '']
  ];

  for (const [pattern, sub] of replacements) {
    out = out.replace(pattern, sub);
  }

  out = out.replace(/\\([a-zA-Z]+)/g, '$1');
  out = out.replace(/[ \t]+/g, ' ');

  return out.trim();
}
