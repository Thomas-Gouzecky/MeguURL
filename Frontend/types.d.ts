type SocialLinkProp = {
	name: string;
	href: string;
	icon: React.ReactElement;
};

type ExtraInfoProp = {
	name: string;
	href: string;
	icon?: React.ReactElement;
};

type NavItemProp = {
	href: string;
	name: string;
};

type FooterCardProp = {
	title?: string;
};

type PostUrlResponse = {
	success: boolean;
	error?: string;
	urlCode?: string;
};

type CursorState = "default" | "pointer" | "text" | "select";

type StatusProp = "idle" | "success" | "error";

type StatusItem = {
	id: string;
	status: StatusProp;
};
