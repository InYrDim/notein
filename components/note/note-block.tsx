import Link from "next/link";

export default function NoteBlock({ title }: { title: string }) {
	return (
		<li className="w-full list-none ">
			<div className="flex flex-row items-center gap-2">
				<div className="w-3 h-3 rounded-full bg-primary"></div>
				<Link
					href={`/dashboard/note/${title}`}
					title={title}
					className={`relative text-base text-foreground hover:text-primary/50 font-medium cursor-pointer`}
				>
					{title}
				</Link>
			</div>
		</li>
	);
}
