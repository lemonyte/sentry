import { Base } from "deta";

export enum DomainStatus {
    active = "Active",
    inactive = "Inactive",
    unknown = "Unknown",
}

export enum ThreatType {
    malware = "Malware",
    phishing = "Phishing",
    scam = "Scam",
    c2 = "C&C Server",
    crypto_drainer = "Crypto drainer",
    unknown = "Unknown",
}

export type Domain = {
    key: string;
    domain: string;
    url: string;
    threat_type: ThreatType;
    host: string;
    status: DomainStatus;
    created_at: number;
    updated_at: number;
};

export const getDatabase = () => {
    return Base("domains");
};

export const getDomains = async (params?: { status: DomainStatus }) => {
    const db = getDatabase();
    const data = await db.fetch(params);
    return data.items as Domain[];
};

export const putDomains = async (domains: { domain: string; url: string; threat_type: ThreatType, host: string }[]) => {
    const now = Math.floor(Date.now() / 1000);
    const data: Domain[] = domains.map((domain) => ({
        ...domain,
        key: domain.domain,
        status: DomainStatus.active,
        created_at: now,
        updated_at: now,
    }));
    const db = getDatabase();
    await db.putMany(data);
};

export const updateDomain = async (domain: { domain: string; status: DomainStatus; threat_type?: ThreatType }) => {
    const now = Math.floor(Date.now() / 1000);
    const db = getDatabase();
    await db.update({ ...domain, updated_at: now }, domain.domain);
};
