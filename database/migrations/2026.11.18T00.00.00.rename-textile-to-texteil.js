'use strict';

/**
 * Rename textile -> texteil (single type + 2 components) WITHOUT losing data.
 *
 * Table names (collectionName) are kept on purpose, so no table is dropped.
 * What changes is the UIDs stored as values in the DB. Strapi runs user
 * migrations BEFORE schema sync and BEFORE removeOrphanMorphType, which deletes
 * every dynamic-zone row whose component_type no longer exists. Without this
 * file, the Texteils block would vanish from all 6 pages (bag, furniture,
 * handicraft, packaging, eco-friendly, texteil).
 *
 * Runs once (recorded in strapi_migrations), inside a transaction.
 */

const UIDS = [
  ['api::textile.textile', 'api::texteil.texteil'],
  ['sections-products.textiles', 'sections-products.texteils'],
  ['elements-products.textiles', 'elements-products.texteils'],
];

const OLD_FIELD = 'Textiles';
const NEW_FIELD = 'Texteils';

async function listTables(knex) {
  const [rows] = await knex.raw('SHOW TABLES');
  return rows.map((r) => Object.values(r)[0]);
}

async function hasColumn(knex, table, column) {
  return knex.schema.hasColumn(table, column);
}

module.exports = {
  async up(knex) {
    const tables = await listTables(knex);
    const has = (t) => tables.includes(t);

    // 1. Dynamic zone + nested component join tables (*_cmps)
    for (const table of tables.filter((t) => t.endsWith('_cmps'))) {
      if (!(await hasColumn(knex, table, 'component_type'))) continue;
      for (const [oldUid, newUid] of UIDS) {
        await knex(table).where('component_type', oldUid).update({ component_type: newUid });
      }
    }

    // 2. Field name of the repeatable component inside sections-products.texteils
    const nestedJoin = 'components_sections_products_textiles_cmps';
    if (has(nestedJoin)) {
      await knex(nestedJoin).where('field', OLD_FIELD).update({ field: NEW_FIELD });
    }

    // 3. Media morph relations (image inside elements-products.texteils)
    if (has('files_related_mph')) {
      for (const [oldUid, newUid] of UIDS) {
        await knex('files_related_mph').where('related_type', oldUid).update({ related_type: newUid });
      }
    }

    // 4. Public / Authenticated API permissions (api::textile.textile.find ...)
    if (has('up_permissions')) {
      const rows = await knex('up_permissions').where('action', 'like', 'api::textile.textile.%');
      for (const row of rows) {
        await knex('up_permissions')
          .where('id', row.id)
          .update({ action: row.action.replace('api::textile.textile', 'api::texteil.texteil') });
      }
    }

    // 5. Admin role permissions
    if (has('admin_permissions')) {
      await knex('admin_permissions')
        .where('subject', 'api::textile.textile')
        .update({ subject: 'api::texteil.texteil' });
    }

    // 6. Content-manager layout config (keys + values contain the UIDs)
    if (has('strapi_core_store_settings')) {
      const rows = await knex('strapi_core_store_settings')
        .where('key', 'like', 'plugin_content_manager_configuration_%')
        .andWhere((q) => {
          for (const [oldUid] of UIDS) q.orWhere('key', 'like', `%::${oldUid}`);
        });
      for (const row of rows) {
        let { key, value } = row;
        for (const [oldUid, newUid] of UIDS) {
          key = key.split(oldUid).join(newUid);
          if (typeof value === 'string') value = value.split(oldUid).join(newUid);
        }
        if (key.endsWith('::sections-products.texteils') && typeof value === 'string') {
          value = value.split(`"${OLD_FIELD}"`).join(`"${NEW_FIELD}"`);
        }
        // Drop a config Strapi may already have generated for the new key
        await knex('strapi_core_store_settings').where('key', key).whereNot('id', row.id).del();
        await knex('strapi_core_store_settings').where('id', row.id).update({ key, value });
      }
    }

    // 7. Optional plugin tables that store content_type
    for (const table of ['strapi_history_versions', 'strapi_release_actions']) {
      if (has(table) && (await hasColumn(knex, table, 'content_type'))) {
        await knex(table)
          .where('content_type', 'api::textile.textile')
          .update({ content_type: 'api::texteil.texteil' });
      }
    }
  },

  async down() {
    throw new Error('Down migration not supported for rename-textile-to-texteil');
  },
};
