module.exports = function(sequelize, DataTypes) {
  var Bookings = sequelize.define("Bookings", {
    destination: DataTypes.STRING,
    hotel: DataTypes.STRING,
    price: DataTypes.STRING
  });
  return Bookings;
};
