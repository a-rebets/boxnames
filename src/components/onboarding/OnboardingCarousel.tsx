import {
	Carousel,
	CarouselItem,
	CarouselContent,
	CarouselNext,
	type CarouselApi,
	CarouselPrevious,
} from "@/components/ui/carousel";
import allCards from "./cards";
import { Progress } from "../ui/progress";
import { useEffect, useState } from "react";
import UserCard from "./UserCard";
import { CookiesProvider } from "react-cookie";

const OnboardingCarousel = () => {
	const [api, setApi] = useState<CarouselApi>();
	const [progress, setProgress] = useState(0);

	useEffect(() => {
		if (!api) {
			return;
		}
		api.on("select", () => {
			setProgress((api.selectedScrollSnap() / allCards.length) * 100);
		});
	}, [api]);

	const isFirstCard = progress === 0;
	const isLastCard = progress === 100;

	return (
		<CookiesProvider defaultSetOptions={{ path: "/" }}>
			<Carousel
				className="w-full max-w-xl hidden group-[.intro-off]:block"
				setApi={setApi}
				opts={{
					watchDrag: false,
				}}
			>
				<Progress
					value={progress}
					className={`dark:bg-neutral-700 w-1/2 absolute -top-20 left-1/2 -translate-x-1/2 h-1.5 transition-opacity opacity-100 ${isLastCard ? "opacity-0" : ""}`}
				/>
				<CarouselContent className="items-center">
					{allCards.map(({ key, node }) => (
						<CarouselItem key={key}>
							<div className="p-1">{node}</div>
						</CarouselItem>
					))}
					<CarouselItem key="user-card">
						<div className="p-1">
							<UserCard />
						</div>
					</CarouselItem>
				</CarouselContent>
				{!isFirstCard && (
					<CarouselPrevious className="hover:dark:bg-neutral-700 dark:text-neutral-50" />
				)}
				{!isLastCard && (
					<CarouselNext className="hover:dark:bg-neutral-700 dark:text-neutral-50" />
				)}
			</Carousel>
		</CookiesProvider>
	);
};

export default OnboardingCarousel;
