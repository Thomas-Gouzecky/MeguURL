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
			opacity: 1,
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
			transition: {
				type: "spring",
			},
		},
		hover: {
			scale: 1.05,
			backgroundColor: "rgba(0, 0, 0, 0.1)",
		},
		tap: {
			scale: 0.95,
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
				aria-current={active ? "page" : undefined}
				tabIndex={active ? -1 : undefined}
				onClick={(event) => {
					if (active) event.preventDefault();
				}}
				className={`button-rounding ${active ? "pointer-events-none" : ""}`}
			>
				<motion.div
					key={`${NavItem.href}-${pathname}`}
					className="relative button-padding button-rounding text-2xl text-shadow-md font-bold"
					variants={defaultItem}
					animate={{
						backgroundColor: active ? "#981f1f" : "rgba(0, 0, 0, 0)",
						scale: 1,
					}}
					transition={{
						backgroundColor: { duration: 0.25, ease: "easeOut" },
						scale: { type: "spring", stiffness: 400, damping: 25 },
					}}
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
