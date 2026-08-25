"use client";

import { GlassCard } from "react-glass-ui";
import { useId } from "react";

export default function DefaultGlass({ children }: { children: React.ReactElement }) {
	const id = useId();
	return (
		<GlassCard
			className="p-4 shadow-[5px_5px_0_rgba(0,0,0,0.35)] custom-text-primary w-[80%] max-w-4xl m-auto overflow-visible"
			contentClassName="!overflow-visible"
			id={id}
			blur={4}
			distortion={0}
			brightness={80}
			saturation={100}
			borderSize={3}
			borderOpacity={0.2}
			borderRadius={12}
			innerLightBlur={10}
			innerLightColor="black"
			innerLightOpacity={0.5}
			innerLightSpread={0.5}
		>
			{children}
		</GlassCard>
	);
}
