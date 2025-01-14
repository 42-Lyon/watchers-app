import config from "../config"
import { useEffect, useState } from "react";

export default function useLogs(eventTypes, defaultPage = 1, pageSize = 10) {

	const [logs, setLogs] = useState([]);

	const fetchLogs = async () => {
		const response = await fetch(`${config.apiUrl}/logs?query[event_types]=${eventTypes}&page=${defaultPage}&pageSize=${pageSize}`, {
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