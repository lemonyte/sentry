import { getDomains, updateDomain, DomainStatus } from "./database";

export const refreshDomains = async () => {
    const domains = await getDomains();
    for (const domain of domains) {
        try {
            const response = await fetch(domain.url);
            await updateDomain({ domain: domain.domain, status: DomainStatus.active });
        } catch (error) {
            await updateDomain({ domain: domain.domain, status: DomainStatus.inactive });
        }
    }
};
