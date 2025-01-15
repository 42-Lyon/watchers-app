import config from "../config"
import { useEffect, useState } from "react";

export default function useLogs(query, defaultPage = 1, pageSize = 10) {

	const [logs, setLogs] = useState([]);

	const fetchLogs = async () => {
		let queryString = '';
		for (const key in query) {
			queryString += `&query[${key}]=${query[key]}`;
		}
		const response = await fetch(`${config.apiUrl}/logs?page=${defaultPage}&pageSize=${pageSize}` + queryString, {
			credentials: 'include'
		});
		if (response.ok)
			setLogs(await response.json());
	}

	useEffect(() => {
		fetchLogs();
		// eslint-disable-next-line
	}, []);

	return { logs };
}