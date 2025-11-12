const express = require("express");
const api42 = require("../api42");
const isStaff = require("../middlewares/isStaff");
const Users = require("../models/Users");
const router = new express.Router();

router.get('/users', isStaff, async (req, res) => {
	return res.status(501);
	try {
		for (const user of await Users.find({})) {
			console.log(user);
			const watches = api42.fetch(`/v2/users/:user_id/transactions?filter[reason]=Surveillance d'Exam`, { pageSize: 100 });
			console.log(watches.length);

		}
	}
	catch (e) {
		console.error(e);
		return res.status(500);
	}

	return res.status(200).redirect(process.env.FRONTEND_URL);

});

module.exports = router;