import type { AstroIntegration, InjectedScriptStage } from 'astro';

export type ClarityOptions = {
  projectId: string;
  enabled?: boolean;
  scriptStage?: InjectedScriptStage;
  debug?: boolean;
  async?: boolean;
  defer?: boolean;
  customAttrs?: Record<string, string>;
};

export default function clarityIntegration({
  projectId,
  enabled = true,
  scriptStage = 'head-inline',
  debug = false,
  async = true,
  defer = false,
  customAttrs = {},
}: ClarityOptions): AstroIntegration {
  if (enabled && !projectId) {
    throw new Error('Clarity Integration requires a valid projectId');
  }

  const serializedProjectId = JSON.stringify(projectId);
  const customAttrLines = Object.entries(customAttrs)
    .map(([key, value]) => {
      const normalizedKey = key.startsWith('data-') ? key.slice(5) : key;
      return `t.setAttribute(${JSON.stringify(`data-${normalizedKey}`)}, ${JSON.stringify(value)});`;
    })
    .join('\n');

  return {
    name: 'astro-clarity',
    hooks: {
      'astro:config:setup': ({ injectScript }) => {
        if (!enabled) return;

        const scriptContent = `
          (function(c, l, a, r, i, t, y) {
            c[a] = c[a] || function() { (c[a].q = c[a].q || []).push(arguments) };
            t = l.createElement(r);
            t.src = "https://www.clarity.ms/tag/" + i;
            t.async = ${async};
            t.defer = ${defer};
            ${debug ? `console.debug("Clarity script injected:", i);` : ''}
            ${customAttrLines}
            y = l.getElementsByTagName(r)[0];
            if (y && y.parentNode) {
              y.parentNode.insertBefore(t, y);
            } else {
              l.head.appendChild(t);
            }
          })(window, document, "clarity", "script", ${serializedProjectId});
        `;

        injectScript(scriptStage, scriptContent);
      },
    },
  };
}
