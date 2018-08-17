module.exports = function(sequelize, DataTypes) {
var cars = sequelize.define("cars", {
 id: {
  type: DataTypes.INTEGER,
  allowNull: false,
  autoIncrement: true,
  primaryKey: true
 },
 model: {
  type: DataTypes.STRING,
  allowNull: false
 },
 transmission: {
  type: DataTypes.TINYINT,
  allowNull: false
 },
 trunkSpace: {
  type: DataTypes.TINYINT,
  allowNull: false
 },
 people: {
  type: DataTypes.TINYINT,
  allowNull: false
 },
 imgSRC: {
  type: DataTypes.STRING,
  allowNull: false
 },
 company: {
  type: DataTypes.STRING,
  allowNull: false
 }
});
 return cars;
};