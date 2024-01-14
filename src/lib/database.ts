import { Base } from "deta";

export enum DomainStatus {
    active = "active",
    inactive = "inactive",
    unknown = "unknown",
}

export enum ThreatType {
    malware = "malware",
    phishing = "phishing",
    scam = "scam",
    c2 = "c2",
    crypto_drainer = "crypto_drainer",
    unknown = "unknown",
}

export type Domain = {
    domain: string;
    url: string;
    host?: string;
    threat_type: ThreatType;
    status: DomainStatus;
    created_at: number;
    updated_at: number;
    key: string;
};

export type DomainDataInput = {
    domain: string;
    url?: string;
    host?: string;
    threat_type?: ThreatType;
    status?: DomainStatus;
};

export const getDatabase = () => {
    return Base("domains");
};

export const getDomains = async (params?: { status: DomainStatus }) => {
    const db = getDatabase();
    const data = await db.fetch(params);
    return data.items as Domain[];
};

export const putDomains = async (domains: DomainDataInput[]) => {
    const now = Math.floor(Date.now() / 1000);
    const data: Domain[] = domains.map((domain) => ({
        url: `https://${domain.domain}`,
        threat_type: ThreatType.unknown,
        status: DomainStatus.unknown,
        created_at: now,
        updated_at: now,
        key: domain.domain,
        ...domain,
    }));
    const db = getDatabase();
    await db.putMany(data);
};

export const updateDomain = async (domain: DomainDataInput) => {
    const now = Math.floor(Date.now() / 1000);
    const db = getDatabase();
    await db.update({ ...domain, updated_at: now }, domain.domain);
};
