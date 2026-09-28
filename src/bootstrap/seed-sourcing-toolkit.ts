import fs from 'fs';
import path from 'path';
import type { Core } from '@strapi/strapi';

/**
 * One-time seed for the Sourcing Toolkit section on /resources.
 *
 * Runs on every boot but each step only acts when its data is missing, so editors'
 * changes in the admin are never overwritten:
 *   1. Public role can read the three new content types (the site fetches them
 *      without a token).
 *   2. Single type `sourcing-toolkit` (header copy + illustration).
 *   3. Four resource categories.
 *   4. Twelve placeholder documents spread evenly over the categories (no PDF —
 *      files are uploaded by hand in the admin).
 */

const TOOLKIT_UID = 'api::sourcing-toolkit.sourcing-toolkit';
const CATEGORY_UID = 'api::resource-category.resource-category';
const DOCUMENT_UID = 'api::resource-document.resource-document';

const PUBLIC_ACTIONS = [
  `${TOOLKIT_UID}.find`,
  `${CATEGORY_UID}.find`,
  `${CATEGORY_UID}.findOne`,
  `${DOCUMENT_UID}.find`,
  `${DOCUMENT_UID}.findOne`,
];

const CATEGORY_NAMES = ['Checklists', 'eBook', 'Others', 'Templates'];
const DOCUMENTS_PER_CATEGORY = 3;

const PLACEHOLDER_DOCUMENT = {
  title: 'Ethical Sourcing & Modern Slavery Policy',
  description: 'Set the standard for your supply chain with a concise, compliant ethical sourcing statement.',
  date: '2025-01-01',
};

const SEED_IMAGE = path.join(process.cwd(), 'database', 'seed', 'sourcing-toolkit.png');

async function grantPublicRead(strapi: Core.Strapi) {
  const role = await strapi.db
    .query('plugin::users-permissions.role')
    .findOne({ where: { type: 'public' } });
  if (!role) return;

  for (const action of PUBLIC_ACTIONS) {
    const existing = await strapi.db
      .query('plugin::users-permissions.permission')
      .findOne({ where: { action, role: role.id } });
    if (!existing) {
      await strapi.db
        .query('plugin::users-permissions.permission')
        .create({ data: { action, role: role.id } });
    }
  }
}

async function uploadSeedImage(strapi: Core.Strapi) {
  if (!fs.existsSync(SEED_IMAGE)) {
    strapi.log.warn(`[seed] ${SEED_IMAGE} not found — toolkit image left empty`);
    return null;
  }
  const [file] = await strapi
    .plugin('upload')
    .service('upload')
    .upload({
      data: { fileInfo: { name: 'sourcing-toolkit', alternativeText: 'Sourcing toolkit illustration' } },
      files: {
        filepath: SEED_IMAGE,
        originalFilename: 'sourcing-toolkit.png',
        mimetype: 'image/png',
        size: fs.statSync(SEED_IMAGE).size,
      },
    });
  return file ?? null;
}

async function seedToolkit(strapi: Core.Strapi) {
  const existing = await strapi.documents(TOOLKIT_UID).findFirst({ status: 'draft' });
  if (existing) return;

  const image = await uploadSeedImage(strapi);
  // Remaining fields fall back to the schema defaults.
  await strapi.documents(TOOLKIT_UID).create({
    data: image ? { image: image.id } : {},
    status: 'published',
  });
  strapi.log.info('[seed] sourcing-toolkit created');
}

async function seedCategoriesAndDocuments(strapi: Core.Strapi) {
  if ((await strapi.documents(CATEGORY_UID).count({})) > 0) return;

  const categories = [];
  for (const [i, name] of CATEGORY_NAMES.entries()) {
    categories.push(
      await strapi.documents(CATEGORY_UID).create({
        data: { name, order: i + 1 },
        status: 'published',
      }),
    );
  }
  strapi.log.info(`[seed] ${categories.length} resource categories created`);

  if ((await strapi.documents(DOCUMENT_UID).count({})) > 0) return;

  const total = CATEGORY_NAMES.length * DOCUMENTS_PER_CATEGORY;
  for (let i = 0; i < total; i++) {
    await strapi.documents(DOCUMENT_UID).create({
      data: {
        ...PLACEHOLDER_DOCUMENT,
        order: i + 1,
        category: categories[i % categories.length].documentId,
      },
      status: 'published',
    });
  }
  strapi.log.info(`[seed] ${total} resource documents created`);
}

export default async function seedSourcingToolkit(strapi: Core.Strapi) {
  try {
    await grantPublicRead(strapi);
    await seedToolkit(strapi);
    await seedCategoriesAndDocuments(strapi);
  } catch (err) {
    // Never block the admin from booting because of seed data.
    strapi.log.error('[seed] sourcing toolkit seed failed', err);
  }
}
