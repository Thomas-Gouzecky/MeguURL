export default function ClickableButton({ children }: { children: React.ReactElement }) {
	return (
		<div className="bg-[#471414] button-rounding clickable-text-color overflow-hidden flex max-w-sm max-h-12 border-transparent border-2 transition-all duration-300 hover:bg-[#260707] hover:inset-shadow-2xs hover:border-[#5E3131] hover:-translate-y-1 hover:shadow-[0px_6px_0px_rgba(0,0,0,0.2)] active:translate-y-0.5 active:shadow-none">
			{children}
		</div>
	);
}
