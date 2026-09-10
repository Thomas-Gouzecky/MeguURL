"use client";

import { motion, Variants } from "motion/react";
import NavItem from "./NavItem";

export default function NavMenu({ NavItems }: { NavItems: NavItemProp[] }) {
	const variant: Variants = {
		hidden: {
			opacity: 1,
			transition: {
				staggerChildren: 0.2,
				staggerDirection: -1,
			},
		},
		visible: {
			opacity: 1,
			transition: {
				staggerChildren: 0.2,
			},
		},
	};
	return (
		<motion.div
			initial="hidden"
			animate="visible"
			variants={variant}
			className="flex flex-row justify-center w-full gap-4"
		>
			{NavItems.map((item, index) => (
				<NavItem
					key={index}
					NavItem={item}
				/>
			))}
		</motion.div>
	);
}
