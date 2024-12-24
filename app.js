const express = require("express");
const app = express();
const usersRouter = require('./routes/usersRouter');
const path = require('node:path');
const { createUsernamePost } = require("./controllers/usersController");
const dbClient = require("./db/pool");

const assetsPath = path.join(__dirname, "public");
app.use(express.static(assetsPath));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs')
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// app.get('/', (req, res) => {

//   res.send('HOME')
// })

const links = [
  { href: "/", text: "Home" },
  { href: "/about", text: "About" },
  { href: "/category", text: "Category"},
  { href: "/items", text: "Items"},
  // { href: "/new", text: "Create User"},
];

app.get("/", async(req, res) => {
  res.render("index", { links: links});
});

app.get("/", async(req, res) => {
  const searchQuery = req.query.search;
  const result = await dbClient.query('SELECT * FROM usernames WHERE username ILIKE $1', [`%${searchQuery}%`]);
  const usernames = result.rows;
  res.render("index", { links: links}, {usernames});
});

app.get("/about", (req, res) => {
  res.render("about", { links: links});
});

app.get("/category", (req, res) => {
  res.render("category", { links: links});
});

app.get("/items", (req, res) => {
  res.render("items", { links: links});
});



// app.get("/new", (req, res) => {
//   res.render("createUser", { links: links});
// });

// usersRouter.get("/", (req, res) => {
//   res.render("index")
  
// });

// // usersRouter.post("/new", (req, res) => {
//   usernames.push(username);
//   console.log(res.redirect("/"));
// })



app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(usersRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`My first Express app - listening on port ${PORT}!`);
});
