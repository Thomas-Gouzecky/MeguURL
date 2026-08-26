"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import useCursorState from "@/hooks/useCursorState";
import { cursorMap } from "@/lib/cursorMap";

export default function CustomCursor() {
	const [hasMouse, setHasMouse] = useState(false);
	const [position, setPosition] = useState({
		x: 0,
		y: 0,
	});

	const cursorState = useCursorState();

	const cursor = cursorMap[cursorState];

	useEffect(() => {
		setHasMouse(window.matchMedia("(pointer: fine)").matches);

		const move = (e: MouseEvent) => {
			setPosition({
				x: e.clientX,
				y: e.clientY,
			});
		};

		window.addEventListener("mousemove", move);

		return () => {
			window.removeEventListener("mousemove", move);
		};
	}, []);

	if (!hasMouse) {
		return null;
	}

	return (
		<Image
			src={cursor}
			alt=""
			className="fixed pointer-events-none z-999 h-auto w-auto"
			width={32}
			height={32}
			unoptimized
			style={{
				left: position.x,
				top: position.y,
			}}
		/>
	);
}
