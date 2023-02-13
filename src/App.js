import React, { useState } from "react";
import axios from "axios";

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
	const [username, setUsername] = useState("");
	const [uuid, setUUID] = useState("");
	const [trimmedUUID, setTrimmedUUID] = useState("");
	const [avatar, setAvatar] = useState("");
	const [avatarBody, setAvatarBody] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);

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
				setError("Error: Unable to fetch UUID for the given username");
				setIsLoading(false);
				return;
			}

			const uuid = response.formatted_uuid; // Get full UUID.
			const trimmedUUID = response.uuid; // Get trimmed UUID.
			const avatar = response.skin_url; // Get player avatar.
			const avatar_body = response.skin_body; // Get player full body avatar
			setUUID(uuid);
			setTrimmedUUID(trimmedUUID);
			setAvatar(avatar);
			setAvatarBody(avatar_body);
		} catch (error) {
			setError("Error: " + error.message);
		} finally {
			setIsLoading(false);
		}
	}

	return (
		<form onSubmit={handleSubmit}>
			<label>
				Minecraft username:
				<input
					type="text"
					value={username}
					onChange={(e) => setUsername(e.target.value)}
				/>
			</label>
			<input type="submit" value="Search" />
			{error && <p>{error}</p>}
			{isLoading ? (
				<p>Loading...</p>
			) : (
				uuid && (
					<p>
						Full UUID: {uuid} &nbsp; Trimmed UUID: {trimmedUUID} &nbsp; Avatar:{" "}
						<img src={avatarBody} alt="avatar-body" /> &nbsp;{" "}
						<img src={avatar} alt="avatar" />
					</p>
				)
			)}
		</form>
	);
}

export default MinecraftUUIDSearch;
