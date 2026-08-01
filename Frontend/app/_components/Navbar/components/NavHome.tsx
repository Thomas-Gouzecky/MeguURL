import Link from "next/link";

export default function NavHome() {
	return (
		<div className="relative">
			<Link
				href="/"
				className="flex justify-center items-center"
			>
				<img
					src="/sparkle-chomusuke.webp"
					width={150}
				/>
				{/* <p className="text-2xl text-shadow-md font-bold">Home</p> */}
			</Link>
		</div>
	);
}
