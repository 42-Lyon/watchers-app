// import { useExams } from "../context/useExams";
import ExamMonthSection from "../components/ExamMonthSection";
import { useEffect, useState } from "react";
import ExamCreationForm from "../components/ExamCreationForm";
import { useMe } from "../context/useMe";
import LeftNavTemplate from "../templates/LeftNavTemplate";
import { EmptyState } from "../components/ui/empty-state";
import { Center } from "@chakra-ui/react";
import { LuHistory, LuPlus, LuRefreshCcw, LuShieldAlert } from "react-icons/lu";
import useExams from "hooks/useExams";
import { Button } from "components/ui/button";

export default function Exams() {

	const { me } = useMe();

	const { exams, create, loadNextPage, loading, currentPage, pageCount } = useExams({
		filter: {
			is_archived: false,
		},
	})

	const {
		exams: archivedExams,
		loadNextPage: loadHistory,
		loading: loadingHistory,
		currentPage: currentHistoryPage,
		pageCount: historyPageCount,
	} = useExams({
		page: 0,
		sort: '-start_at',
		filter: {
			is_archived: true,
		},
	})

	console.log(currentHistoryPage, historyPageCount);

	const splitExams = (exams) => {
		let months = [];
		exams.forEach(exam => {
			console.log('exam', exam.start_at);
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
		setMonths(splitExams([...exams, ...archivedExams]));
	}, [exams, archivedExams]);
	
	if (months && me)
	return (
		<LeftNavTemplate me={me} gap='32px' pb='128px' alignItems='center'>
			{me.is_staff && <Button
				variant='outline'
				leftIcon={<LuPlus />}
				onClick={loadHistory}
				loading={loadingHistory}
				disabled={currentHistoryPage >= historyPageCount}
				w='fit-content'
			>
				<LuHistory/> Load history
			</Button>}
			{months.map((date) => (
				<ExamMonthSection
					w='100%'
					key={date.month + date.year} year={date.year} month={date.month} exams={
						[...archivedExams, ...exams].filter(exam =>
							new Date(exam.start_at).toLocaleString('default', { month: 'long' }) === date.month &&
							new Date(exam.start_at).getFullYear() === date.year
						)
					}
				/>
			))}
			{ months.length === 0 &&
				<Center
					h='100%'
					w='100%'
				>
					<EmptyState
						icon={<LuShieldAlert />}
						title="No exams planned"
						description="It seems there are no exams planned for the moment. Check back later or contact an administrator if you think that's an issue."
					/>
				</Center>
			}
			{me.is_staff && <Button
				variant='outline'
				leftIcon={<LuPlus />}
				onClick={loadNextPage}
				loading={loading}
				disabled={currentPage >= pageCount}
				w='fit-content'
			>
				<LuRefreshCcw/> Load more exams ({currentPage}/{pageCount})
			</Button>}
			{ me.is_staff && <ExamCreationForm onCreate={create} />}
		</LeftNavTemplate>
	);
}