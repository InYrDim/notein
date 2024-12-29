"use client";

import { ArrowLeftIcon, PencilIcon } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";
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
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export default function Note({
	title,
	content,
	noteId,
	onUpdate,
}: {
	title: string;
	content: string;
	noteId: string;
	onUpdate: (id: string, title: string, content: string) => void;
}) {
	const router = useRouter();

	const [noteTitle, setNoteTitle] = useState("");
	const [noteContent, setNoteContent] = useState("");
	const [open, setOpen] = useState(false);

	const [prevTitle, setPrevTitle] = useState(title);

	useEffect(() => {
		if (open) {
			setNoteTitle(title);
			setNoteContent(content);
		}

		return () => {
			setNoteTitle("");
			setNoteContent("");
		};
	}, [open, title, content]);

	async function handleUpdateNote({
		title,
		content,
	}: {
		title: string;
		content: string;
	}) {
		const supabase = createClient();

		const { error } = await supabase
			.from("notes")
			.update({ title: title, content: content })
			.eq("id", noteId);

		if (error) {
			console.log(error);
			return; // Exit if there's an error
		}

		setOpen(false);

		//when title is updated, the note is updated and the page is refreshed
		if (prevTitle !== title) {
			setPrevTitle(title);
			router.push(`/dashboard/note/${title}`);
			return;
		}

		onUpdate(noteId, title, content);
	}

	async function handleDeleteNote() {
		const supabase = createClient();
		const { error } = await supabase
			.from("notes")
			.delete()
			.eq("id", noteId);

		if (error) {
			console.log(error);
		}
		setOpen(false);

		router.push("/dashboard");
	}

	return (
		<div className="w-full">
			<Breadcrumb className="mb-4">
				<BreadcrumbList>
					<BreadcrumbItem>
						<BreadcrumbLink href="/dashboard">
							Dashboard
						</BreadcrumbLink>
					</BreadcrumbItem>
					<BreadcrumbSeparator />
					<BreadcrumbItem>
						<BreadcrumbLink href="/dashboard/note">
							Note
						</BreadcrumbLink>
					</BreadcrumbItem>
					<BreadcrumbSeparator />
					<BreadcrumbItem>
						<BreadcrumbPage>{title}</BreadcrumbPage>
					</BreadcrumbItem>
				</BreadcrumbList>
			</Breadcrumb>

			<Dialog open={open} onOpenChange={setOpen}>
				<div className="flex flex-row justify-between items-center">
					<h1 className="text-2xl font-bold">{title}</h1>
					<DialogTrigger asChild>
						<Button
							variant="outline"
							className="flex flex-row gap-2"
						>
							<PencilIcon className="w-4 h-4" />
							Edit
						</Button>
					</DialogTrigger>
				</div>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Edit Note</DialogTitle>
					</DialogHeader>
					<div className="flex flex-col gap-2">
						<Input
							placeholder="Title"
							value={noteTitle}
							onChange={(e) => setNoteTitle(e.target.value)}
						/>
						<Textarea
							placeholder="Content"
							value={noteContent || ""}
							onChange={(e) => setNoteContent(e.target.value)}
						/>
					</div>
					<div className="flex flex-row justify-end gap-2">
						<Button
							className="mt-4"
							variant="destructive"
							onClick={() => handleDeleteNote()}
						>
							Delete
						</Button>
						<Button
							className="mt-4"
							onClick={() =>
								handleUpdateNote({
									title: noteTitle,
									content: noteContent,
								})
							}
						>
							Save
						</Button>
					</div>
				</DialogContent>
			</Dialog>
			<div className="mt-4">{content}</div>
		</div>
	);
}
