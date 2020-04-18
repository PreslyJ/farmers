const sql = require("./db.js");

// constructor
const Farmer = function(farmer) {
  this.id = farmer.id;
  this.name = farmer.name;
  this.address = farmer.address;
  this.phone = farmer.phone;
  this.whatsapp = farmer.whatsapp;
  this.lat = farmer.lat;
  this.lon = farmer.lon;
  this.rating = farmer.rating;
};

Farmer.create = (newFarmer, result) => {
  sql.query("INSERT INTO farmer SET ?", newFarmer, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created farmer: ",res.insertId);
    result(null, {"id":res.insertId});
  });
};

Farmer.findById = (id, result) => {
  sql.query(`SELECT * FROM farmer WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found farmer: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Customer with the id
    result({ kind: "not_found" }, null);
  });
};

Farmer.getAll = result => {
  sql.query("SELECT * FROM farmer", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("farmers: ", res);
    result(null, res);
  });
};

Farmer.updateById = (id, farmer, result) => {
  sql.query(
    "UPDATE farmer SET name = ?, address = ?, phone = ?,whatsapp = ?,lat=?,lon=? WHERE id = ?",
    [farmer.name, farmer.address,  farmer.phone, farmer.whatsapp,farmer.lat,farmer.lon, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Customer with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated farmer: ", {  ...farmer });
      result(null, { id: id, ...farmer });
    }
  );
};

Farmer.findByPhone = (phone, result) => {
  sql.query(`SELECT * FROM farmer WHERE phone = ${phone}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    if (res.length) {
      console.log("found farmer: ", res[0]);
      result(null, res[0]);
      return;
    }
    result(null, null);
  });
};


module.exports = Farmer;