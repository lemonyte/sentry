import { getDomains } from "$lib/database";
import type { LayoutLoad } from "./$types";

export const load: LayoutLoad = async ({ depends }) => {
    depends("app:domains");
    return {
        domains: await getDomains(),
    };
};
