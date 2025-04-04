import { Text } from "@chakra-ui/react";
import { TimelineConnector, TimelineContent, TimelineDescription, TimelineItem, TimelineTitle } from "./ui/timeline";
import { Tag } from "./ui/tag";
import { LuArchive, LuArrowLeft, LuArrowRight, LuMinus, LuPlus } from "react-icons/lu";

const getIcon = (event) => {
	if (event === 'ExamArchiveLogs') return <LuArchive />
	if (event === 'ExamRegisterLogs' || event === 'ExamForceRegisterLogs') return <LuArrowRight />
	if (event === 'ExamUnregisterLogs' || event === 'ExamForceUnregisterLogs' ) return <LuArrowLeft />
	if (event === 'ExamCreationLogs') return <LuPlus/>
	if (event === 'ExamDeletionLogs') return <LuMinus />
}

const getColor = (event) => {
	if (event === 'ExamArchiveLogs') return 'green'
	if (event === 'ExamRegisterLogs' || event === 'ExamForceRegisterLogs') return 'blue'
	if (event === 'ExamUnregisterLogs' || event === 'ExamForceUnregisterLogs' ) return 'red'
	if (event === 'ExamCreationLogs') return 'green'
	if (event === 'ExamDeletionLogs') return 'red'
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

export default function ExamItemLog({ log, ...props }) {
	return (
		<TimelineItem {...props}>
			<TimelineConnector
				bg={getColor(log.__t)+'.500'}
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
						The watcher <Tag as='span'>@{log.forced_user.login}</Tag> has been registered
					</Text>
				}
				{
					log.__t === 'ExamForceUnregisterLogs' && 
					<Text>
						The watcher <Tag as='span'>@{log.forced_user.login}</Tag> has been unregistered
					</Text>
				}
			</TimelineContent>
		</TimelineItem>
	)
}