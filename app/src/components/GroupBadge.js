import { Badge } from "@chakra-ui/react";

export default function GroupBadge({ group }) {

	if (group === 'Watcher')
		return (
			<Badge key={group} colorPalette='purple'>{group}</Badge>
		)
	if (group === 'Tutor')
		return (
			<Badge key={group} colorPalette='yellow'>{group}</Badge>
		)
	if (group === 'LifeGuard')
		return (
			<Badge key={group} colorPalette='green'>{group}</Badge>
		)
	return (
		<Badge key={group} colorPalette='gray'>{group}</Badge>
	)
}