import NavMenu from "./components/NavMenu";
import NavHome from "./components/NavHome";
import { navItems } from "./components/navItems";

export default function Navbar() {
	return (
		<nav className="bg-linear-to-bl from-[#471414] to-[#981f1f] p-3 custom-text-primary m-5 rounded-xl">
			<div className="grid grid-cols-[1fr_4fr_1fr] items-center">
				<div className="justify-self-start">
					<NavHome />
				</div>
				<div className="justify-self-center">
					<NavMenu NavItems={navItems} />
				</div>
			</div>
		</nav>
	);
}
