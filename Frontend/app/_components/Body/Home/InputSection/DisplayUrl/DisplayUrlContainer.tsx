import DisplayUrl from "./DisplayUrl";

export default function DisplayUrlContainer({ code }: { code: string | undefined }) {
	return <div className="h-15 w-full flex justify-center items-center">{code && <DisplayUrl code={code} />}</div>;
}
