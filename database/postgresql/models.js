const Sequelize = require('sequelize');
const connection = require('./index.js');

const RestaurantData = connection.define('list', {
  name: {
    type: Sequelize.STRING
  },
  menu: Sequelize.STRING,
  is_closed: Sequelize.BOOLEAN,
  url: Sequelize.STRING,
  price: Sequelize.STRING,
  health_score: Sequelize.NUMBER,
});

  // more_info: [

  // ],
  // hours: {
  //   hours_type: Sequelize.STRING,
  //   open: [{
  //     is_overnight: Sequelize.BOOLEAN,
  //     end: Sequelize.NUMBER,
  //     day: Sequelize.NUMBER,
  //     start: Sequelize.NUMBER
  //   }],
  //   is_open_now: Sequelize.BOOLEAN
  // }

connection.sync({
    force: false
  })
  .then(() => {
    console.log('Server is now connected!')
  })
  .catch(err => console.log(err));

module.exports = { RestaurantData };