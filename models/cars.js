// for accessing database

var db = require("./");

module.exports = function (acriss) {
 db.cars.findAll({
        where: {
            acriss_code: acriss
        }
    }).then(function (data) {
        return data;
    })
};




