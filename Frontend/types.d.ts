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
	error?: PostUrlErrorResponse;
	urlCode?: string;
};

type CursorState = "default" | "pointer" | "text" | "select";

type Status = "success" | "error" | "idle";

type StatusProp = IdleStatusProp | SuccessStatusProp | ErrorStatusProp;

type IdleStatusProp = {
	state: "idle";
};

type SuccessStatusProp = {
	state: "success";
};

type ErrorStatusProp = {
	state: "error";
	error: PostUrlErrorResponse;
};

type PostUrlErrorResponse = {
	title: string;
	status: number;
	detail: string;
	url?: string;
};

type StatusItem = {
	id: string;
	status: StatusProp;
};
