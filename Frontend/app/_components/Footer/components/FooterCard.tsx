export default function FootCard({
	children,
	className,
	FooterProps,
}: {
	children?: React.ReactElement | React.ReactElement[];
	className?: string;
	FooterProps?: FooterCardProp;
}) {
	const Title = FooterProps?.title;
	const containerCSS =
		className +
		" w-fit p-4 rounded-xl bg-[#211615] border-3 border-[#332320] shadow-md h-fit flex flex-col items-center";
	return (
		<div className={containerCSS}>
			{Title ? (
				<div className="w-full flex flex-col items-center">
					<h1 className="text-lg font-bold custom-text-primary">{Title}</h1>
					<div className="h-0.5 w-2/3 my-2 bg-linear-to-r from-transparent via-[#2f251c] to-transparent rounded-full transform group-hover:w-full transition-all duration-500 animate-pulse" />
				</div>
			) : null}
			{children}
		</div>
	);
}
