module.exports = function(sequelize, DataTypes) {
  var Category = sequelize.define("Category", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    }
  });

Category.associate = function(models) {
  // Associating Category with Arts
  // When an Category is deleted, also delete any associated Arts
  Category.hasMany(models.Arts);
};


  return Category;
};
