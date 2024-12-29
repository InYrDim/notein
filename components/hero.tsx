import { Button } from "./ui/button";
import Link from "next/link";
export default function Header() {
	return (
		<div className="flex flex-col gap-16 items-center">
			<div className="flex flex-col gap-8 justify-center items-center">
				<div className="flex flex-col sm:flex-row gap-2 max-w-sm sm:max-w-none">
					<h1 className="text-4xl font-bold">Welcome to NoteIN</h1>
					<p className="text-xl">
						NoteIN is a simple note-taking app that allows you to
						take notes and save them to your account.
					</p>
				</div>
			</div>
			<div className="w-full p-[1px] bg-gradient-to-r from-transparent via-foreground/10 to-transparent my-8" />
		</div>
	);
}
