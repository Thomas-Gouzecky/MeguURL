export default function getCursorState(element: Element): CursorState {
	const customCursor = element.closest("[data-cursor]")?.getAttribute("data-cursor");

	if (customCursor) {
		return customCursor as CursorState;
	}

	if (!element) {
		return "default";
	}

	if (element.closest("button") || element.closest("a") || element.classList.contains("cursor-pointer")) {
		return "pointer";
	}

	if (element instanceof HTMLInputElement || element instanceof HTMLTextAreaElement) {
		return "text";
	}

	if (element instanceof HTMLHeadingElement || element instanceof HTMLParagraphElement) {
		return "select";
	}

	return "default";
}
