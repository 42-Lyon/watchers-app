const express = require('express');

const router = new express.Router();

router.get('/', async (req, res) => {
	await req.exam.populate('watchers');
	res.status(201).send(req.exam.watchers);
});

module.exports = router;