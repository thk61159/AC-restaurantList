const restaurantJson = require('../../restaurant.json');
const restaurantList = restaurantJson.results
const mongoose = require('mongoose');
const List = require('../list'); // 載入 todo model
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}
restaurantList.forEach((element) => console.log(element.name));
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', () => {
  console.log('mongodb error!');
});
db.once('open', () => {
  console.log('mongodb connected!');
  restaurantList.forEach(element => {
    return List.create(
      {
        name: element.name,
        name_en: element.name_en,
        category: element.category,
        image: element.image,
        location: element.location,
        phone: element.phone,
        google_map: element.google_map,
        rating: element.rating,
        description: element.description
      }
    );
  });
  console.log('done');
});

