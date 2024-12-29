import { createClient } from "@/utils/supabase/server";
import { InfoIcon } from "lucide-react";
import { redirect } from "next/navigation";
import NoteBlock from "@/components/note/note-block";
import { Button } from "@/components/ui/button";
import CreateNoteButton from "@/components/note/createNote";

export default async function ProtectedPage() {
	const supabase = await createClient();

	const {
		data: { user },
	} = await supabase.auth.getUser();

	const { data, error } = await supabase
		.from("notes")
		.select("*")
		.eq("user_id", user?.id);

	if (!user) {
		return redirect("/sign-in");
	}

	return (
		<div className="w-full">
			<div className="w-full flex justify-between sm:items-center flex-col sm:flex-row">
				<h2 className="font-bold text-2xl mb-4">My Notes</h2>
				<CreateNoteButton />
			</div>
			<ul className="flex flex-col gap-2 items-start mt-4 sm:mt-0">
				{data?.map((note) => (
					<NoteBlock title={note.title} key={note.id} />
				))}
			</ul>
			{/* <FetchDataSteps /> */}
		</div>
	);
}
