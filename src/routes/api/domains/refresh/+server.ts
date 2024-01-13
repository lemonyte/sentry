import type { RequestHandler } from "./$types";
import { refreshDomains } from "$lib/refresh";

export const GET: RequestHandler = async () => {
    await refreshDomains();
    return new Response(null, { status: 200 });
};
