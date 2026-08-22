import Link from "next/link";

export default function ErrorMessage({ Error }: { Error: PostUrlErrorResponse }) {
	return (
		<div className="flex flex-col min-w-0">
			<div className="flex min-w-0">
				<span className="shrink-0">
					{Error.status} - {Error.title}
				</span>

				{Error.url && (
					<span className="min-w-0 overflow-hidden text-ellipsis whitespace-nowrap">
						:&nbsp;
						<Link
							href={Error.url!}
							target="_blank"
						>
							{Error.url}
						</Link>
					</span>
				)}
			</div>

			{/* Quick dirty fix (i will fix this response in the backend properly later) */}
			{Error.title === "URL Does Not Exist" ? (
				<div className="w-full min-w-0 flex flex-row">
					<div className="flex min-w-0 shrink">
						<span className="shrink-0">'</span>

						<Link
							className="min-w-0 overflow-hidden text-ellipsis whitespace-nowrap"
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
