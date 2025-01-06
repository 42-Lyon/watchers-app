const { Api42 } = require("@ibertran/api42");

const api42 = new Api42(process.env.CLIENT_ID, process.env.CLIENT_SECRET, process.env.CALLBACK_URL);
api42.setDebugMode(true);
module.exports = api42;