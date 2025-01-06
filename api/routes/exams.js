const isStaff = require("../middlewares/isStaff");
const Exams = require("../models/Exams");
const express = require("express");

const router = new express.Router();

router.get('/', async (req, res) => {
	const exams = await Exams.find({
		start_at: { $gt: new Date(), $lt: new Date(new Date().getTime() + 60 * 60 * 24 * 60 * 1000) }
	}).sort({ start_at: 1 });
	return res.status(200).send(exams);
});

router.post('/', isStaff, async (req, res) => {
	const { start_at, duration, authorized_groups, nb_slots } = req.body;
	try {
		const exam = new Exams({
			start_at,
			duration,
			authorized_groups,
			nb_slots
		});
		await exam.save();
		return res.status(201).send(exam);
	}
	catch {
		return res.status(400).send();
	}
});

router.delete('/:id', isStaff, async (req, res) => {
	try {
		const exam = await Exams.findByIdAndDelete(req.params.id);
		if (!exam) {
			return res.status(404).send();
		}
		return res.status(200).send(exam);
	}
	catch {
		return res.status(400).send();
	}
});

module.exports = router;