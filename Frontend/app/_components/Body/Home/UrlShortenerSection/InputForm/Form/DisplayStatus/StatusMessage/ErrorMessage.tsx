import Link from "next/link";

export default function ErrorMessage({ Error }: { Error: PostUrlErrorResponse }) {
	return (
		<div className="flex flex-col min-w-0">
			<div className="flex min-w-0 w-full">
				<div className="shrink-0">
					<span>{Error.status}</span>
					<span>&nbsp;-&nbsp;{Error.title}</span>
				</div>

				{Error.url && (
					<div className="flex min-w-0 shrink">
						<span>:&nbsp;</span>
						<Link
							className="min-w-0 overflow-hidden text-ellipsis whitespace-nowrap clickable-text-color transition-all duration-500"
							href={Error.url!}
							target="_blank"
						>
							{Error.url}
						</Link>
					</div>
				)}
			</div>

			{/* Quick dirty fix (i will fix this response in the backend properly later) */}
			{Error.title === "URL Does Not Exist" ? (
				<div className="w-full min-w-0 flex flex-row">
					<div className="flex min-w-0 shrink">
						<span className="shrink-0">'</span>

						<Link
							className="min-w-0 overflow-hidden text-ellipsis whitespace-nowrap clickable-text-color transition-all duration-500"
							href={Error.url!}
							target="_blank"
						>
							{Error.url}
						</Link>

						<span className="shrink-0">'</span>
					</div>

					<span className="shrink-0">&nbsp;does not currently exist.</span>
				</div>
			) : (
				<span>{Error.detail}</span>
			)}
		</div>
	);
}
