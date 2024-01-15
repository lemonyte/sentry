import { Base } from "deta";

export enum DomainStatus {
    unknown = "unknown",
    active = "active",
    inactive = "inactive",
}

export enum ThreatType {
    unknown = "unknown",
    malware = "malware",
    phishing = "phishing",
    scam = "scam",
    c2 = "c2",
    crypto_drainer = "crypto_drainer",
}

export type Domain = {
    domain: string;
    url: string;
    host: string;
    threat_type: ThreatType;
    status: DomainStatus;
    created_at: number;
    updated_at: number;
    key: string;
};

export type DomainDataInput = {
    domain: string;
    url?: string;
    host?: string | null;
    threat_type?: ThreatType | null;
    status?: DomainStatus | null;
};

const inputToDomain = (input: DomainDataInput): Domain => {
    const now = Math.floor(Date.now() / 1000);
    return {
        domain: input.domain,
        url: input.url || `https://${input.domain}`,
        host: input.host || "",
        threat_type: input.threat_type || ThreatType.unknown,
        status: input.status || DomainStatus.unknown,
        created_at: now,
        updated_at: now,
        key: input.domain,
    };
};

export const getDatabase = () => {
    return Base("domains");
};

export const getDomains = async (params?: { status: DomainStatus }) => {
    const db = getDatabase();
    const data = await db.fetch(params);
    return data.items as Domain[];
};

export const putDomains = async (data: DomainDataInput[]) => {
    const domains = data.map((input) => inputToDomain(input));
    const db = getDatabase();
    await db.putMany(domains);
};

export const updateDomain = async (domain: DomainDataInput) => {
    const now = Math.floor(Date.now() / 1000);
    const db = getDatabase();
    await db.update({ ...domain, updated_at: now }, domain.domain);
};
