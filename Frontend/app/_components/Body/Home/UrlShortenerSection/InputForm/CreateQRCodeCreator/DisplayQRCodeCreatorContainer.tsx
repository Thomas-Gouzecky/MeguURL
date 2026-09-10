import DisplayQRCodeCreator from "./DisplayQRCodeCreator";

export default function DisplayQRCodeCreatorContainer({ code }: { code: string | undefined }) {
	return (
		<div className="h-15 w-full flex justify-center items-center">
			<DisplayQRCodeCreator code={code} />
		</div>
	);
}
