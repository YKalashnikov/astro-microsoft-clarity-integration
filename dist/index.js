"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = clarityIntegration;
function clarityIntegration(_a) {
    var projectId = _a.projectId, _b = _a.enabled, enabled = _b === void 0 ? true : _b, _c = _a.scriptStage, scriptStage = _c === void 0 ? 'head-inline' : _c, _d = _a.debug, debug = _d === void 0 ? false : _d, _e = _a.async, async = _e === void 0 ? true : _e, _f = _a.defer, defer = _f === void 0 ? false : _f, _g = _a.customAttrs, customAttrs = _g === void 0 ? {} : _g;
    if (enabled && !projectId) {
        throw new Error('Clarity Integration requires a valid projectId');
    }
    var serializedProjectId = JSON.stringify(projectId);
    var customAttrLines = Object.entries(customAttrs)
        .map(function (_a) {
        var key = _a[0], value = _a[1];
        var normalizedKey = key.startsWith('data-') ? key.slice(5) : key;
        return "t.setAttribute(".concat(JSON.stringify("data-".concat(normalizedKey)), ", ").concat(JSON.stringify(value), ");");
    })
        .join('\n');
    return {
        name: 'astro-clarity',
        hooks: {
            'astro:config:setup': function (_a) {
                var injectScript = _a.injectScript;
                if (!enabled)
                    return;
                var scriptContent = "\n          (function(c, l, a, r, i, t, y) {\n            c[a] = c[a] || function() { (c[a].q = c[a].q || []).push(arguments) };\n            t = l.createElement(r);\n            t.src = \"https://www.clarity.ms/tag/\" + i;\n            t.async = ".concat(async, ";\n            t.defer = ").concat(defer, ";\n            ").concat(debug ? "console.debug(\"Clarity script injected:\", i);" : '', "\n            ").concat(customAttrLines, "\n            y = l.getElementsByTagName(r)[0];\n            if (y && y.parentNode) {\n              y.parentNode.insertBefore(t, y);\n            } else {\n              l.head.appendChild(t);\n            }\n          })(window, document, \"clarity\", \"script\", ").concat(serializedProjectId, ");\n        ");
                injectScript(scriptStage, scriptContent);
            },
        },
    };
}
