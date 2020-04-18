const App = require("../models/app.model.js");

// Retrieve all Customers from the database.
exports.findAll = (req, res) => {
  App.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving app."
      });
    else res.send(data);
  });
};
