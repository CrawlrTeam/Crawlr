const mongoose = require('mongoose');

mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost:27017');

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('connected');
});

const userSchema = mongoose.Schema({
  local: {
    username: String,
    password: String
  },
  facebook: {
    id: String,
    token: String,
    name: String
  }
});

const User = mongoose.model('User', userSchema);

const crawlSchema = mongoose.Schema({
  name: String,
  city: String,
  description: String,
  Date: String,
  bars: Array,
  rating: Number,
  creator: String,
  attendies: Array,
  directions: String
})

const Crawl = mongoose.model('Crawl', crawlSchema);

const saveUser = function(data) {
  var newUser = new User(data);
  newUser.save(function (err) {
    if (err) {
      console.error(err);
    }
  });
};

const saveCrawl = function(data) {
  var newCrawl = {
    name: data.name,
    description: data.description,
    city: data.city,
    bars: []
  };
  for (var i = 0; i < data.bars.length; i++) {
    newCrawl.bars.push({name: data.bars[i].name, rating: data.bars[i].rating, photo: data.bars[i].photos[0].photo_reference, formatted_address: data.bars[i].formatted_address});
  }

  newCrawl = new Crawl(newCrawl);
  newCrawl.save(function (err) {
    if (err) {
      console.log(err);
    }
  });
};

exports.getCrawlsInCity = (location, cb) => {
  console.log(location);
  Crawl.find({city: {$regex: new RegExp(location, "i")}}, (err, crawls) => {
    if (err) {
      console.log(err);
    };
    cb(crawls);
  });
};

exports.getAll = cb => {
  Crawl.find({}, (err, crawls) => {
    if (err) return console.log(err);
    cb(crawls);
  });
};

exports.deleteDatabaseData = () => {
  Crawl.remove().exec();
};

module.exports.saveUser = saveUser;
module.exports.saveCrawl = saveCrawl;
module.exports.db = db;
module.exports.User = User;
module.exports.Crawl = Crawl;