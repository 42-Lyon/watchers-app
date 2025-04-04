import { Center, HStack, Spinner, Stack } from "@chakra-ui/react"
import ExamLastWatch from "./ExamLastWatch"
import ExamStats from "./ExamStats"
import LineExamsChart from "./LineExamsChart"
import ExamCarousel from "./ExamCarousel"
import { useEffect, useState } from "react"

export default function UserExamStats({ user }) {
	
	const [loading, setLoading] = useState(true);

	const fetchExams = async () => {
		setLoading(true);
		await user.fetchExams();
		setLoading(false);
	}
	
	useEffect(() => {
		fetchExams();
	// eslint-disable-next-line
	}, []);

	if (!user) return null;

	if (loading)
		return <Center
			height={'full'}
			width={'full'}
			gap={'2'}
		>
			<Spinner />Loading...
		</Center>

	return <Stack>
			<HStack>
				<ExamLastWatch lastWatch={user.last_watch && new Date(user.last_watch)} />
				<ExamStats label={'Watch count'} value={user.nb_watch} />
			</HStack>
			{user.exams.length > 0 && <>
				<LineExamsChart exams={user.exams.filter(exam => exam.is_archived)} />
				<ExamCarousel exams={user.exams} />
			</>}
		</Stack>

}