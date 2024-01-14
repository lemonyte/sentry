import { error, json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";
import { getDomains, DomainStatus } from "$lib/database";

export const GET: RequestHandler = async ({ url }) => {
    const status = url.searchParams.get("status");
    if (status !== null && status !== "active" && status !== "inactive") {
        return error(400, "status must be either 'active' or 'inactive'");
    }
    const domains = await getDomains(status ? { status: DomainStatus[status] } : undefined);
    return json(domains);
};
