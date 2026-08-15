import Image from "next/image";
import Link from "next/link";

export default function NavHome() {
	return (
		<div className="relative">
			<Link
				href="/"
				className="flex justify-center items-center"
			>
				<div className="relative max-w-32 h-auto">
					<Image
						src="/sparkle-chomusuke.webp"
						alt="Sparkley Chomusuke Home Icon"
						width={512}
						height={512}
						className="object-contain"
					/>
					{/* <p className="text-2xl text-shadow-md font-bold">Home</p> */}
				</div>
			</Link>
		</div>
	);
}
