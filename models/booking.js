module.exports = function(sequelize, DataTypes) {
  var Bookings = sequelize.define("Bookings", {
    name: DataTypes.STRING,
    destination: DataTypes.STRING,
    departureDate: DataTypes.STRING,
    returnDate: DataTypes.STRING,
    flightPrice: DataTypes.STRING,
    airline: DataTypes.STRING,
    outFlightTime: DataTypes.STRING,
    inFlightTime: DataTypes.STRING,
    hotelName: DataTypes.STRING,
    checkinDate: DataTypes.STRING,
    checkoutDate: DataTypes.STRING,
    hotelPrice: DataTypes.STRING,
    hotelURL: DataTypes.TEXT
  });
  return Bookings;
};
