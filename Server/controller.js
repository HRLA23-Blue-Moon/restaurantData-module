const db = require('../Database/mongodb');
const { Restaurant } = require('../Database/mongodb/models')
const testData = require('../Database/mongodb/testData/data');

const controller = {
    get: (req,res) =>{
        const { restaurant } = req.query;
        Restaurant.find({
            name: restaurant,
        }, (err, rest) => {
            if (err) {console.error(err)}
            else { res.status(200).send(rest)}
        })
    },
    post: (req,res) => {

        const {
            name, price_range, menu, is_closed,
            url, price, hours, health_score, more_info} = req.query;
        
        new Restaurant ({
            name: name,
            price_range: price_range,
            menu: menu, 
            is_closed: is_closed,
            url: url, 
            price: price, 
            hours: hours, 
            health_score: health_score,
            more_info: more_info
        }).save((err, newRestaurant) => {
            if (err){console.error(err)}
            else {res.status(201).send(newRestaurant)}
        });
    },
    delete: (req,res) =>{
        const { restaurant } = req.query;
        Restaurant.remove({
            name: restaurant,
        }, (err, deleted) => {
            if (err){console.error(err)}
            else{res.status(202).send('deleted')}
        });
    },
};

module.exports = controller;