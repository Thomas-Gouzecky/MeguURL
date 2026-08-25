export default function FooterBackground({ type, children }: { type?: "square"; children: React.ReactElement }) {
	const footerDesigns = {
		default:
			"h-fit flex items-center justify-center p-4 m-5 rounded-xl bg-linear-to-tl from-[#261A18] to-[#170f0b]",
		square: "h-fit flex items-center justify-center p-4 border-t-3 border-[#332320] bg-linear-to-tl from-[#261A18] to-[#170f0b]",
	};
	return <div className={footerDesigns[type ?? "default"]}>{children}</div>;
}
