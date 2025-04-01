import { Flex, Stack } from "@chakra-ui/react";
import Sidebar from "./components/Sidebar";
import NavDrawer from "./components/NavDrawer";

export default function LeftNavTemplate({ me, children, ...props }) {

	return (
		<Flex>
			<Sidebar me={me}
				hideBelow="md"
				w='18%'
			/>
			
			<NavDrawer me={me}
				
			/>

			<Stack
				h='100dvh'
				w={['100%','100%', '82%']}
				padding='8px'
				overflowY='auto'
				{...props}
			>
				{children}
			</Stack>
		</Flex>
	)
}