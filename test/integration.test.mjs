import test from 'node:test';
import assert from 'node:assert/strict';

import clarityIntegration from '../dist/index.js';

function getInjectedScript(options) {
  const integration = clarityIntegration(options);
  let injectedStage;
  let injectedContent;

  integration.hooks['astro:config:setup']({
    injectScript(stage, content) {
      injectedStage = stage;
      injectedContent = content;
    },
  });

  return { injectedStage, injectedContent };
}

test('throws when enabled without a projectId', () => {
  assert.throws(
    () => clarityIntegration({ projectId: '', enabled: true }),
    /requires a valid projectId/,
  );
});

test('does not inject a script when disabled', () => {
  const { injectedStage, injectedContent } = getInjectedScript({
    projectId: 'abc123',
    enabled: false,
  });

  assert.equal(injectedStage, undefined);
  assert.equal(injectedContent, undefined);
});

test('injects the configured stage and script attributes', () => {
  const { injectedStage, injectedContent } = getInjectedScript({
    projectId: 'abc123',
    scriptStage: 'page',
    async: false,
    defer: true,
    customAttrs: {
      region: 'us',
      'data-env': 'prod',
    },
  });

  assert.equal(injectedStage, 'page');
  assert.match(injectedContent, /https:\/\/www\.clarity\.ms\/tag\/"\s*\+\s*i/);
  assert.match(injectedContent, /t\.async = false;/);
  assert.match(injectedContent, /t\.defer = true;/);
  assert.match(injectedContent, /t\.setAttribute\("data-region", "us"\);/);
  assert.match(injectedContent, /t\.setAttribute\("data-env", "prod"\);/);
  assert.match(injectedContent, /l\.head\.appendChild\(t\);/);
});
