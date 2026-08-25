export default function WebArt() {
	return (
		<div className="m-auto relative w-fit pb-4">
			{/* Shadow */}
			<span
				className="absolute inset-0 font-black text-black transition-all duration-300
				lg:text-9xl lg:translate-x-1.75 lg:translate-y-1.75 
				md:text-9xl md:translate-x-1.75 md:translate-y-1.75 
				text-5xl translate-x-1 translate-y-1"
			>
				MeguURL
			</span>

			{/* GIF */}
			<span
				className="relative font-black text-transparent bg-clip-text bg-center bg-cover transition-all duration-300
				lg:text-9xl 
				md:text-9xl 
				text-5xl"
				style={{
					backgroundImage: "url('/megumin_entrance.gif')",
					backgroundSize: "cover",
					backgroundPosition: "top",
					filter: "brightness(0.8) contrast(1.2) saturate(1.3)",
				}}
			>
				MeguURL
			</span>
		</div>
	);
}
