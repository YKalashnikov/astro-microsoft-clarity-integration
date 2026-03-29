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
export default function clarityIntegration({ projectId, enabled, scriptStage, debug, async, defer, customAttrs, }: ClarityOptions): AstroIntegration;
//# sourceMappingURL=index.d.ts.map