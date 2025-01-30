import { Badge } from "@chakra-ui/react";

export default function GroupBadge({ group, ...props }) {

	if (group === 'Watcher')
		return (
			<Badge key={group} colorPalette='purple' {...props}>{group}</Badge>
		)
	if (group === 'Tutor')
		return (
			<Badge key={group} colorPalette='yellow' {...props}>{group}</Badge>
		)
	if (group === 'LifeGuard')
		return (
			<Badge key={group} colorPalette='green' {...props}>{group}</Badge>
		)
	if (group === 'Staff')
		return (
			<Badge key={group} colorPalette='red' {...props}>{group}</Badge>
		)
	return (
		<Badge key={group} colorPalette='gray' {...props}>{group}</Badge>
	)
}