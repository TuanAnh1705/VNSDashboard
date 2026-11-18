import type { StrapiApp } from '@strapi/strapi/admin';
import {
  setPluginConfig,
  defaultHtmlPreset,
  defaultMarkdownPreset,
  type Preset,
} from '@_sh/strapi-plugin-ckeditor';
import {
  Essentials,
  Paragraph,
  Bold,
  Italic,
  Link,
  AutoLink,
} from 'ckeditor5';
import { ArticleCtaPlugin } from './ckeditor/ArticleCtaPlugin';

/**
 * Small editor for one Reference line (BlogDetail › references › text): text + bold/italic + link
 * only, e.g. "<a>Journey to 2030: Vietnam's Next Growth Cycle</a>, KPMG in Vietnam (October 2026)".
 * The site shows it in the [n] popover and in the References list at the end of the article.
 */
const referenceLinePreset: Preset = {
  name: 'referenceLine',
  description: 'Reference line (text + link)',
  editorConfig: {
    licenseKey: 'GPL',
    plugins: [Essentials, Paragraph, Bold, Italic, Link, AutoLink],
    toolbar: ['link', 'bold', 'italic', '|', 'undo', 'redo'],
    link: { defaultProtocol: 'https://' },
    placeholder: "Journey to 2030: Vietnam's Next Growth Cycle, KPMG in Vietnam (October 2026)",
  },
};

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
      presets: [withArticleCta(defaultHtmlPreset), defaultMarkdownPreset, referenceLinePreset],
    });
  },
  bootstrap(_app: StrapiApp) {},
};
