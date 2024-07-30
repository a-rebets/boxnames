import { supabase } from "@/lib/supabase";
import type { APIRoute } from "astro";

async function checkGameExists(gameCode: string) {
	const { data, error } = await supabase
		.from("games")
		.select("game_code")
		.eq("game_code", gameCode);
	if (error) {
		console.error("Error checking game existence:", error);
		return false;
	}
	return data.length > 0;
}

export const GET: APIRoute = async ({ request }) => {
	const url = new URL(request.url);
	const gameCode = url.searchParams.get("code");
	if (!gameCode || gameCode.length !== 6) {
		return new Response(null, { status: 400 });
	}
	const dbCheck = await checkGameExists(gameCode);
	return dbCheck ? new Response("ok") : new Response(null, { status: 404 });
};
