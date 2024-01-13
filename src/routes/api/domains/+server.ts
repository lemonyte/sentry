import { error, json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";
import { getDomains, putDomains, updateDomain, DomainStatus } from "$lib/database";

export const GET: RequestHandler = async ({ url }) => {
    const status = url.searchParams.get("status");
    if (status !== null && status !== "active" && status !== "inactive") {
        return error(400, "status must be either 'active' or 'inactive'");
    }
    const domains = await getDomains(status ? { status: DomainStatus[status] } : undefined);
    return json(domains);
};

export const POST: RequestHandler = async ({ request }) => {
    const domains = await request.json();
    await putDomains(domains);
    return new Response(null, { status: 201 });
};

export const PATCH: RequestHandler = async ({ request }) => {
    const domain = await request.json();
    await updateDomain(domain);
    return new Response(null, { status: 200 });
};
