import React from "react";
import "./MinecraftHeadCarousel.css";

const MinecraftHeadCarousel = () => {
	const images = [
		"https://minotar.net/helm/Notch/100.png",
		"https://minotar.net/helm/Steve/100.png",
		"https://minotar.net/helm/Alex/100.png",
		"https://minotar.net/helm/Herobrine/100.png",
	];

	return (
		<div className="minecraft-head-carousel infinite">
			{images.map((image, index) => (
				<div
					key={index}
					className={`minecraft-head-carousel__item ${
						index === 0 ? "active" : ""
					}`}
				>
					<div className="minecraft-head-carousel__item-inner">
						<img src={image} alt={`Minecraft Head ${index}`} />
					</div>
				</div>
			))}
		</div>
	);
};

export default MinecraftHeadCarousel;
