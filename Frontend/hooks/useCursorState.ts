import { useState, useEffect } from "react";
import getCursorState from "@/lib/getCursorState";

export default function useCursorState(): CursorState {
	const [cursorState, setCursorState] = useState<CursorState>("default");

	useEffect(() => {
		const updateCursor = (e: MouseEvent) => {
			const element = document.elementFromPoint(e.clientX, e.clientY);

			if (element instanceof Element) {
				setCursorState(getCursorState(element));
			} else {
				setCursorState("default");
			}
		};

		window.addEventListener("mousemove", updateCursor);

		return () => {
			window.removeEventListener("mousemove", updateCursor);
		};
	}, []);

	return cursorState;
}
