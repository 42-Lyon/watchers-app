import { Card, Flex, HStack, Stack, Text } from "@chakra-ui/react";
import { Avatar } from "./ui/avatar";
import { useMe } from "../context/useMe";
import GroupBadge from "./GroupBadge";

export default function ProfileCard({...props}) {

	const { me } = useMe();

	if (me)
		return (
			<Card.Root w='100%' {...props}>
				<Card.Body p='4' paddingBottom={0}>
					<HStack mb="6">
						<Avatar
							size="sm"
							name={`${me.firstname} ${me.lastname}`}
							src={me.image_url}
							/>
						<Stack gap="0">
							<Text fontWeight="semibold" textStyle="sm">
								{me.firstname} {me.lastname}
							</Text>
							<Text color="fg.muted" textStyle="sm">
								@{me.login}
							</Text>
						</Stack>
					</HStack>
				</Card.Body>
				<Card.Footer p='4' paddingTop={0}>
				<Flex
					gap='8px'
				>
					{me.groups.map((group) => (
						<GroupBadge key={group} group={group}/>
					))}
				</Flex>
				</Card.Footer>
			</Card.Root>
		);
}