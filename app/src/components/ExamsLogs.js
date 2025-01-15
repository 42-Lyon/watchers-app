import { Flex, Heading } from "@chakra-ui/react";
import { TimelineRoot } from "./ui/timeline";
import useLogs from "../hooks/useLogs";
import ItemLog from "./ItemLog";

export default function ExamsLogs({ exam, ...props }) {

	const {logs} = useLogs({exam: exam._id}, 1, 20);
	console.log(logs);

	return (
	<Flex flexDir='column' gap='8px' {...props}>
		<Heading>Logs</Heading>
		<TimelineRoot>
			{logs && logs.map(log => (
				<ItemLog log={log} key={log._id} />
			))}
		</TimelineRoot>
	</Flex>
	)
}