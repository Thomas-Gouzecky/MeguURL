import { FaGithub, FaTwitter, FaTwitterSquare, FaYoutube } from "react-icons/fa";
import { FaX, FaXTwitter } from "react-icons/fa6";

export const socialLinks: SocialLinkProp[] = [
	{
		name: "GitHub",
		href: "https://github.com",
		icon: <FaGithub size={24} />,
	},
	{
		name: "YouTube",
		href: "https://youtube.com",
		icon: <FaYoutube size={24} />,
	},
	{
		name: "X",
		href: "https://x.com",
		icon: <FaXTwitter size={24} />,
	},
];
