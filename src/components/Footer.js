import React from "react";

import "./Footer.css";

const Footer = () => {
	return (
		<div className="footer-main">
			<div className="footer__content">
				<div className="footer__description">
					<h1>What is MCIdentify?</h1>
					<p>
						MCIdentify is a website dedicated to helping Minecraft players find
						their unique user identification numbers (UUIDs). Our easy-to-use
						search function allows users to enter their Minecraft username and
						receive their UUID in a matter of seconds. Our mission is to
						simplify the process of accessing this important information, making
						it easier for players to connect with others, join servers, and
						fully enjoy the Minecraft experience.
					</p>

					<p>
						Thanks to{" "}
						<a href="https://mc-heads.net" target="_blank" rel="noreferrer">
							MCHeads
						</a>{" "}
						for providing Minecraft avatars.
					</p>

					<p>MCIdentify is not affiliated with Mojang AB.</p>
				</div>
			</div>

			<div className="copyright">
				<p>
					Copyright © 2023{" "}
					<a href="https://jimmendoza.com" target="_blank" rel="noreferrer">
						Jim Mendoza
					</a>
					. All rights reserved.
				</p>
			</div>
		</div>
	);
};

export default Footer;
