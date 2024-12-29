"use client";

import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { createClient } from "@/utils/supabase/client";
import { redirect } from "next/navigation";
import { useState } from "react";

export default function CreateNoteButton() {
	const [title, setTitle] = useState("");
	const [content, setContent] = useState("");
	const [open, setOpen] = useState(false);

	async function HandleCreateNote({
		title,
		content,
	}: {
		title: string;
		content: string;
	}) {
		const supabase = createClient();
		const {
			data: { user },
		} = await supabase.auth.getUser();

		const { data, error } = await supabase
			.from("notes")
			.insert({ title: title, content: content, user_id: user?.id });

		if (error) {
			console.log(error);
		}
		setOpen(false);

		return redirect("/dashboard");
	}

	return (
		<>
			<Dialog open={open} onOpenChange={setOpen}>
				<DialogTrigger asChild>
					<Button className="flex flex-row gap-2">
						<PlusIcon className="w-4 h-4" />
						Create Note
					</Button>
				</DialogTrigger>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Create Note</DialogTitle>
					</DialogHeader>
					<div className="flex flex-col gap-2">
						<Input
							placeholder="Title"
							value={title}
							onChange={(e) => setTitle(e.target.value)}
						/>
						<Textarea
							placeholder="Content"
							value={content}
							onChange={(e) => setContent(e.target.value)}
						/>
					</div>
					<Button
						className="mt-4"
						onClick={() => HandleCreateNote({ title, content })}
					>
						Create
					</Button>
				</DialogContent>
			</Dialog>
		</>
	);
}
