"use client";

import WebArt from "./_components/Body/Home/WebArt";
import InputSection from "./_components/Body/Home/InputSection/InputSection";
import AppDescription from "./_components/Body/Home/AppDescription";
import { GlassCard } from "react-glass-ui";

import { useId } from "react";

export default function Home() {
	const id = useId();
	return (
		<div className="flex flex-col gap-4 p-4">
			{/* idek if i have art i want to use LOL */}
			<WebArt />
			<GlassCard
				className="p-4 shadow-[5px_5px_0_rgba(0,0,0,0.35)] custom-text-primary w-[80%] max-w-4xl m-auto flex flex-col gap-2"
				id={id}
				blur={4}
				brightness={80}
				saturation={100}
				borderSize={2}
				borderOpacity={0.2}
				borderRadius={12}
				innerLightBlur={10}
				innerLightColor="black"
				innerLightOpacity={0.5}
				innerLightSpread={0.5}
			>
				<div className="flex flex-col gap-4">
					<InputSection />

					{/* idek if i want to put a description LOL */}
					<AppDescription />
				</div>
			</GlassCard>
		</div>
	);
}
