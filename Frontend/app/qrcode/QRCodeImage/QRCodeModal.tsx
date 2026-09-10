import { AnimatePresence, motion } from "motion/react";
import { IoClose } from "react-icons/io5";
import { createPortal } from "react-dom";
import QRCodeImage from "./QRCodeImage";
import { useState, useSyncExternalStore } from "react";

export default function QRCodeModal({ QRCode }: { QRCode: React.ReactNode }): React.JSX.Element | null {
	const [dismissedQRCode, setDismissedQRCode] = useState<React.ReactNode>(null);
	const modalOpen = Boolean(QRCode) && QRCode !== dismissedQRCode;
	const mounted = useSyncExternalStore(
		() => () => {},
		() => true,
		() => false,
	);

	const handleClose = () => {
		setDismissedQRCode(QRCode);
	};

	const content = (
		<>
			<AnimatePresence>
				{modalOpen && QRCode && (
					<motion.div
						className="z-99 fixed inset-0 flex w-full flex-col items-center justify-center"
						initial={{ y: 200, opacity: 0 }}
						animate={{ y: 0, opacity: 1 }}
						exit={{ y: 200, opacity: 0 }}
					>
						<div className="relative w-full max-w-md">
							<CloseButton handleClose={handleClose} />
							<QRCodeImage QRCode={QRCode} />
						</div>
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
