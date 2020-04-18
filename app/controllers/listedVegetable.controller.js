//const Vegetable = require("../models/vegetable.model.js");
const Connector = require("../models/connector.model.js");
const Farmer = require("../models/farmer.model");
const ListedVegetable = require("../models/listedVegetables.model");


exports.create = async (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

   createFarmer(req,res);

  res.send({ status: true });

};

exports.createFarmer = createFarmer;

exports.createConnector = createConnector;


function createFarmer (req,res)   {

  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  /*Creating Farmer*/

  const farmer = new Farmer({
    name: req.body.name,
    address : req.body.address,
    phone : req.body.phone,
    whatsapp : req.body.whatsapp,
    lat : req.body.lat,
    lon : req.body.lon,
    rating :5
  });

  Farmer.findByPhone(farmer.phone, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Error occured while fetching the farmer"
      });
    else {
      
      if(data){

        farmer.id = data.id

        if(farmer.address)
          farmer.address=data.address

        if(farmer.name)
          farmer.name=data.name
        
        if(farmer.phone)
          farmer.phone=data.phone

        if(farmer.whatsapp)
          farmer.whatsapp=data.whatsapp

        if(farmer.lat)
          farmer.lat=data.lat

        if(farmer.lon)
          farmer.lon=data.lon
        
         
        Farmer.updateById(data.id, farmer,  (err, data) =>{

          if (err)
          res.status(500).send({
            message:
              err.message || "Error occured while updating the farmer"
          });

          createConnector(req,res,farmer);


        });
        
      
      
      }else{

        console.log('Creating farmer', farmer)

        Farmer.create(farmer, (err, data) => {

          if (err)
            res.status(500).send({
              message:
                err.message || "Error occured while creating the farmer"
            });
          else{
            farmer.id = data.id;
            createConnector(req,res,farmer);

          }
        });    
      }
    }
  });

  /*End Creating farmer */


};


function createConnector (req,res,farmer) {

  console.log('Creating connector')

  /*start creating connector */

  const connector = new Connector({
    
    name : req.body.connector.name,
    phone : req.body.connector.phone,
    lat : req.body.connector.lat,
    lon : req.body.connector.lon

  });


  if(req.body.connector && req.body.connector.phone){


    Connector.findByPhone(connector.phone, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Error occured while fetching the connector"
        });
      else {
        
        if(data){
  
          connector.id = data.id
  
          if(connector.name)
            connector.name=data.name
          
          if(connector.phone)
            connector.phone=data.phone
    
          if(connector.lat)
            connector.lat=data.lat
  
          if(connector.lon)
            connector.lon=data.lon
                      
          Connector.updateById(connector.id, connector,  (err, data) =>{
  
            if (err)
            res.status(500).send({
              message:
                err.message || "Error occured while updating the connector"
            });
            
            createVegsTables(req,res,farmer,connector)        


          });
            
        }else{
    
          Connector.create(connector, (err, data) => {
  
            if (err)
              res.status(500).send({
                message:
                  err.message || "Error occured while creating the connector"
              });
            else{
              connector.id = data.id;
              createVegsTables(req,res,farmer,connector)
            }
          });    
        }
      }
    });

  }
}
  /*end creating connector*/
  

  async function createVegsTables (req,res,farmer,connector)   {

    /* start creating Veglist*/
  
    req.body.vegset.forEach(item => {
  
      const listedVegetable = new ListedVegetable({
        vegetableId: item.vegetableId,
        grade : item.grade,
        rate : item.rate,
        quantity : item.quantity,
        sdate :  new Date(item.date),
        freePercentage : item.freePercentage
    
      });
    
      listedVegetable.farmerId = farmer.id;
  
      listedVegetable.connectorId = connector.id;
  
      ListedVegetable.create(listedVegetable, (err, data) => {
        
        if (err)
          console.log({
            message:
              err.message || "Error occured while creating the veglist"
          });
        else{
        }
      });    
  
      
    });
  
    /* end creating Veglist*/
  
  
  }
