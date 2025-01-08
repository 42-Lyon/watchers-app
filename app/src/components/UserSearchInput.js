import { Flex, Input, Portal, Stack } from "@chakra-ui/react";
import { useEffect, useState } from "react";

export default function UserSearchInput({...props}) {
	const [search, setSearch] = useState('');

	const [users, setUsers] = useState([]);

	const fetchUsers = async () => {
		const res = await fetch(`/api/users?login=${search}`);
		if (res.ok) {
			const data = await res.json();
			setUsers(data);
		}
	}

	useEffect(() => {
		fetchUsers();
		// eslint-disable-next-line
	}, [search]);

	return (
		<Flex
			position='relative'
			width='100%'
		>
			<Input
				placeholder='Search for a user...'
				value={search}
				onChange={(e) => setSearch(e.target.value)}
			/>

			<Stack
				position='absolute'
				bottom={0}
				w='100%'
				height='200px'
				background='red'
				zIndex='100'
			>
				{users.map(user => (
					<Flex key={user.login} padding='8px' borderBottom='1px solid #ddd'>
						{user.login}
					</Flex>
				))}
			</Stack>

		</Flex>
	)
}