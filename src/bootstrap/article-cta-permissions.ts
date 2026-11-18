import type { Core } from '@strapi/strapi';

/**
 * Article CTA Box (`api::article-cta.article-cta`), same mechanism as strapi-cns.
 *
 * Public read (find/findOne): the site reads /api/article-ctas without a token, and the
 * CKEditor "CTA Box" button lists the boxes from the same endpoint. A new content type
 * gets no Public permission by itself, so it is granted here (idempotent).
 *
 * No box is created by code: editors create every box in Content Manager › Article CTA Box
 * and insert it where they want with the "CTA Box" button.
 */
const UID = 'api::article-cta.article-cta';

async function grantPublicRead(strapi: Core.Strapi) {
  const role = await strapi.db.query('plugin::users-permissions.role').findOne({ where: { type: 'public' } });
  if (!role) return;
  for (const a of ['find', 'findOne']) {
    const action = `${UID}.${a}`;
    const existing = await strapi.db
      .query('plugin::users-permissions.permission')
      .findOne({ where: { action, role: role.id } });
    if (existing) continue;
    await strapi.db.query('plugin::users-permissions.permission').create({ data: { action, role: role.id } });
    strapi.log.info(`[article-cta] granted Public ${action}`);
  }
}

export default async function grantArticleCtaRead(strapi: Core.Strapi) {
  try {
    await grantPublicRead(strapi);
  } catch (err) {
    strapi.log.error('[article-cta] could not grant Public read', err);
  }
}
