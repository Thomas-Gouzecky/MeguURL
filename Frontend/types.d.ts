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
	error?: ResponseErrorProp;
	urlCode?: string;
};

type CursorState = "default" | "pointer" | "text" | "select";

type StatusProp = IdleStatusProp | SuccessStatusProp | ErrorStatusProp;

type IdleStatusProp = {
	state: "idle";
};

type SuccessStatusProp = {
	state: "success";
};

type ErrorStatusProp = {
	state: "error";
	error: ResponseErrorProp;
};

type ResponseErrorProp = {
	name: string;
	code: number;
	description: BackendErrorResponse;
};

type BackendErrorResponse = {
	error: string;
};

type StatusItem = {
	id: string;
	status: StatusProp;
};
