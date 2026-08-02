import NavItem from "./NavItem";

export default function NavMenu({ NavItems }: { NavItems: NavItemProp[] }) {
	return (
		<div className="flex flex-row justify-center w-full">
			{NavItems.map((item, index) => (
				<NavItem
					key={index}
					NavItem={item}
				/>
			))}
		</div>
	);
}
