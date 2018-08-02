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
        
        new Restaurant (
            //THIS IS THE TEMPLATE WE WOULD USE BUT WE'RE JUST GOING TO POPULATE IT AUTOMATICALLY HERE
            // {
            //     name: name,
            //     price_range: price_range,
            //     menu: menu, 
            //     is_closed: is_closed,
            //     url: url, 
            //     price: price, 
            //     hours: hours, 
            //     health_score: health_score,
            //     more_info: more_info
            // }
            {
                "id": "WavvLdfdP6g8aZTtbBQHTw",
                "name": "Gary Danko",
                "price_range": "$11-30",
                "menu": "https://www.yelp.com/menu/gary-danko-san-francisco",
                "is_closed": false,
                "url": "https://www.yelp.com/biz/gary-danko-san-francisco",
                "price": "$$",
                "health_score": 'A',
                "more_info": [
                  {"property":"delivery", "value": "No"},
                  {"property":"take_out", "value": "Yes"},
                  {"property":"credit_cards", "value": "Yes"},
                  {"property":"parking", "value": "Valet, Garage, Street, Private Lot"},
                  {"property":"bike_parking", "value": "Yes"},
                  {"property":"good_for_kids", "value": "Yes"},
                  {"property":"good_for_groups", "value": "Yes"},
                  {"property":"wi_fi", "value": "Free"}
                ],
                "hours":
                  {
                    "hours_type": "REGULAR",
                    "open": [
                      {
                        "is_overnight": false,
                        "end": "2200",
                        "day": 0,
                        "start": "1730"
                      },
                      {
                        "is_overnight": false,
                        "end": "2200",
                        "day": 1,
                        "start": "1730"
                      },
                      {
                        "is_overnight": false,
                        "end": "2200",
                        "day": 2,
                        "start": "1730"
                      },
                      {
                        "is_overnight": false,
                        "end": "2200",
                        "day": 3,
                        "start": "1730"
                      },
                      {
                        "is_overnight": false,
                        "end": "2200",
                        "day": 4,
                        "start": "1730"
                      },
                      {
                        "is_overnight": false,
                        "end": "2200",
                        "day": 5,
                        "start": "1730"
                      },
                      {
                        "is_overnight": false,
                        "end": "2200",
                        "day": 6,
                        "start": "1730"
                      }
                    ],
                    "is_open_now": false
                  },
            
              }
            ).save((err, newRestaurant) => {
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