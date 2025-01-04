import { Card, Flex, HStack, Stack, Text } from "@chakra-ui/react";
import { Avatar } from "./ui/avatar";
import ExamStats from "./ExamStats";

export default function ProfileCard() {

	return (
		<Card.Root>
			<Card.Body>
				<HStack mb="6" gap="3">
					<Avatar
						size="sm"
						name="Nate Foss"
						src="https://bit.ly/naruto-sage"
					/>
					<Stack gap="0">
						<Text fontWeight="semibold" textStyle="sm">
						Nate Foss 
						</Text>
						<Text color="fg.muted" textStyle="sm">
						@natefoss
						</Text>
					</Stack>
				</HStack>
	
				<Flex gap="2">
					<ExamStats label="Stage 1" value={6} needed={12} info='test' />
					<ExamStats label="Level" value="5" />
					<ExamStats label="Level" value="5" />
				</Flex>

			</Card.Body>
		</Card.Root>
	);
}