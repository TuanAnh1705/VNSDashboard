import type { StrapiApp } from '@strapi/strapi/admin';
import {
  setPluginConfig,
  defaultHtmlPreset,
  defaultMarkdownPreset,
  type Preset,
} from '@_sh/strapi-plugin-ckeditor';
import { ArticleCtaPlugin } from './ckeditor/ArticleCtaPlugin';

/**
 * Preset `defaultHtml` (BlogDetail › BlogContent, privacy content) plus the "CTA Box"
 * button (same as strapi-cns). Keep the preset NAME unchanged — schemas point to the
 * preset by name; renaming it would leave every BlogContent field without an editor.
 */
function withArticleCta(preset: Preset): Preset {
  const cfg = preset.editorConfig;
  const toolbar = Array.isArray(cfg.toolbar) ? [...cfg.toolbar] : cfg.toolbar;
  if (Array.isArray(toolbar)) {
    const at = toolbar.indexOf('htmlEmbed');
    toolbar.splice(at >= 0 ? at + 1 : toolbar.length, 0, 'articleCta');
  }
  return {
    ...preset,
    editorConfig: {
      ...cfg,
      plugins: [...(cfg.plugins ?? []), ArticleCtaPlugin],
      toolbar,
    },
  };
}

export default {
  config: {
    locales: [],
  },
  register() {
    // Must run in `register` — the plugin config is locked after bootstrap.
    setPluginConfig({
      presets: [withArticleCta(defaultHtmlPreset), defaultMarkdownPreset],
    });
  },
  bootstrap(_app: StrapiApp) {},
};
