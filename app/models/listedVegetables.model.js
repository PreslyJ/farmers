const sql = require("./db.js");

// constructor
const ListedVegetables = function(listedVegetables) {
  this.id = listedVegetables.id;
  this.vegetableId =  listedVegetables.vegetableId;
  this.farmerId = listedVegetables.farmerId;
  this.connectorId = listedVegetables.connectorId;
  this.grade = listedVegetables.grade;
  this.rate = listedVegetables.rate;
  this.quantity = listedVegetables.quantity;
  this.sdate = listedVegetables.sdate;
  this.freePercentage = listedVegetables.freePercentage;
};

ListedVegetables.create = (listedVegetables, result) => {
  sql.query("INSERT INTO listedVegetables SET ?", listedVegetables, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    result(null, { "id": res.insertId, ...listedVegetables });
  });
};

ListedVegetables.findById = (id, result) => {
  sql.query(`SELECT * FROM listedVegetables WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found listedVegetables: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Customer with the id
    result({ kind: "not_found" }, null);
  });
};

module.exports = ListedVegetables;