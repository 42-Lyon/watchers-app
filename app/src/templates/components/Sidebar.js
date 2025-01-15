import { Link } from "react-router-dom";
import ProfileCard from "../../components/ProfileCard";
import { Button } from "../../components/ui/button";
import { Separator, Stack, Link as CLink } from "@chakra-ui/react";
import { FaClockRotateLeft, FaHouse, FaRightFromBracket } from "react-icons/fa6";
import config from "../../config";

export default function Sidebar({ me, ...props }) {

	const path = window.location.pathname;

	return (
		<Stack
			h='100vh'
			minWidth='250px'
			background='bg.subtle'
			padding='8px'
			justifyContent='space-between'
			{...props}
		>
			<Stack w='100%'>
				<ProfileCard w='100%' user={me}/>
				<Separator w='100%' />
				<Stack w='100%'>
					<Button
						w='100%' variant='ghost' display='flex' justifyContent='space-between'
						as={Link} to='/'
						disabled={path === '/'}
					>
						Exams <FaHouse/>
					</Button>
					<Button
						w='100%' variant='ghost' display='flex' justifyContent='space-between'
						as={Link} to='/statistics'
						disabled={path.startsWith('/statistics')}
					>
						Statistics <FaClockRotateLeft />
					</Button>
				</Stack>
				<Separator w='100%' />
			</Stack>
			<Stack w='100%' alignItems='center'>
				<Button
					w='100%' variant='solid' colorPalette='red' display='flex' justifyContent='space-between'
					as={Link} to={`${config.apiUrl}/auth/logout`}
				>Logout <FaRightFromBracket/></Button>
				<CLink fontSize='xs' variant="underline">
					Privacy Policy
				</CLink>
			</Stack>
		</Stack>
	);
}