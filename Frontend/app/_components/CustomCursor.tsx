"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import useCursorState from "@/hooks/useCursorState";
import { cursorMap } from "@/lib/cursorMap";

export default function CustomCursor() {
	const [position, setPosition] = useState({
		x: 0,
		y: 0,
	});

	const cursorState = useCursorState();

	const cursor = cursorMap[cursorState];

	useEffect(() => {
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

	return (
		<Image
			src={cursor}
			alt=""
			className="fixed pointer-events-none z-50 h-auto w-auto"
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
