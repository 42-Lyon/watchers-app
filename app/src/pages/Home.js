import { useExams } from "../context/useExams";
import ExamMonthSection from "../components/ExamMonthSection";
import { useEffect, useState } from "react";
import ExamCreationForm from "../components/ExamCreationForm";
import { useMe } from "../context/useMe";
import LeftNavTemplate from "../templates/LeftNavTemplate";
import { EmptyState } from "../components/ui/empty-state";
import { FaEyeSlash } from "react-icons/fa6";
import { Center } from "@chakra-ui/react";

export default function Home() {

	const { exams, create } = useExams();
	const { me } = useMe();

	const splitExams = (exams) => {
		let months = [];
		exams.forEach(exam => {
			const month = new Date(exam.start_at).toLocaleString('default', { month: 'long' });
			const year = new Date(exam.start_at).getFullYear();
			if (months.find((m) => m.month === month && m.year === year))
				return;
			months.push({month, year});
		})
		return months;
	}


	const [months, setMonths] = useState([]);
	useEffect(() => {
		setMonths(splitExams(exams));
	}, [exams]);

	if (months && me)
	return (
		<LeftNavTemplate me={me}>
			{months.map((date) => (
				<ExamMonthSection key={date.month + date.year} year={date.year} month={date.month} exams={
					exams.filter(exam =>
						new Date(exam.start_at).toLocaleString('default', { month: 'long' }) === date.month &&
						new Date(exam.start_at).getFullYear() === date.year
					)
				} />
			))}
			{ months.length === 0 &&
				<Center
					h='100%'
					w='100%'
				>
					<EmptyState
						icon={<FaEyeSlash />}
						title="No exams planned"
						description="It seems there are no exams planned for the moment. Check back later or contact an administrator if you think that's an issue."
					/>
				</Center>
			}
			{ me.is_staff && <ExamCreationForm onCreate={create} />}
		</LeftNavTemplate>
	);
}