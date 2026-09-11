import { useFormContext } from "@/hooks/useFormContext";
import { formInputStatusStyles } from "@/lib/utils";
import { useState } from "react";

export default function InputBox({ status }: { status: StatusProp }) {
	const [inputUrl, setInputUrl] = useState<string>("");
	const { isLoading } = useFormContext();

	return (
		<input
			className={`${formInputStatusStyles[status.state]} w-full z-10 origin-center bg-[#130b0b] outline-none focus:scale-100 hover:shadow-[0_0_10px_3px_rgba(0,0,0,0.25)] border-2 button-padding button-rounding text-lg font-bold overflow-hidden transition-[transform,box-shadow,border-color,color] duration-300`}
			name="inputUrl"
			value={inputUrl}
			type="text"
			autoComplete="off"
			placeholder="Example: google.com"
			onChange={(e) => setInputUrl(e.target.value)}
			disabled={isLoading}
		/>
	);
}
