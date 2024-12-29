import { signInWithGoogle, signInWithGithub } from "@/app/actions";
import { RiGoogleFill, RiGithubFill } from "react-icons/ri";
import { OAuthLoginUI } from "./oauth";

const provider = [
	{ name: "Google", action: signInWithGoogle, icon: <RiGoogleFill /> },
	{ name: "Github", action: signInWithGithub, icon: <RiGithubFill /> },
];

export default function OAuthLogin() {
	return <OAuthLoginUI provider={provider} />;
}
