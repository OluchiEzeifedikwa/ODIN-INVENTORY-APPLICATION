
const db = require("../db/queries");

async function getUsernames(req, res) {
  const usernames = await db.getAllUsernames();
  res.render("username", {usernames});
  // console.log(usernames)
  // console.log("Usernames: ", usernames);
  // res.send("Usernames: " + usernames.map(user => user.username).join(", "));
}

async function createUsernameGet(req, res) {
  // Render the form
  res.render('createUser');
}

async function createUsernamePost(req, res) {
  // const { username, quantity, price} = req.body;
  const userInput = req.body;
  await db.insertUsername(userInput);
  res.render('card', { userInput });
  // await db.insertUsername(username, quantity, price);
  // res.redirect("/order");
  
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
