import React, { useState } from "react";
import Notification from "./Notification";

import "./Card.css";

const Card = (props) => {
	const [isCopied, setIsCopied] = useState(false);

	const fullUUIDCopyHandler = async () => {
		try {
			await navigator.clipboard.writeText(props.uuid);
			setIsCopied(true);
		} catch (err) {
			console.error("Failed to copy UUID: ", err);
		}
	};

	return (
		<div className="card">
			<div className="card-header">Search Results:</div>
			<div className="card-content">
				<div className="card__skin">
					<img src={props.skin} alt={props.title} />
				</div>
				<div className="card__information">
					<h5>Username</h5>
					<p>
						{props.title}{" "}
						<span>
							<img src={props.avatar} alt={props.title} />
						</span>
					</p>
					<h5>Full UUID</h5>
					<p>{props.uuid}</p>
					<h5>Trimmed UUID</h5>
					<p>{props.trimmedUUID}</p>

					<div className="copy-btns">
						<button className="clipboard-btn" onClick={fullUUIDCopyHandler}>
							Copy UUID
						</button>
						<Notification isCopied={isCopied} />
					</div>
				</div>
			</div>
		</div>
	);
};

export default Card;
