import InputForm from "./InputForm";

export default function InputSection() {
	return (
		<div className="bg-blue-950 p-4 custom-text-primary w-[80%] max-w-4xl m-auto flex flex-col">
			<h1 className="w-fit">Paste your url to explode it!</h1>
			<InputForm />
		</div>
	);
}
