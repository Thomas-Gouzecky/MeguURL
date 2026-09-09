"use client";

import { motion, Variants } from "motion/react";
import Link from "next/link";

import { usePathname } from "next/navigation";

export default function NavItem({ NavItem }: { NavItem: NavItemProp }) {
	const pathname = usePathname();
	const active = pathname === NavItem.href;

	const checkActive: Variants = {
		hidden: {
			opacity: 0,
			scale: 0.95,
		},
		visible: {
			opacity: active ? 0.5 : 1,
			scale: 1,
		},
	};

	const defaultItem: Variants = {
		hidden: {
			opacity: 0,
			scale: 0.95,
		},
		visible: {
			opacity: 1,
			scale: 1,
			backgroundColor: active ? "rgba(0, 0, 0, 0)" : "#981f1f",
			transition: {
				type: "spring",
			},
		},
		hover: {
			scale: 1.05,
			backgroundColor: "#981f1f",
		},
		tap: {
			scale: 0.95,
			backgroundColor: "#7a1a1a",
		},
	};

	return (
		<motion.div
			variants={checkActive}
			className="relative"
		>
			<Link
				href={NavItem.href}
				aria-disabled={active}
				className={`button-rounding ${active ? "pointer-events-none" : ""}`}
			>
				<motion.div
					className={`relative button-padding button-rounding text-2xl text-shadow-md font-bold`}
					variants={defaultItem}
					layout
					whileHover={active ? undefined : "hover"}
					whileTap="tap"
				>
					{NavItem.name}
				</motion.div>
			</Link>
		</motion.div>
	);
}
