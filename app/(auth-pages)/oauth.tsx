import { Button } from "@/components/ui/button";

export interface Provider {
	name: string;
	action: () => Promise<void>;
	icon?: React.ReactNode;
}

export function OAuthLoginUI({ provider }: { provider: Provider[] }) {
	return (
		<ul className="flex items-center justify-center gap-2">
			{provider.map(({ name, action, icon }) => {
				return (
					<li key={name} className="flex-1">
						<Button
							onClick={action}
							variant="outline"
							className="w-full gap-2 flex border-primary text-primary"
						>
							<span>{icon}</span>
							{name}
						</Button>
					</li>
				);
			})}
		</ul>
	);
}
