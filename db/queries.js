const pool = require('./pool');


async function getAllUsernames() {
    const { rows } = await pool.query("SElECT * FROM usernames");
    return rows;
}

async function insertUsername(username, quantity, price) {
    await pool.query("INSERT INTO usernames (username, quantity, price) VALUES($1, $2, $3)", [username, quantity, price] )

}


module.exports = {
    getAllUsernames, insertUsername
}


