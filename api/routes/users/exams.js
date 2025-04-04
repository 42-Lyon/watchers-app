const express = require('express');
const Exams = require('../../models/Exams');

const router = new express.Router();

router.get('/', async (req, res) => {
	const exams = await Exams.find({ watchers: req.user._id }).populate('watchers').sort({ start_at: -1 });
	res.status(200).send(exams);
});


module.exports = router;