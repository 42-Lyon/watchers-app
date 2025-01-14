import useLogs from "../hooks/useLogs";
import { Card, Flex } from "@chakra-ui/react";
import { TimelineConnector, TimelineContent, TimelineDescription, TimelineItem, TimelineRoot, TimelineTitle } from "./ui/timeline";
import { FaBoxArchive } from "react-icons/fa6";
import { Tag } from "./ui/tag";
import { Avatar } from "./ui/avatar";

export default function LastArchivedTimeLine({ ...props }) {

	const {logs} = useLogs('ExamArchiveLogs', 1, 5);

	console.log(logs);

	return (
		<Card.Root {...props} w='100%' h='100%'>
			<Card.Body display='flex' flexDir='column' overflow='auto'>
				<Card.Title flex={2}>Last archived exams</Card.Title>
				<TimelineRoot flex={10} justifyContent='center'>


					{logs && logs.map(log => (
						<TimelineItem key={log._id}>
							<TimelineConnector bg='fg.sucess'>
								<Avatar
									size="full"
									name={log.user ? log.user.login : 'null'}
									src={log.user ? log.user.image_url : 'null'}
								/>
							</TimelineConnector>
							<TimelineContent>
								<TimelineTitle>
									Exam  <b>{log.exam ? new Date(log.exam_date).toLocaleDateString('fr-FR') : 'null'}</b> by <Tag>@{log.user ? log.user.login : 'null'}</Tag>
								</TimelineTitle>
								<TimelineDescription>{new Date(log.created_at).toLocaleString('fr-FR')}</TimelineDescription>
							</TimelineContent>
						</TimelineItem>
					))}

				</TimelineRoot>
			</Card.Body>
		</Card.Root>
	)
}