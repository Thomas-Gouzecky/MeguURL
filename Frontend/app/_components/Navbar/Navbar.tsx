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
			<div>
				<NavHome />
				<NavMenu NavItems={NavItems} />
			</div>
		</nav>
	);
}
