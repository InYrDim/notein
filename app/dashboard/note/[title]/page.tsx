"use client";

import Note from "@/components/note/note";
import { createClient } from "@/utils/supabase/client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function NotePage() {
	const { title } = useParams();
	const [note, setNote] = useState<any>(null);

	async function handleGetNote() {
		const supabase = createClient();
		const titleString = decodeURI(title as string);

		const { data, error } = await supabase
			.from("notes")
			.select("title, content, created_at, updated_at, id")
			.eq("title", titleString);

		if (error) {
			console.error("Error fetching note:", error);
			return;
		}

		setNote(data);
	}

	// Function to update the note in the state
	const handleUpdateNote = (
		id: string,
		updatedTitle: string,
		updatedContent: string
	) => {
		setNote((prevNotes: any) =>
			prevNotes.map((n: any) =>
				n.id === id
					? { ...n, title: updatedTitle, content: updatedContent }
					: n
			)
		);
	};

	useEffect(() => {
		handleGetNote();
	}, []);

	if (!note) return <div>Loading...</div>;
	if (note.length === 0) return <div>No note found</div>;

	return (
		<Note
			title={note[0].title}
			content={note[0].content}
			noteId={note[0].id}
			onUpdate={handleUpdateNote}
		/>
	);
}
