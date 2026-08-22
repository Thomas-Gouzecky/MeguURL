export class ServiceUnavailableError extends Error {
	constructor(
		public error: ServiceUnavailableResponse,
		message: string,
	) {
		super(message);
		this.name = "ServiceUnavailableError";
	}
}
