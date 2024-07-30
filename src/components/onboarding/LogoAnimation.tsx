import { useCallback, useEffect, useState } from "react";

const LogoAnimation = ({ children }: { children: React.ReactNode }) => {
	const [isPlaying, setIsPlaying] = useState(false);

	const playAnimation = useCallback(() => {
		const astroLottie = window.astroLottie;
		if (!astroLottie) {
			console.log("Lottie is not registered!");
		} else {
			const animations = astroLottie.getAllAnimations();
			if (animations.length > 0) {
				for (const animation of animations) {
					animation.player?.play();
				}
				setTimeout(() => {
					document.documentElement.classList.add("intro-done");
				}, 3500);
				setTimeout(() => {
					document.documentElement.classList.add("intro-off");
				}, 5000);
			}
		}
	}, []);

	useEffect(() => {
		if (isPlaying) {
			setTimeout(() => {
				playAnimation();
			}, 1000);
		}
	}, [playAnimation, isPlaying]);

	// delay 3 secs
	useEffect(() => {
		setTimeout(() => {
			setIsPlaying(true);
		}, 2000);
	}, []);

	return (
		<div
			className={`flex flex-col items-center justify-center w-full absolute top-0 left-0 px-3 gap-20 transition-opacity duration-1000 ${
				isPlaying ? "opacity-0" : "opacity-100"
			}`}
		>
			{children}
			<p className="text-xl animate-bounce dark:text-neutral-50">
				Please stand by...
			</p>
		</div>
	);
};

export default LogoAnimation;
