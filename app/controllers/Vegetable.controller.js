const Vegetable = require("../models/vegetable.model.js");

// Retrieve all Customers from the database.
exports.findAll = (req, res) => {
  Vegetable.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving veg."
      });
    else res.send(data);
  });
};
