import { supabase } from "@/lib/supabase";
import type { APIRoute } from "astro";
const { createHash } = await import("node:crypto");

function hashUserData(userData: string) {
	return createHash("sha256").update(userData).digest("hex");
}

async function createGame(gameCode: number, gamePin: number, userData: string) {
	const userHash = hashUserData(userData);
	const { data, error } = await supabase
		.from("games")
		.insert([{ game_code: gameCode, game_pin: gamePin, user_hash: userHash }])
		.select();

	if (error) {
		console.error("Error creating game:", error);
		return null;
	}
	return data;
}

export const POST: APIRoute = async ({ request, cookies }) => {
	const userData = cookies.get("user")?.value || "";
	if (!userData) {
		return new Response(JSON.stringify({ error: "No user data found" }), {
			status: 400,
		});
	}
	const formData = await request.json();
	const gamePin = formData.pin || "";
	if (!gamePin || gamePin.length > 10) {
		return new Response(JSON.stringify({ error: "Invalid game pin" }), {
			status: 400,
		});
	}
	const newGameCode = Math.floor(Math.random() * 899999) + 100000;
	const data = await createGame(newGameCode, gamePin, userData);
	if (!data) {
		return new Response(JSON.stringify({ error: "Error creating game" }), {
			status: 500,
		});
	}
	const newCookie = `${newGameCode}|${gamePin}`;
	return new Response(JSON.stringify({ newGameCode: gamePin }), {
		headers: {
			"Set-Cookie": `game=${newCookie}; HttpOnly; Path=/`,
		},
	});
};
