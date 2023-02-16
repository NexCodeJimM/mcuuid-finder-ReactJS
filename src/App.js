import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "./components/Header";
import MessageBox from "./components/MessageBox";
import Footer from "./components/Footer";
import Card from "./components/Card";

import "./App.css";

async function searchMinecraftUUID(username) {
	try {
		// Use the CORS proxy to make the request
		const response = await axios.get(
			`https://api.mcservertools.net/api/user/${username}`
		);
		return response.data;
	} catch (error) {
		console.error(error);
		return error;
	}
}

function MinecraftUUIDSearch() {
	const [username, setUsername] = useState(
		new URLSearchParams(window.location.search).get("username") || ""
	);
	const [usernameResult, setUsernameResult] = useState("");
	const [uuid, setUUID] = useState("");
	const [trimmedUUID, setTrimmedUUID] = useState("");
	const [avatar, setAvatar] = useState("");
	const [avatarBody, setAvatarBody] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);

	useEffect(() => {
		const params = new URLSearchParams(window.location.search);
		const username = params.get("username");
		if (username) {
			setUsername(username);
		}
	}, []);

	async function handleSubmit(e) {
		e.preventDefault();
		setIsLoading(true);
		setError(null);
		setUUID("");
		setTrimmedUUID("");
		setAvatar("");
		setAvatarBody("");

		try {
			const response = await searchMinecraftUUID(username);
			console.log(response); // Log the response from the API.
			if (!response.uuid) {
				setError("Error: Unable to fetch data for the given username/UUID.");
				setIsLoading(false);
				return;
			}

			const usernameResult = response.username; // Get Username.
			const uuid = response.formatted_uuid; // Get full UUID.
			const trimmedUUID = response.uuid; // Get trimmed UUID.
			const avatar = response.skin_url; // Get player avatar.
			const avatar_body = response.skin_body; // Get player full body avatar.
			setUsernameResult(usernameResult);
			setUUID(uuid);
			setTrimmedUUID(trimmedUUID);
			setAvatar(avatar);
			setAvatarBody(avatar_body);

			window.history.pushState({}, "", `?profile=${username}`);
		} catch (error) {
			setError("Error: " + error.message);
		} finally {
			setIsLoading(false);
		}
	}

	const resetSearch = () => {
		setUsername("");
		setUUID("");
		setUsernameResult("");
		setError("");
		setIsLoading(false);
		setAvatar("");
		setAvatarBody("");
		setTrimmedUUID("");
	};

	return (
		<React.Fragment>
			<Header handleReset={resetSearch} />
			<div className="content-form">
				<div className="title-header">
					<h1>
						Lookup a <span>Minecraft</span> User
					</h1>
					<h4>Enter the Minecraft username or UUID to lookup a player.</h4>
				</div>

				<form onSubmit={handleSubmit}>
					<input
						type="text"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						placeholder="Notch or 069a79f4-44e9-4726-a5be-fca90e38aaf5"
					/>
					<button className="search-btn" type="submit">
						Search
					</button>
				</form>
				{error && <MessageBox message={error} type="danger" />}
				{isLoading ? (
					<MessageBox message="Loading..." type="submit" />
				) : (
					uuid && (
						<Card
							title={usernameResult}
							avatar={avatar}
							skin={avatarBody}
							uuid={uuid}
							trimmedUUID={trimmedUUID}
						/>
					)
				)}
			</div>
			<Footer />
		</React.Fragment>
	);
}

export default MinecraftUUIDSearch;
