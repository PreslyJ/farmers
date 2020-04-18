const sql = require("./db.js");

// constructor
const Vegetable = function(vegetable) {
  this.id = vegetable.id;
  this.code = vegetable.code;
  this.description = vegetable.description;
  this.image = vegetable.image;
};


Vegetable.getAll = result => {
  sql.query("SELECT * FROM vegetable", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    result(null, res);
  });
};

module.exports = Vegetable;