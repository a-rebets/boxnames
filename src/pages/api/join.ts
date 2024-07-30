import { supabase } from "@/lib/supabase";
import type { APIRoute } from "astro";

async function getGameData(code: string) {
	const { data, error } = await supabase
		.from("games")
		.select()
		.eq("game_code", code);
	if (error) {
		console.error("Error getting game data:", error);
		return null;
	}
	return data;
}

export const POST: APIRoute = async ({ request }) => {
	const { game_code, game_pin } = await request.json();
	if (!game_code || !game_pin) {
		return new Response(null, { status: 400 });
	}
	const dbData = await getGameData(game_code);
	if (!dbData) {
		return new Response(null, { status: 404 });
	}
	const game = dbData[0];
	if (game.game_pin !== game_pin) {
		return new Response(null, { status: 401 });
	}
	const newCookie = `${game_code}|${game_pin}`;
	return new Response(JSON.stringify(game), {
		headers: {
			"Set-Cookie": `game=${newCookie}; HttpOnly; Path=/`,
		},
	});
};
