export default {
  async beforeCreate(event) {
    const { data } = event.params;

    // Khi Admin lưu bài, Strapi tự sinh ra trường data.createdBy chứa ID của Admin đó
    if (data.createdBy) {
      try {
        // 1. Tìm tài khoản Admin trong hệ thống để soi xem Email là gì
        const adminUser = await strapi.db.query('admin::user').findOne({
          where: { id: data.createdBy },
        });

        if (adminUser && adminUser.email) {
          // 2. Lục tìm trong bảng blogUser xem có ai trùng cái Email này không
          const matchedAuthor = await strapi.db.query('api::blog-user.blog-user').findOne({
            where: { email: adminUser.email },
          });

          // 3. Nếu tìm thấy, tự động nhét ID của blogUser vào trường authors
          // Vì là quan hệ manyToMany, nên bắt buộc phải bọc trong ngoặc vuông (Array)
          if (matchedAuthor) {
            data.authors = [matchedAuthor.id];
          }
        }
      } catch (error) {
        console.error('Lỗi tự động gán Tác giả:', error);
      }
    }
  },
};
