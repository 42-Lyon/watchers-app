import { DialogActionTrigger, DialogBody, DialogCloseTrigger, DialogContent, DialogFooter, DialogHeader, DialogRoot, DialogTitle, DialogTrigger } from "./ui/dialog";

export default function ConfirmDialog({message, loading, children, onConfirm}) {
	return (
		<DialogRoot lazyMount placement='center'>
			<DialogTrigger asChild>
				{children}
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Are you sure?</DialogTitle>
				</DialogHeader>
				<DialogBody>
					{message}
				</DialogBody>
				<DialogFooter>
					<DialogActionTrigger asChild onClick={onConfirm} loading={loading}>
						Confirm
					</DialogActionTrigger>
					<DialogCloseTrigger asChild>
						Cancel
					</DialogCloseTrigger>
				</DialogFooter>
			</DialogContent>
		</DialogRoot>
	)

}