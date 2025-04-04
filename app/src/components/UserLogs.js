import { Center, EmptyState, Flex, Spinner, TimelineRoot, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import ItemLog from "./ItemLog";
import { LuLogs } from "react-icons/lu";

export default function UserLogs({ user }) {

	const [loading, setLoading] = useState(true);

	const fetchLogs = async () => {
		setLoading(true);
		await user.fetchLogs();
		setLoading(false);
	}

	useEffect(() => {
		fetchLogs();
		// eslint-disable-next-line
	}, []);

	if (!user) return null;

	if (loading)
		return <Center
			height={'full'}
			width={'full'}
			gap={'2'}
		> <Spinner />Loading... </Center>


	if (!user.logs.length)
		return <EmptyState.Root size={'sm'} height={'full'} display={'flex'} flexDirection={'column'} justifyContent={'center'} alignItems={'center'}>
	<EmptyState.Content>
	  <EmptyState.Indicator>
		<LuLogs />
	  </EmptyState.Indicator>
	  <VStack textAlign="center">
		<EmptyState.Title>No logs yet</EmptyState.Title>
		<EmptyState.Description>
		  No logs have been recorded yet.
		</EmptyState.Description>
	  </VStack>
	</EmptyState.Content>
  </EmptyState.Root>
	
	return <Flex
		// height={'100%'}
		// overflowY={'auto'}
	>
		<TimelineRoot
			overflow={'auto'}
			width={'full'}
			height={'full'}
		>
			{user.logs.length > 0 && user.logs.map(log => (
				<ItemLog log={log} key={log._id} />
			))}
		</TimelineRoot>
	</Flex>

}