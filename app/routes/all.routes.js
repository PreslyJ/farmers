module.exports = app => {

  const listedVegetable = require("../controllers/listedVegetable.controller.js");

  const veg = require("../controllers/Vegetable.controller.js");

  const appvers = require("../controllers/app.controller.js");


  app.post("/createVegetableList", listedVegetable.create);

  app.get("/vegetables", veg.findAll);

  app.get("/appVersion", appvers.findAll);

};
