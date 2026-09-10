import DisplayQRCodeCreator from "./DisplayQRCodeCreator";

export default function DisplayQRCodeCreatorContainer({ code }: { code: string | undefined }) {
	return (
		<div className="w-fit flex justify-center items-center bg-[#1f1414] border-2 border-[#402a2a] button-rounding">
			<DisplayQRCodeCreator code={code} />
		</div>
	);
}
