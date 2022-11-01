//this is the access point for all things database related!
const db = require("./db");
const User = require("./models/User");
const Movie = require("./models/Movie");
const Tv = require("./models/Tv");
const Book = require("./models/Book");
const Review = require("./models/Review");
const User_Movie = require("./models/userMovie");
const User_Book = require("./models/userBook");
const User_Tv = require("./models/userTv");
const Connection = require("./models/Connection");

//One-to-many

// Review
User.hasMany(Review);
Review.belongsTo(User);

Book.hasMany(Review);
Review.belongsTo(Book);

Tv.hasMany(Review);
Review.belongsTo(Tv);

Movie.hasMany(Review);
Review.belongsTo(Movie);

//Many-to-many Relationships
User.belongsToMany(User, { through: Connection, as: "friend" });

User.belongsToMany(Movie, { through: User_Movie });
Movie.belongsToMany(User, { through: User_Movie });

User.belongsToMany(Book, { through: User_Book });
Book.belongsToMany(User, { through: User_Book });

User.belongsToMany(Tv, { through: User_Tv });
Tv.belongsToMany(User, { through: User_Tv });

module.exports = {
  db,
  models: {
    User,
    Movie,
    Tv,
    Book,
    Review,
    User_Movie,
    User_Book,
    User_Tv,
    Connection,
  },
};
