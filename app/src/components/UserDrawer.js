import { Button, Drawer, Portal, Tabs } from "@chakra-ui/react";
import ProfileCard from "./ProfileCard";
import { LuCalendar, LuLogs, LuSettings } from "react-icons/lu";
import UserExamStats from "./UserExamStats";
import UserLogs from "./UserLogs";
import { useMe } from "context/useMe";
import UserSettings from "./UserSettings";
export default function UserDrawer({ user, children }) {

	const { me } = useMe();

	return <Drawer.Root size='md'>
      <Drawer.Trigger asChild>
        {children}
      </Drawer.Trigger>
      <Portal>
        <Drawer.Backdrop />
        <Drawer.Positioner>
          <Drawer.Content>
            <Drawer.Header>
             <ProfileCard user={user} />
            </Drawer.Header>
            <Drawer.Body>
				<Tabs.Root defaultValue="exams" height='100%' variant='subtle' display='flex' flexDirection='column'>
					<Tabs.List>
						<Tabs.Trigger value="exams">
							<LuCalendar />
							Exams
						</Tabs.Trigger>
						<Tabs.Trigger value="logs">
							<LuLogs />
							Logs
						</Tabs.Trigger>
						{ me.is_staff && <Tabs.Trigger value="settings">
							<LuSettings />
							Settings
						</Tabs.Trigger>}
					</Tabs.List>
					<Tabs.Content value="exams" flexGrow={1} overflowY='auto'>
						<UserExamStats user={user}/>
					</Tabs.Content>
					<Tabs.Content value="logs" flexGrow={1} overflowY='auto'>
						<UserLogs user={user}/>
					</Tabs.Content>
					<Tabs.Content value="settings" flexGrow={1} overflowY='auto'>
						<UserSettings user={user}/>
					</Tabs.Content>
				</Tabs.Root>
            </Drawer.Body>
            <Drawer.Footer>
				<Drawer.CloseTrigger asChild>
					<Button variant="outline">Close</Button>
				</Drawer.CloseTrigger>
            </Drawer.Footer>
			<Drawer.CloseTrigger />
          </Drawer.Content>
        </Drawer.Positioner>
      </Portal>
    </Drawer.Root>
}