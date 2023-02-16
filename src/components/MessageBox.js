import React from "react";

import "./MessageBox.css";

const MessageBox = (props) => {
	const messageClass = `message-main message-${props.type || "submit"}`;

	return (
		<div className={messageClass}>
			<h4>{props.message}</h4>
		</div>
	);
};

export default MessageBox;
