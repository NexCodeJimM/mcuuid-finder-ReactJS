import React, { useState, useEffect } from "react";

import "./Notification.css";

const Notification = ({ isCopied }) => {
	const [show, setShow] = useState(false);

	useEffect(() => {
		if (isCopied) {
			setShow(true);

			setTimeout(() => {
				setShow(false);
			}, 10000);
		}
	}, [isCopied]);

	return (
		<div className={`notification ${show ? "show" : ""}`}>
			Copied to clipboard.
		</div>
	);
};

export default Notification;
