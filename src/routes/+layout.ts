import { getDomains } from "$lib/database";
import type { LayoutLoad } from "./$types";

export const load: LayoutLoad = async () => {
    const domains = await getDomains();
    return {
        domains: domains,
    };
};
