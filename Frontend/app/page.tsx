import WebArt from "./_components/Body/Home/WebArt";
import UrlShortenerSection from "./_components/Body/Home/UrlShortenerSection/UrlShortenerSection";
import AppDescription from "./_components/Body/Home/AppDescription";
import DefaultGlass from "./_components/DefaultGlass";

export default function Home() {
	return (
		<>
			<div className="default-background-image" />
			<div className="flex flex-col gap-8 p-4">
				<WebArt />
				<DefaultGlass>
					<div className="flex flex-col gap-16">
						<UrlShortenerSection />

						<AppDescription />
					</div>
				</DefaultGlass>
			</div>
		</>
	);
}
