import WebArt from "./_components/Body/WebArt";
import AppDescription from "./_components/Body/AppDescription";
import DefaultGlass from "./_components/DefaultGlass";
import SectionTitle from "./_components/Body/SectionTitle";
import InputFormContainer from "./_components/Body/Home/UrlShortenerSection/InputForm/InputFormContainer";

export default function Home() {
	return (
		<>
			<div className="default-background-image" />
			<div className="flex flex-col gap-8 p-4">
				<WebArt />
				<DefaultGlass>
					<div className="flex flex-col gap-16">
						<SectionTitle text="Paste your url to explode it!" />
						<InputFormContainer />

						<AppDescription />
					</div>
				</DefaultGlass>
			</div>
		</>
	);
}
