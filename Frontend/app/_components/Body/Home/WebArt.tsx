export default function WebArt() {
	return (
		<div className="pb-4">
			<div className="m-auto relative w-fit">
				{/* Shadow */}
				<span className="absolute inset-0 text-9xl font-black text-black translate-x-1.75 translate-y-1.75">
					MeguURL
				</span>

				{/* GIF */}
				<span
					className="relative text-9xl font-black text-transparent bg-clip-text bg-center bg-cover"
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
		</div>
	);
}
