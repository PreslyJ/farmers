const sql = require("./db.js");

// constructor
const Connector = function(connector) {
  this.id = connector.id;
  this.name = connector.name;
  this.phone = connector.phone;
  this.lat = connector.lat;
  this.lon = connector.lon;
};

Connector.create = (connector, result) => {
  sql.query("INSERT INTO connector SET ?", connector, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created connector: ", { id: res.insertId, ...connector });
    result(null, { id: res.insertId, ...connector });
  });
};

Connector.findById = (id, result) => {
  sql.query(`SELECT * FROM connector WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found connector: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Customer with the id
    result({ kind: "not_found" }, null);
  });
};

Connector.findByPhone = (phone, result) => {
  sql.query(`SELECT * FROM connector WHERE phone = ${phone}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found connector: ", res[0]);
      result(null, res[0]);
      return;
    }

    result(null, null);
  });
};


Connector.updateById = (id, connector, result) => {
  sql.query(
    "UPDATE connector SET name = ?, phone = ?, lat=?, lon=? WHERE id = ?",
    [connector.name,connector.phone,connector.lat,connector.lon, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found connector with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated farmer: ", { "id": id });
      result(null, { "id": id});
    }
  );
};

module.exports = Connector;