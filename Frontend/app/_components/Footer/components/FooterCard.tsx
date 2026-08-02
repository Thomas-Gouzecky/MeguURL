export default function FootCard({
	children,
	FooterProps,
}: {
	children: React.ReactElement | React.ReactElement[];
	FooterProps?: FooterCardProp;
}) {
	const Title = FooterProps?.title;

	return (
		<div className="p-4 w-fit rounded-xl bg-[#211615] border-3 border-[#332320] shadow-md h-fit flex flex-col items-center">
			{Title ? (
				<div className="w-full flex flex-col items-center">
					<h1 className="text-md font-bold custom-text-primary">{Title}</h1>
					<div className="h-0.5 w-2/3 my-2 bg-linear-to-r from-transparent via-[#2f251c] to-transparent rounded-full transform group-hover:w-full transition-all duration-500 animate-pulse" />
				</div>
			) : null}
			{children}
		</div>
	);
}
