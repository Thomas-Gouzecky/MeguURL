import Link from "next/link";

export default function NavHome() {
	return (
		<div className="relative">
			<Link
				href="/"
				className="flex justify-center items-center"
			>
				<img
					className="max-w-32 w-fit h-fit"
					src="/sparkle-chomusuke.webp"
				/>
				{/* <p className="text-2xl text-shadow-md font-bold">Home</p> */}
			</Link>
		</div>
	);
}
