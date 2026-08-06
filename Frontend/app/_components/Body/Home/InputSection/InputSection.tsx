import InputForm from "./InputForm";

export default function InputSection() {
	return (
		<div className="bg-blue-950 p-4 custom-text-primary">
			<span>Paste your url to explode it!</span>
			<InputForm />
		</div>
	);
}
