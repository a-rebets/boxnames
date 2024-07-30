/// <reference types="astro/client" />
/// <reference types="astro-integration-lottie/env" />
interface ImportMeta {
	readonly env: ImportMetaEnv;
}

interface ImportMetaEnv {
	readonly SUPABASE_URL: string;
	readonly SUPABASE_ANON_KEY: string;
}
