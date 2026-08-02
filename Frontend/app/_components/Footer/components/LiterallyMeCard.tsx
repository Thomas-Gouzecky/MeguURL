import Image from "next/image";

export default function LiterallyMe() {
	return (
		<div className="max-w-60 p-3 rounded-xl bg-[#211615] border-3 border-[#332320] shadow-md">
			<p>Literally me :3</p>
			<Image
				src="/literally-me.jpg"
				className="rounded-lg"
				alt="Literally me as a sleepy cat ^_^"
				width={512}
				height={512}
			/>
		</div>
	);
}
