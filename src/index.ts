import type { Core } from '@strapi/strapi';
import seedSourcingToolkit from './bootstrap/seed-sourcing-toolkit';
import grantArticleCtaRead from './bootstrap/article-cta-permissions';

export default {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register(/* { strapi }: { strapi: Core.Strapi } */) {},

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  async bootstrap({ strapi }: { strapi: Core.Strapi }) {
    await seedSourcingToolkit(strapi);
    await grantArticleCtaRead(strapi);
  },
};
