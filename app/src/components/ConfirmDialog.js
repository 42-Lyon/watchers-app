import { Button } from "./ui/button";
import { DialogActionTrigger, DialogBody, DialogCloseTrigger, DialogContent, DialogFooter, DialogHeader, DialogRoot, DialogTitle, DialogTrigger } from "./ui/dialog";
import { LuCheck } from "react-icons/lu";

export default function ConfirmDialog({text, children, onConfirm, confirmColor}) {
	
	return (
		<DialogRoot
            placement={'center'}
            motionPreset="slide-in-bottom"
          >
            <DialogTrigger asChild>
				      {children}
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Are you sure ?</DialogTitle>
              </DialogHeader>
              <DialogBody>
			  	      {text}
              </DialogBody>
              <DialogFooter>
                <DialogActionTrigger asChild>
                  <Button variant="outline">Cancel</Button>
                </DialogActionTrigger>
			          <DialogActionTrigger asChild>
                  <Button onClick={onConfirm} colorPalette={confirmColor ? confirmColor : 'default'}><LuCheck/> Confirm</Button>
                </DialogActionTrigger>
              </DialogFooter>
              <DialogCloseTrigger />
            </DialogContent>
        </DialogRoot>
	)

}