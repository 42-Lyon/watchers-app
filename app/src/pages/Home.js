import { Flex } from "@chakra-ui/react";
import ProfileCard from "../components/ProfileCard";



export default function Home() {

	return (
		<Flex
			flexDir="column"
		>
			<ProfileCard />
		</Flex>
	);
}