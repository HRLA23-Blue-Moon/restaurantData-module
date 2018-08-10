const faker = require('faker');
const fs = require('fs');

fs.writeFile('data.csv', 'name, menu, is_closed, url, price, health_score', (err) => {
  if (err) throw err;
  console.log('Header created!');
  let recurseSeeding = (count = 0) => {
    if (count % 1000000 === 0) console.log('creating:', count + 1)
    if (count === 10000000) return;
    let name = faker.name.title();
    let menu = faker.internet.url();
    let is_closed = faker.random.boolean();
    let url = faker.internet.url();
    let price = faker.random.number({min: 1, max: 4});
    let health_score = faker.random.number({min: 1, max: 100});
    // let entry = '\n' + name + ', ' + menu + ', ' + is_closed + ', ' + url + ', ' + price + ', ' + health_score;
    let entry = '\n' + name + ', ' + menu + ', ' + is_closed + ', ' + url + ', ' + price + ', ' + health_score;
    fs.appendFile('data.csv', entry, (err) => {
      if (err) throw err;
      recurseSeeding(count + 1)
    });
  }
  recurseSeeding();
});