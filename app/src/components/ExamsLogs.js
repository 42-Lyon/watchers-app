import { Flex, Heading } from "@chakra-ui/react";
import { TimelineRoot } from "./ui/timeline";
import useLogs from "../hooks/useLogs";
import ExamItemLog from "./ExamItemLog";

export default function ExamsLogs({ exam, ...props }) {

	const {logs} = useLogs({exam: exam._id}, 1, 20);

	return (
	<Flex flexDir='column' gap='8px' {...props}>
		<Heading>Logs</Heading>
		<TimelineRoot>
			{logs && logs.map(log => (
				<ExamItemLog log={log} key={log._id} />
			))}
		</TimelineRoot>
	</Flex>
	)
}