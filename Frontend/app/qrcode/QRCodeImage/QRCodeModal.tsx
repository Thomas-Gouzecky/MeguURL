import { AnimatePresence, motion } from "motion/react";
import { IoClose } from "react-icons/io5";
import { createPortal } from "react-dom";
import QRCodeImage from "./QRCodeImage";
import { useState, useSyncExternalStore } from "react";
import DefaultGlass from "@/app/_components/DefaultGlass";

export default function QRCodeModal({ QRCode }: { QRCode: React.ReactNode }): React.JSX.Element | null {
	const [dismissedQRCode, setDismissedQRCode] = useState<React.ReactNode>(null);
	const [QRCodeSize, setQRCodeSize] = useState<QRCodeSize>("medium");
	const modalOpen = Boolean(QRCode) && QRCode !== dismissedQRCode;
	const mounted = useSyncExternalStore(
		() => () => {},
		() => true,
		() => false,
	);

	const handleClose = () => {
		setDismissedQRCode(QRCode);
		setQRCodeSize("medium");
	};

	const content = (
		<>
			<AnimatePresence>
				{modalOpen && QRCode && (
					<motion.div
						className="z-99 fixed inset-0 flex w-full flex-col items-center justify-center"
						initial={{ scale: 0.2, opacity: 0 }}
						animate={{
							scale: 1,
							opacity: 1,
							transition: { duration: 0.3, type: "spring", stiffness: 400, damping: 20 },
						}}
						exit={{ scale: 0.2, opacity: 0, transition: { ease: "easeInOut", duration: 0.2 } }}
					>
						<ModalContents
							handleClose={handleClose}
							setQRCodeSize={setQRCodeSize}
							QRCode={QRCode}
							QRCodeSize={QRCodeSize}
						/>
					</motion.div>
				)}
			</AnimatePresence>

			{QRCode && !modalOpen && (
				<button
					type="button"
					className="fixed right-4 bottom-4 z-99 rounded border bg-white px-4 py-2 text-sm shadow"
					onClick={() => setDismissedQRCode(null)}
				>
					Show QR code
				</button>
			)}
		</>
	);

	return mounted ? createPortal(content, document.body) : null;
}

function CloseButton({ handleClose }: { handleClose: () => void }) {
	return (
		<motion.button
			onClick={handleClose}
			initial={{ rotate: 0 }}
			whileHover={{ rotate: 90 }}
			className="absolute top-2 right-2 z-10 cursor-pointer text-gray-500 transition-colors duration-200 hover:text-gray-700"
		>
			<IoClose size={32} />
		</motion.button>
	);
}

function ModalContents({
	handleClose,
	setQRCodeSize,
	QRCode,
	QRCodeSize,
}: {
	handleClose: () => void;
	setQRCodeSize: React.Dispatch<React.SetStateAction<QRCodeSize>>;
	QRCode: React.ReactNode;
	QRCodeSize: QRCodeSize;
}) {
	return (
		<DefaultGlass>
			<div className="relative flex w-full max-w-lg flex-row items-center justify-center gap-4">
				<CloseButton handleClose={handleClose} />
				<div className="relative w-full flex flex-col justify-center">
					<AnimatePresence>
						<QRCodeImage
							QRCode={QRCode}
							Size={QRCodeSize}
						/>
					</AnimatePresence>
					<QRCodeSizes setQRCodeSize={setQRCodeSize} />
				</div>
			</div>
		</DefaultGlass>
	);
}

function QRCodeSizes({ setQRCodeSize }: { setQRCodeSize: React.Dispatch<React.SetStateAction<QRCodeSize>> }) {
	const sizes: QRCodeSize[] = ["small", "medium", "large"];

	return (
		<div className="mt-4 flex w-full flex-row items-center justify-around gap-4 text-sm text-gray-500">
			{sizes.map((size) => (
				<motion.button
					key={size}
					initial={{ scale: 1 }}
					whileHover={{ scale: 1.05 }}
					whileTap={{ scale: 0.95 }}
					transition={{ type: "spring", stiffness: 400, damping: 20 }}
					onClick={() => setQRCodeSize(size)}
				>
					<div className="button-padding button-rounding">
						Size: {size.charAt(0).toUpperCase() + size.slice(1)}
					</div>
				</motion.button>
			))}
		</div>
	);
}
