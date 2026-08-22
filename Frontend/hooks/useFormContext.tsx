"use client";

import { createContext, useContext } from "react";

interface FormContextType {
	isLoading: boolean;
}

const FormContext = createContext<FormContextType | null>(null);

export function FormProvider({ isLoading, children }: { isLoading: boolean; children: React.ReactNode }) {
	return <FormContext.Provider value={{ isLoading }}>{children}</FormContext.Provider>;
}

export function useFormContext() {
	const context = useContext(FormContext);

	if (!context) {
		throw new Error("useFormContext must be used inside FormProvider");
	}

	return context;
}
