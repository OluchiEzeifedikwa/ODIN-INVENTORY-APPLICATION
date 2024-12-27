
const db = require("../db/queries");

async function getUsernames(req, res) {
  const usernames = await db.getAllUsernames();
  console.log(usernames);
  res.render('username', {usernames: usernames});
  // res.send("Usernames: " + usernames.map(user => user.username).join(", "));
}

async function createUsernameGet(req, res) {
  // Render the form
  res.render('createUser');
}

async function createUsernamePost(req, res) {
  const { username, quantity, price} = req.body;
  // const userInput = req.body;
  console.log(quantity);
  await db.insertUsername(username, quantity, price);
  // res.render('card', {username, quantity, price});
  // await db.insertUsername(username, quantity, price);
  res.redirect("/order");
  
}

exports.usersDeletePost = async (req, res) => {
  try{
    await db.deleteUser(req.params.id);
    res.redirect("/");
} catch(error) {
  res.status(404).send(error.message);
}
}

module.exports = { getUsernames, createUsernameGet, createUsernamePost };
