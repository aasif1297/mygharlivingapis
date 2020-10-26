const express = require('express');
const db  = require('../db');
const Joi = require('joi');


const router = express.Router();

function validateUser(result){
    const schema = Joi.object({
        name: Joi.string().min(3).required(),
        email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
        phone: Joi.string().length(11).pattern(/^[0-9]+$/).required(),
    });

    return schema.validate(result);
}

function validateBooking(result){
    const schema = Joi.object({
        name: Joi.string().min(3).required(),
        email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
        phone: Joi.string().length(11).pattern(/^[0-9]+$/).required(),
        date_time: Joi.required(),
        user_id: Joi.required(),
        property_id: Joi.required()
    });

    return schema.validate(result);
}

router.get('/getProperties', async (req, res, next) => {
    try{
        let results = await db.allProps();
        var dataArray = [];
        for(var i = 0; i < results.length; i++){
            var data = {
                "id": results[i]['id'],
                "propert_title": results[i]['propert_title'],
                "property_address": results[i]['property_address'],
                "property_gender_type": results[i]['property_gender_type'],
                "starting_price": results[i]['starting_price'],
                "property_image": results[i]['property_image'],
                "property_location": results[i]['property_location'],
                "property_neighbour": results[i]['property_neighbour']
            };
            dataArray.push(data);
      }


      if(dataArray.length < 1) {
        var data = [];
        var json = {
            "status":  res.statusCode,
            "data": data,
            "message": "No record found"
        };
        res.send(json).status(404);
        return;
    }

        var json = {
            "status":  res.statusCode,
            "data": dataArray,
            "message": "success"
        };
        res.json(json);
    }catch(e){
        console.log('Error: => ',e);
        res.sendStatus(500);
    }
});

router.get('/getPropertiesByID', async (req, res, next) => {
    try{
        var queryParameters = req.query;
        let results = await db.getPropertyByID(queryParameters.city_id, queryParameters.neighborhood_id);
        var dataArray = [];
        for(var i = 0; i < results.length; i++){
            var data = {
                "id": results[i]['id'],
                "propert_title": results[i]['propert_title'],
                "property_address": results[i]['property_address'],
                "property_gender_type": results[i]['property_gender_type'],
                "starting_price": results[i]['starting_price'],
                "property_image": results[i]['property_image'],
                "property_location": results[i]['property_location'],
                "property_neighbour": results[i]['property_neighbour']
            };
            dataArray.push(data);
      }


      if(dataArray.length < 1) {
        var data = [];
        var json = {
            "status":  res.statusCode,
            "data": data,
            "message": "No record found"
        };
        res.send(json).status(404);
        return;
    }

        var json = {
            "status":  res.statusCode,
            "data": dataArray,
            "message": "success"
        };
        res.json(json);
    }catch(e){
        console.log('Error: => ',e);
        res.sendStatus(500);
    }
});

router.get('/property', async (req, res, next) => {
    try{
        var queryParameters = req.query;
        let results = await db.property(queryParameters.id);
        if(!results) {
            var data = {};
            var json = {
                "status":  res.statusCode,
                "data": data,
                "message": "No record found"
            };
            res.send(json).status(404);
            return;
        }

        var data = {
            "id": results['id'],
            "propert_title": results['propert_title'],
            "property_address": results['property_address'],
            "property_gender_type": results['property_gender_type'],
            "starting_price": results['starting_price'],
            "property_image": results['property_image'],
            "property_location": results['property_location'],
            "property_neighbour": results['property_neighbour']
        };
        var json = {
            "status":  res.statusCode,
            "data": data,
            "message": "success"
        };
        res.json(json);
    }catch(e){
        console.log('Error: => ',e);
        res.sendStatus(500);
    }
});

router.get('/getCities', async (req, res, next) => {
    try{
        let results = await db.allCities();
        if(!results) {
            var data = {};
            var json = {
                "status":  res.statusCode,
                "data": data,
                "message": "No record found"
            };
            res.send(json).status(404);
            return;
        }
        var dataArray = [];
        for(var i = 0; i < results.length; i++){
            var data = {
                "id": results[i]['id'],
                "city_name": results[i]['city_name'],
            };
            dataArray.push(data);
      }

      if(dataArray.length < 1) {
        var data = [];
        var json = {
            "status":  res.statusCode,
            "data": data,
            "message": "No record found"
        };
        res.send(json).status(404);
        return;
    }

        var json = {
            "status":  res.statusCode,
            "data": dataArray,
            "message": "success"
        };
        res.json(json);
    }catch(e){
        console.log('Error: => ',e);
        res.sendStatus(500);
    }
});

router.get('/getNeighborhood', async (req, res, next) => {
    try{
        var queryParameters = req.query;
        let results = await db.neighborhood(queryParameters.id);
        
        var dataArray = [];
        for(var i = 0; i < results.length; i++){
            var data = {
                "id": results[i]['id'],
                "city_id": results[i]['city_id'],
                "neghbourhood_name": results[i]['neghbourhood_name'],
            };
            dataArray.push(data);
      }

      if(dataArray.length < 1) {
        var data = [];
        var json = {
            "status":  res.statusCode,
            "data": data,
            "message": "No record found"
        };
        res.send(json).status(404);
        return;
    }

        var json = {
            "status":  res.statusCode,
            "data": dataArray,
            "message": "success"
        };
        res.json(json);
    }catch(e){
        console.log('Error: => ',e);
        res.sendStatus(500);
    }
});

router.get('/getPropertyDetails', async (req, res, next) => {
    try{
        var queryParameters = req.query;
        let results = await db.propert_details(queryParameters.id);
        
        if(!results) {
            var data = {};
            var json = {
                "status":  res.statusCode,
                "data": data,
                "message": "No record found"
            };
            res.send(json).status(404);
            return;
        }


        let imagesResults = await db.propert_images(queryParameters.id);
        var dataArray = [];
        for(var i = 0; i < imagesResults.length; i++){
            var data = {
                "id": imagesResults[i]['id'],
                "property_id": imagesResults[i]['property_id'],
                "images": imagesResults[i]['property_images'],
            };
            dataArray.push(data);
      }

      let featuresResults = await db.property_features(queryParameters.id);
        var featuresArray = [];
        for(var i = 0; i < featuresResults.length; i++){
            var data = {
                "id": featuresResults[i]['id'],
                "property_id": featuresResults[i]['property_id'],
                "property_features": featuresResults[i]['property_features'],
            };
            featuresArray.push(data);
      }

      let roomtypeResults = await db.property_features(queryParameters.id);
        var roomsArray = [];
        for(var i = 0; i < roomtypeResults.length; i++){
            var data = {
                "id": roomtypeResults[i]['id'],
                "property_id": roomtypeResults[i]['property_id'],
                "room_name": roomtypeResults[i]['room_name'],
                "room_price": roomtypeResults[i]['room_price'],
                "room_details": roomtypeResults[i]['room_details'],
            };
            roomsArray.push(data);
      }


        var data = {
            "id": results['id'],
            "property_id": results['property_id'],
            "property_title": results['property_title'],
            "property_address": results['property_address'],
            "property_gender_type": results['property_gender_type'],
            "property_whats_inc": results['property_whats_inc'],
            "property_loc": results['property_loc'],
            "property_neighbour": results['property_neighbour'],
            "property_images": dataArray,
            "property_features": featuresArray,
            "property_rooms": roomsArray
        };


        var json = {
            "status":  res.statusCode,
            "data": data,
            "message": "success"
        };
        res.json(json);
    }catch(e){
        console.log('Error: => ',e);
        res.sendStatus(500);
    }
});



router.post('/registerUser', async (req, res) => {
    let results = await db.register_user(req.body.name, req.body.phone, req.body.email);
    const { error } = validateUser(req.body);
    if(error) {
        var json = {
            "status":  400,
            "data": {},
            "message": error.details[0].message
        };
        return res.status(400).send(json);
    }

    var data = {
        "user_id": results['insertId'],
        "name": req.body.name,
        "phone": req.body.phone,
        "email": req.body.email,
    };


    var json = {
        "status":  res.statusCode,
        "data": data,
        "message": "Registration successfull"
    };

    res.send(json);
  });

  router.post('/bookVisit', async (req, res) => {
    let results = await db.room_booking(req.body.user_id, req.body.property_id, req.body.name, req.body.phone, req.body.email, req.body.date_time);
    const { error } = validateBooking(req.body);
    if(error) {
        var json = {
            "status":  400,
            "data": {},
            "message": error.details[0].message
        };
        return res.status(400).send(json);
    }

    var data = {
        "user_id": req.body.user_id,
        "property_id": req.body.property_id,
        "name": req.body.name,
        "phone": req.body.phone,
        "email": req.body.email,
        "date_time": req.body.datetime,
    };


    var json = {
        "status":  res.statusCode,
        "data": data,
        "message": "booking successfull"
    };

    res.send(json);
  });

module.exports = router;