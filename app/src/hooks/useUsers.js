import User from "classes/User";
import config from "../config";
import { useCallback, useEffect, useState } from "react";

export default function useUsers(sort = 'login', defaultPage = 1, pageSize = 10) {
	const [users, setUsers] = useState([]);
	const [page, setPage] = useState(defaultPage);
	const [nbPages, setNbPages] = useState(0);


	const updateUser = useCallback((updatedUser) => {
		setUsers((prevUsers) => prevUsers.map((user) => (user._id === updatedUser._id ? updatedUser : user)));
	}, [])

	const deleteUser = useCallback((userId) => {
		setUsers((prevUsers) => prevUsers.filter((user) => user._id !== userId));
	}, [])

	useEffect(() => {
		fetchUsers();
		// eslint-disable-next-line
	}, [page]);

	const fetchUsers = async () => {
		const response = await fetch(`${config.apiUrl}/users?sort=${sort}&page=${page}&pageSize=${pageSize}`,{
			credentials: 'include'
		});
		const data = await response.json();
		if (response.ok)
		{
			setUsers(data.map(u => new User(u, updateUser, deleteUser)));
			setNbPages(response.headers.get('X-Page-Count'));
		}
	}

	const nextPage = () => {
		setPage(page + 1);
	}

	const prevPage = () => {
		setPage(page - 1);
	}

	const setPageNumber = (number) => {
		setPage(number);
	}

	const addUser = async (login) => {
		const response = await fetch(`${config.apiUrl}/users`, {
			method: 'POST',
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({login}),
		});
		if (response.status === 201) {
			await fetchUsers()
		}
		return response;
	}

	const userSearch = async (login) => {
		const response = await fetch(`${config.apiUrl}/users?sort=${sort}&page=${page}&pageSize=${pageSize}&login=${login}`,{
			credentials: 'include'
		});
		const data = await response.json();
		if (response.ok)
		{
			setUsers(data);
			setNbPages(response.headers.get('X-Page-Count'));
		}
	}

	return {
		users,
		nextPage,
		prevPage,
		addUser,
		setPageNumber,
		userSearch,
		nbPages,
		page
	};
}