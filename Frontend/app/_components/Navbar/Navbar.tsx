import NavMenu from "./components/NavMenu";
import NavHome from "./components/NavHome";

type NavItemProp = {
	link: string;
	name: string;
};

export default function Navbar() {
	const NavItems: NavItemProp[] = [
		{
			name: "Hello World",
			link: "/hello-world",
		},
	];
	return (
		<nav className="bg-linear-to-bl from-[#471414] to-[#981f1f] p-3 custom-text-primary">
			<div className="grid grid-cols-[1fr_4fr_1fr] items-center">
				<div className="justify-self-start">
					<NavHome />
				</div>
				<div className="justify-self-center">
					<NavMenu NavItems={NavItems} />
				</div>
			</div>
		</nav>
	);
}
