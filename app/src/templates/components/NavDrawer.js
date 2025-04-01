import Sidebar from "./Sidebar";
import { DrawerBackdrop, DrawerCloseTrigger, DrawerContent, DrawerRoot, DrawerTrigger } from "../../components/ui/drawer";
import { IconButton } from "@chakra-ui/react";
import { LuMenu } from "react-icons/lu";

export default function NavDrawer({ me, ...props }) {
	return (
		<DrawerRoot
			size={['sm', undefined, undefined, 'full']}
			{...props}
		>
			<DrawerBackdrop />
			<DrawerTrigger asChild>
				<IconButton
					hideFrom='md'
					size="sm" position='absolute' top='16px' right='16px'
					zIndex={10}
					aria-label="Open navigation"
				>
					<LuMenu />
				</IconButton>
			</DrawerTrigger>
			<DrawerContent>
				<Sidebar me={me}
					w='100%'
				/>
				<DrawerCloseTrigger />
			</DrawerContent>
		</DrawerRoot>
	)
}