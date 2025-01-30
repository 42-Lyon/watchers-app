import { useMe } from "../context/useMe";
import LeftNavTemplate from "../templates/LeftNavTemplate";
import { HStack, Heading, Stack, Table } from "@chakra-ui/react"
import {
  PaginationItems,
  PaginationNextTrigger,
  PaginationPrevTrigger,
  PaginationRoot,
} from "../components/ui/pagination"
import useUsers from "../hooks/useUsers";
import { FaUser, FaUserTie } from "react-icons/fa6";
import GroupBadge from "../components/GroupBadge";
import { Avatar } from "../components/ui/avatar";

export default function Exams() {

	const { me } = useMe();

	const {users, nbPages, setPageNumber, page} = useUsers('-nb_watch -last_watch login', 1, 10);

	if (me)
	return (
		<LeftNavTemplate me={me}>
			<Stack width="full" height='100%' gap="5">
				<Heading size="xl">Users</Heading>
				<Table.Root size="sm" variant="outline" striped height='100%'>
					<Table.Header>
					<Table.Row>
						<Table.ColumnHeader><FaUser/></Table.ColumnHeader>
						<Table.ColumnHeader>Login</Table.ColumnHeader>
						<Table.ColumnHeader>Groups</Table.ColumnHeader>
						<Table.ColumnHeader textAlign="end">Actions</Table.ColumnHeader>
					</Table.Row>
					</Table.Header>
					<Table.Body>
					{users.map((user) => (
						<Table.Row key={user._id}>
						<Table.Cell>
							<Avatar
								size="sm"
								name={`${user.firstname} ${user.lastname}`}
								src={user.image_url}
							/>
						</Table.Cell>
						<Table.Cell>{user.login}</Table.Cell>
						<Table.Cell>{user.groups.map((group) => <GroupBadge key={user._id+group} group={group} mr='4px'/>)}</Table.Cell>
						<Table.Cell textAlign="end"><FaUserTie/></Table.Cell>
						</Table.Row>
					))}
					</Table.Body>
				</Table.Root>

				<PaginationRoot count={users.length * 5} pageSize={5} page={1}>
					<HStack wrap="wrap">
					<PaginationPrevTrigger />
					<PaginationItems />
					<PaginationNextTrigger />
					</HStack>
				</PaginationRoot>
			</Stack>
		</LeftNavTemplate>
	);
}