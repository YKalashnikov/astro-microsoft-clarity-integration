import type { AstroIntegration, InjectedScriptStage } from 'astro';

type ClarityOptions = {
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
  if (!projectId) console.error('Clarity Integration requires a valid projectId');

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
            ${Object.entries(customAttrs)
              .map(([key, value]) => `t.setAttribute("data-${key}", "${value}");`)
              .join('\n')}
            y = l.getElementsByTagName(r)[0];
            y.parentNode.insertBefore(t, y);
          })(window, document, "clarity", "script", "${projectId}");
        `;

        injectScript(scriptStage, scriptContent);
      },
    },
  };
}
