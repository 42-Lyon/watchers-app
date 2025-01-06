import { Badge, Card, Flex, Grid } from "@chakra-ui/react";
import { FaCalendar } from "react-icons/fa6";
import ExamSlot from "./ExamSlot";

export default function ExamCard({ exam, ...props }) {

	return (
		<Card.Root w='100%' {...props}>
			<Card.Header>
				<Card.Title display='flex' alignItems='center' gap='4px'><FaCalendar/> {exam.start_at.toLocaleDateString('fr-FR')}</Card.Title>
				<Card.Description>
					{exam.start_at.toLocaleTimeString('fr-FR', {hour: '2-digit', minute:'2-digit'}) + ' - ' + exam.end_at.toLocaleTimeString('fr-FR', {hour: '2-digit', minute:'2-digit'})}
				</Card.Description>
			</Card.Header>
			<Card.Body>
				<Grid templateColumns="repeat(2, 1fr)" gap='8px'>
					<ExamSlot/>
					<ExamSlot disabled/>
				</Grid>
			</Card.Body>
			<Card.Footer>
			<Flex
				gap='8px'
			>
				<Badge colorPalette="black">Watcher</Badge>
				<Badge colorPalette="yellow">Tutor</Badge>
			</Flex>
			</Card.Footer>
		</Card.Root>
	);
}