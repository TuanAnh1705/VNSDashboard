import type { Core } from '@strapi/strapi';

/**
 * Article CTA Box (`api::article-cta.article-cta`), same mechanism as strapi-cns.
 *
 *  1. Public read (find/findOne): the site reads /api/article-ctas without a token, and the
 *     CKEditor "CTA Box" button lists the boxes from the same endpoint. A new content type
 *     gets no Public permission by itself, so it is granted here (idempotent).
 *  2. The two default boxes that posts with no CTA marker use (copy = VNS Blog dev
 *     handoff 16/11/2026). Created only when the slug is missing, never overwritten,
 *     so edits made in the admin stay.
 */
const UID = 'api::article-cta.article-cta';

const DEFAULTS = [
  {
    slug: 'vns-default-box',
    name: 'Default · end of article (box)',
    variant: 'box',
    eyebrow: 'Work with Vietnam Sourcing',
    heading: 'Looking for the right factory in Vietnam?',
    description:
      'Tell us what you need. We shortlist manufacturers, manage samples and quality control, and coordinate shipping to your door.',
    buttonLabel: 'GET A QUOTE',
    buttonUrl: '/get-a-consultation',
  },
  {
    slug: 'vns-default-bar',
    name: 'Default · mid-article (bar)',
    variant: 'bar',
    eyebrow: null,
    heading: 'New to sourcing from Vietnam?',
    description: null,
    buttonLabel: 'See our order process',
    buttonUrl: '/order-process',
  },
] as const;

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

async function seedDefaults(strapi: Core.Strapi) {
  for (const row of DEFAULTS) {
    const existing = await strapi.documents(UID).findFirst({ filters: { slug: row.slug } });
    if (existing) continue;
    await strapi.documents(UID).create({ data: { ...row } as never });
    strapi.log.info(`[article-cta] created default box ${row.slug}`);
  }
}

export default async function seedArticleCtas(strapi: Core.Strapi) {
  try {
    await grantPublicRead(strapi);
    await seedDefaults(strapi);
  } catch (err) {
    strapi.log.error('[article-cta] bootstrap failed', err);
  }
}
