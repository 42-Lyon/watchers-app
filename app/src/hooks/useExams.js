import Exam from "classes/Exam";
import config from "../config";
import { useCallback, useEffect, useState } from "react";

export default function useExams(defaultOptions, page = 0, pageSize = 10) {
	const [exams, setExams] = useState([]);
	const [options, setOptions] = useState(defaultOptions);
	const [loading, setLoading] = useState(true);
	const [pageCount, setPageCount] = useState(0);
	const [currentPage, setCurrentPage] = useState(page);

	const updateExam = useCallback((updatedExam) => {
		setExams((prevExams) => prevExams.map((exam) => (exam._id === updatedExam._id ? updatedExam : exam)).filter((exam) => {
				for (const key in options.filter) {
					if (exam[key] !== options.filter[key]) return false;
				}
				return true;
			}));
	}, [options])

	const deleteExam = useCallback((examId) => {
		setExams((prevExams) => prevExams.filter((exam) => exam._id !== examId));
	}, [])

	const fetchPage = async (page) => {
		setLoading(true);
		const queryOptions = {...options, page, page_size: pageSize};
		for (const key in queryOptions.filter) {
			queryOptions[`filter[${key}]`] = queryOptions.filter[key];
		}
		delete queryOptions.filter;
		const query = new URLSearchParams(queryOptions).toString();
		const response = await fetch(`${config.apiUrl}/exams?${query}`, {
			credentials: 'include',
		});
		if (response.ok) {
			setPageCount(response.headers.get('X-Page-Count'));
		}
		setLoading(false);
		return response;
	}

	const fetchExams = async () => {
		const response = await fetchPage(currentPage);
		if (response.ok) {
			setExams((await response.json()).map(e => new Exam(e, updateExam, deleteExam)).sort((a, b) => a.start_at - b.start_at));
		}
	}

	const setQueryOption = (newOptions) => {
		setOptions((prevOptions) => ({ ...prevOptions, ...newOptions }));
		fetchExams();
	}

	const create = async (exam) => {
		const response = await fetch(`${config.apiUrl}/exams`, {
			method: 'POST',
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(exam),
		});
		if (response.ok) {
			const newExam = new Exam(await response.json(), updateExam, deleteExam);
			setExams([...exams, newExam].sort((a, b) => a.start_at - b.start_at));
		}
		return response;
	};

	const loadNextPage = async () => {
		if (currentPage <= pageCount) {
			setCurrentPage((prevPage) => prevPage + 1);
			const response = await fetchPage(currentPage + 1);
			if (!response.ok)
				return;
			const newExams = (await response.json()).map(e => new Exam(e, updateExam, deleteExam));
			setExams((prevExams) => [...prevExams, ...newExams].sort((a, b) => a.start_at - b.start_at));
		}
	}

	useEffect(() => {
		fetchExams();
	}, []);

	
	return { exams, loading, setQueryOption, create, loadNextPage, currentPage, pageCount };
}