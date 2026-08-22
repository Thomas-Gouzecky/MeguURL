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

			<span>{Error.detail}</span>
		</div>
	);
}
