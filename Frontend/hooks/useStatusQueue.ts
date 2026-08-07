import { useState } from "react";

export default function useStatusQueue() {
	const [statusQueue, setStatusQueue] = useState<StatusItem[]>([{ id: crypto.randomUUID(), status: "idle" }]);

	const pushStatus = (status: StatusItem) => {
		setStatusQueue((prev) => [status, ...prev].slice(0, 5));
	};

	const popStatus = (id: string) => {
		setStatusQueue((prev) => prev.filter((status) => status.id !== id));
	};

	const clearStatuses = () => {
		setStatusQueue([]);
	};

	return {
		statusQueue,
		pushStatus,
		popStatus,
		clearStatuses,
	};
}
