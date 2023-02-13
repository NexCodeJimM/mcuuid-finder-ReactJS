import React, { useState } from "react";
import axios from "axios";

async function searchMinecraftUUID(username) {
	try {
		// Use the CORS proxy to make the request
		const response = await axios.get(
			`https://playerdb.co/api/player/minecraft/${username}`,
			{
				headers: {
					"User-Agent": "MyAppName/1.0",
				},
			}
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
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);

	async function handleSubmit(e) {
		e.preventDefault();
		setIsLoading(true);
		setError(null);
		setUUID("");
		setTrimmedUUID("");
		setAvatar("");

		try {
			const response = await searchMinecraftUUID(username);
			if (!response.data) {
				setError("Error: Unable to fetch UUID for the given username");
				setIsLoading(false);
				return;
			}

			const uuid = response.data.player.id; // Get full UUID.
			const trimmedUUID = response.data.player.raw_id; // Get trimmed UUID.
			const avatar = response.data.player.avatar; // Get player avatar.
			setUUID(uuid);
			setTrimmedUUID(trimmedUUID);
			setAvatar(avatar);
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
						<img src={avatar} alt="avatar" />
					</p>
				)
			)}
		</form>
	);
}

export default MinecraftUUIDSearch;
