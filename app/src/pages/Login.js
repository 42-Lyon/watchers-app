import { Button, Center, Heading, Image } from "@chakra-ui/react";



export default function Login() {

	return (
		<Center
			h="100vh"
			w="100vw"
			flexDir='column'
			gap='10vh'
		>
			<Heading>
				Intra Watcher
			</Heading>
			<Button>
				Login with 
				<Image src="https://profile.intra.42.fr/assets/42_logo-7dfc9110a5319a308863b96bda33cea995046d1731cebb735e41b16255106c12.svg" alt="42 logo" h="50%"/>
				Intra
			</Button>
		</Center>
	);
}