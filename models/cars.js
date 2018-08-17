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
    baggageSpace: {
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
    },
    acriss_code: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [4]
      }
    }
  });
  return cars;
};
