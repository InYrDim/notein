import Hero from "@/components/hero";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function Home() {
	return (
		<>
			<Hero />
			<div className="flex justify-center items-center">
				<Link href="/dashboard">
					<Button>Get Started</Button>
				</Link>
			</div>
		</>
	);
}
