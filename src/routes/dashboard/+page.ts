import { getDomains } from "$lib/database";
import type { PageLoad } from "./$types";

export const load: PageLoad = async () => {
    const domains = await getDomains();
    return {
        domains: domains,
    };
};
