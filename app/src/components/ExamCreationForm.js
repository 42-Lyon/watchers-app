import { createListCollection, DialogCloseTrigger, Fieldset, Flex, Input, SelectLabel, SelectRoot } from "@chakra-ui/react";
import { Button } from "./ui/button";
import { DialogActionTrigger, DialogBody, DialogContent, DialogFooter, DialogHeader, DialogRoot, DialogTitle, DialogTrigger } from "./ui/dialog";
import { FaPlus } from "react-icons/fa6";
import { Field } from "./ui/field";
import { NumberInputField, NumberInputRoot } from "./ui/number-input";
import { SelectContent, SelectItem, SelectTrigger, SelectValueText } from "./ui/select";
import GroupBadge from "./GroupBadge";
import { useState } from "react";

const groups = createListCollection({
	items: [
	  { label: "Watcher", value: "Watcher" },
	  { label: "Tutor", value: "Tutor" },
	  { label: "LifeGuard", value: "LifeGuard" },
	],
})

export default function ExamCreationForm({create}) {

	const [exam, setExam] = useState({
		date: new Date(),
		duration: 3,
		slots: 2,
		authorized_groups: [],
		title: '',
	});

  return (
	<DialogRoot lazyMount placement='center'>
		<DialogTrigger asChild>
			<Button
				position='fixed'
				bottom='32px'
				right='32px'
			>
				<FaPlus/> Create Exam
			</Button>
		</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a new Exam</DialogTitle>
        </DialogHeader>
        <DialogBody>
			<Fieldset.Root size="lg" maxW="md">

				<Fieldset.Content>
					<Field label="Date" required>
						<Input type="datetime-local" />
					</Field>

					<Flex w="100%" justifyContent='space-between' gap='8px'>
						<Field label="Durations" required>
							<NumberInputRoot
								w='100%'
								min={1}
								defaultValue="3"
								formatOptions={{
									style: "unit",
									 unit: "hour"
								}}
							>
								<NumberInputField />
							</NumberInputRoot>
						</Field>

						<Field label="Slots" required>
							<NumberInputRoot defaultValue="2" min={1} w='100%'>
								<NumberInputField />
							</NumberInputRoot>
						</Field>

					</Flex>
					<SelectRoot multiple collection={groups} width="100%" required>
						<SelectLabel>Select Authorized Groups</SelectLabel>
						<SelectTrigger>
							<SelectValueText placeholder="Group" />
						</SelectTrigger>
						<SelectContent>
							{groups.items.map((group) => (
								<SelectItem item={group} key={group.value}>
									<GroupBadge group={group.label}/>
								</SelectItem>
							))}
						</SelectContent>
					</SelectRoot>
		
					<Field label="Title">
						<Input value={exam.title} onChange={(e) => setExam({...exam, title: e.target.value})}/>
					</Field>

				</Fieldset.Content>
			</Fieldset.Root>
        </DialogBody>
        <DialogFooter>
          <DialogActionTrigger asChild>
            <Button variant="outline">Cancel</Button>
          </DialogActionTrigger>
          <Button>Create</Button>
        </DialogFooter>
        <DialogCloseTrigger />
      </DialogContent>
    </DialogRoot>
  )
}