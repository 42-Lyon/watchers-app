import { useExams } from "../context/useExams";
import ExamMonthSection from "../components/ExamMonthSection";
import ProfileCard from "../components/ProfileCard";
import { Button, Flex, Separator, Stack } from "@chakra-ui/react";
import { FaClockRotateLeft, FaHouse, FaRightFromBracket } from "react-icons/fa6";
import { useEffect, useState } from "react";

export default function Home() {

	const { exams } = useExams();

	const splitExams = (exams) => {
		let months = [];
		exams.forEach(exam => {
			const month = new Date(exam.start_at).toLocaleString('default', { month: 'long' });
			if (months.includes(month))
				return;
			months.push(month);
		})
		console.log(months);
		return months;
	}


	const [months, setMonths] = useState([]);
	useEffect(() => {
		setMonths(splitExams(exams));
	}, [exams]);

	if (months)
	return (
		<Flex>
			<Stack
				h='100vh'
				minWidth='250px'
				w='18%'
				background='bg.subtle'
				padding='8px'
			>
				<ProfileCard w='100%'/>
				<Separator w='100%' />
				<Stack w='100%'>
					<Button w='100%' variant='ghost' display='flex' justifyContent='space-between'>Home <FaHouse/></Button>
					<Button w='100%' variant='ghost' display='flex' justifyContent='space-between'>History <FaClockRotateLeft /></Button>
					<Button marginTop='16px' w='100%' variant='solid' colorPalette='red' display='flex' justifyContent='space-between'>Logout <FaRightFromBracket/></Button>
				</Stack>
				<Separator w='100%' />
			</Stack>
			<Stack
				h='100vh'
				w='80%'
				padding='8px'
			>
				{months.map((month) => (
					<ExamMonthSection key={month + 'month'} month={month} exams={
						exams.filter(exam => 
							new Date(exam.start_at).toLocaleString('default', { month: 'long' }) === month
						)
					} />
				))}
			</Stack>
		</Flex>
	);
}