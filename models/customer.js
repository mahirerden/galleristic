module.exports = function(sequelize, DataTypes) {
  var Customer = sequelize.define("Customer", {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    fullname: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      len: [1]
    }
  });

Customer.associate = function(models) {
  // Associating Customer with Arts
  // When an Customer is deleted, also delete any associated Arts
  Customer.hasMany(models.Arts, {
    onDelete: "cascade"
  });
};

  return Customer;
};
