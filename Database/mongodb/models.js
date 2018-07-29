const db = require('./index');
const mongoose = require('mongoose');
const url = require('mongoose-type-url');


const restaurantSchema = mongoose.Schema({
    //to be determined by data from server
    alias: String,
    name: String,
    price_range: String,
    menu: mongoose.SchemaTypes.Url,
    is_closed: Boolean,
    url: mongoose.SchemaTypes.Url,
    price: String,
    health_score: String,
    more_info: [
        {property: String, value: String},
      ],
    hours: {
        hours_type: String,
        open: [{
            is_overnight: Boolean,
            end: Number,
            day: Number,
            start: Number
          }],
        is_open_now: Boolean
      },
  })

const Restaurant = mongoose.model('Restaurant', restaurantSchema);

module.exports = { Restaurant };
