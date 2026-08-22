import Link from "next/link";
import ClickableButton from "../_components/ClickableButton";
import { HiMiniHome } from "react-icons/hi2";

export default function HomeButton() {
	return (
		<ClickableButton>
			<Link
				href="/"
				className="button-padding flex flex-row items-center justify-center gap-1.5 text-center text-lg font-bold"
			>
				<HiMiniHome
					size={24}
					className="-translate-y-0.5"
				/>
				<span>Home</span>
			</Link>
		</ClickableButton>
	);
}
