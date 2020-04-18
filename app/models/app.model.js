const sql = require("./db.js");

// constructor
const App = function(app) {
  this.version = app.version;
};


App.getAll = result => {
  sql.query("SELECT * FROM app", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    result(null, res[0]);
  });
};

module.exports = App;