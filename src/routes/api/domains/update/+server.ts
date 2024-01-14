import type { RequestHandler } from "./$types";
import { updateDomain } from "$lib/database";

export const PATCH: RequestHandler = async ({ request }) => {
    const domain = await request.json();
    await updateDomain(domain);
    return new Response(null, { status: 200 });
};
