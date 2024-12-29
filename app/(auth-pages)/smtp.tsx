import { Label } from "@/components/ui/label";

import { FormMessage } from "@/components/form-message";
import { Input } from "@/components/ui/input";
import { SubmitButton } from "@/components/submit-button";

export default function SMTP({
	searchParams,
	action,
}: {
	searchParams: any;
	action: any;
}) {
	return (
		<form className="flex flex-col gap-2">
			<Label htmlFor="email">Email</Label>
			<Input name="email" placeholder="you@example.com" required />
			<Label htmlFor="password">Password</Label>
			<Input
				type="password"
				name="password"
				placeholder="Your password"
				minLength={6}
				required
			/>
			<SubmitButton formAction={action} pendingText="Signing up...">
				Sign up
			</SubmitButton>
			<FormMessage message={searchParams} />
		</form>
	);
}
