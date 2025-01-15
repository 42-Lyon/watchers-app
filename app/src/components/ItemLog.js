import { Text } from "@chakra-ui/react";
import { TimelineConnector, TimelineContent, TimelineDescription, TimelineItem, TimelineTitle } from "./ui/timeline";
import { FaArrowLeft, FaArrowRight, FaBoxArchive, FaMinus, FaPlus } from "react-icons/fa6";
import { Tag } from "./ui/tag";

const getIcon = (event) => {
	if (event === 'ExamArchiveLogs') return <FaBoxArchive />
	if (event === 'ExamRegisterLogs' || event === 'ExamForceRegisterLogs') return <FaArrowRight />
	if (event === 'ExamUnregisterLogs' || event === 'ExamForceUnregisterLogs' ) return <FaArrowLeft />
	if (event === 'ExamCreationLogs') return <FaPlus/>
	if (event === 'ExamDeletionLogs') return <FaMinus />
}

const getColor = (event) => {
	if (event === 'ExamArchiveLogs') return 'green.500'
	if (event === 'ExamRegisterLogs' || event === 'ExamForceRegisterLogs') return 'blue.500'
	if (event === 'ExamUnregisterLogs' || event === 'ExamForceUnregisterLogs' ) return 'red.500'
	if (event === 'ExamCreationLogs') return 'green.500'
	if (event === 'ExamDeletionLogs') return 'red.500'
}

const getTitle = (event) => {
	if (event === 'ExamArchiveLogs') return 'archived the exam'
	if (event === 'ExamRegisterLogs') return 'registered for the exam'
	if (event === 'ExamUnregisterLogs') return 'unregistered from the exam'
	if (event === 'ExamCreationLogs') return 'created a new exam'
	if (event === 'ExamDeletionLogs') return 'deleted the exam'
	if (event === 'ExamForceRegisterLogs') return 'force-registered a user for the exam'
	if (event === 'ExamForceUnregisterLogs') return 'force-unregistered a user from the exam'
}

export default function ItemLog({ log, ...props }) {
	return (
		<TimelineItem {...props}>
			<TimelineConnector
				bg={getColor(log.__t)}
			>
				{getIcon(log.__t)}
			</TimelineConnector>
			<TimelineContent>
				<TimelineTitle>
					<Tag>@{log.user.login}</Tag> {getTitle(log.__t)}
				</TimelineTitle>
				<TimelineDescription>{new Date(log.created_at).toLocaleString('fr-FR')}</TimelineDescription>
				{
					log.__t === 'ExamForceRegisterLogs' && 
					<Text>
						<Tag as='span'>@{log.user.login}</Tag> has been force-registered for the exam
					</Text>
				}
				{
					log.__t === 'ExamForceUnregisterLogs' && 
					<Text>
						<Tag as='span'>@{log.user.login}</Tag> has been force-unregistered for the exam
					</Text>
				}
			</TimelineContent>
		</TimelineItem>
	)
}