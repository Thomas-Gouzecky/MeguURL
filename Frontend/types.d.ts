// ===========================================================
// Header Types
// ===========================================================

type NavItemProp = {
	href: string;
	name: string;
};

// ===========================================================
// Footer Types
// ===========================================================

type FooterCardProp = {
	title?: string;
};

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

// ===========================================================
// Cursor Types
// ===========================================================

type CursorState = "default" | "pointer" | "text" | "select";

// ===========================================================
// Status Icon Types
// ===========================================================

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

type StatusItem = {
	id: string;
	status: StatusProp;
};

// ===========================================================
// Post Url Response Types
// ===========================================================

type PostUrlErrorResponse = {
	title: string;
	status: number;
	detail: string;
	url?: string;
};

type PostUrlResponse = {
	success: boolean;
	status: number;
	error?: PostUrlErrorResponse;
	urlCode?: string;
};

// ===========================================================
// Redirection Error Types
// ===========================================================

type GetRedirectUrlErrorResponse = ServiceUnavailableResponse;

type ServiceUnavailableResponse = {
	title: string;
	status: number;
	detail: string;
};

type GetRedirectUrlResult =
	| {
			success: true;
			status: number;
			longUrl: string;
	  }
	| ErrorResponse;

type ErrorResponse = {
	success: false;
	status: number;
	error: GetRedirectUrlErrorResponse;
};
