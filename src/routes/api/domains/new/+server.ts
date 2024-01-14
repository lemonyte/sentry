import type { RequestHandler } from "./$types";
import { putDomains } from "$lib/database";

export const POST: RequestHandler = async ({ request }) => {
    const domains = await request.json();
    await putDomains(domains);
    return new Response(null, { status: 201 });
};
