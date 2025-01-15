import { FaClockRotateLeft, FaHouse, FaRightFromBracket } from "react-icons/fa6";
import ProfileCard from "../components/ProfileCard";
import { Button, Flex, Separator, Stack } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import config from "../config";
import Sidebar from "./components/Sidebar";
import NavDrawer from "./components/NavDrawer";

export default function LeftNavTemplate({ me, children }) {

	return (
		<Flex>
			<Sidebar me={me}
				hideBelow="md"
				w='18%'
			/>
			
			<NavDrawer me={me}
				
			/>

			<Stack
				h='100vh'
				w={['100%','100%', '82%']}
				padding='8px'
				overflowY='auto'
			>
				{children}
			</Stack>
		</Flex>
	)
}