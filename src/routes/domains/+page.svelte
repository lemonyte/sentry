<script lang="ts">
    import type { PageData } from "./$types";
    import { relativeTimeFromDate } from "$lib/time";
    import type { Domain } from "$lib/database";
    import { DomainStatus, ThreatType } from "$lib/database";
    import {
        Table,
        TableBody,
        TableBodyCell,
        TableBodyRow,
        TableHead,
        TableHeadCell,
        Indicator,
        Badge,
        Input,
        MultiSelect,
    } from "flowbite-svelte";
    import { writable } from "svelte/store";

    export let data: PageData;

    let filter = {
        domain: "",
        url: "",
        host: "",
        threatTypes: [] as ThreatType[],
        statuses: [] as DomainStatus[],
    };
    $: filteredItems = data.domains.filter(
        (domain) =>
            domain.domain.toLowerCase().indexOf(filter.domain.toLowerCase()) !== -1 &&
            domain.url.toLowerCase().indexOf(filter.url.toLowerCase()) !== -1 &&
            domain.host.toLowerCase().indexOf(filter.host.toLowerCase()) !== -1 &&
            (filter.threatTypes.length === 0 || filter.threatTypes.includes(domain.threat_type)) &&
            (filter.statuses.length === 0 || filter.statuses.includes(domain.status)),
    );

    const sortKey = writable<keyof Domain>("created_at"); // default sort key
    const sortDirection = writable(-1); // default sort direction (descending)
    $: sortedItems = writable(filteredItems); // make a copy of the items array

    // Define a function to sort the items
    const sortTable = (key: keyof Domain) => {
        // If the same key is clicked, reverse the sort direction
        if ($sortKey === key) {
            sortDirection.update((val) => -val);
        } else {
            sortKey.set(key);
            sortDirection.set(1);
        }
    };

    $: {
        const key = $sortKey;
        const direction = $sortDirection;
        const sorted = [...$sortedItems].sort((a, b) => {
            const aVal = a[key];
            const bVal = b[key];
            if (aVal < bVal) {
                return -direction;
            } else if (bVal < aVal) {
                return direction;
            }
            return 0;
        });
        sortedItems.set(sorted);
    }
</script>

<div class="flex flex-row space-x-4 px-16">
    <div class="flex flex-col space-y-2 h-min sticky top-1">
        <h3 class="text-xl">Filters</h3>
        <Input placeholder="Domain" bind:value={filter.domain} />
        <Input placeholder="URL" bind:value={filter.url} />
        <Input placeholder="Host" bind:value={filter.host} />
        <MultiSelect
            placeholder="Threat type"
            bind:value={filter.threatTypes}
            items={Object.entries(ThreatType).map(([key, value]) => ({ value: key, name: value }))}
        />
        <MultiSelect
            placeholder="Status"
            bind:value={filter.statuses}
            items={Object.entries(DomainStatus).map(([key, value]) => ({ value: key, name: value }))}
        />
    </div>
    <Table striped={true}>
        <caption class="p-2 text-lg font-semibold text-left text-gray-900 bg-white dark:text-white dark:bg-gray-800">
            <p class="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">
                Loaded {$sortedItems.length} entries.
            </p>
        </caption>
        <TableHead>
            <TableHeadCell
                class="dark:hover:text-white transition-all cursor-pointer"
                on:click={() => sortTable("domain")}>Domain</TableHeadCell
            >
            <TableHeadCell
                class="dark:hover:text-white transition-all cursor-pointer"
                on:click={() => sortTable("status")}>Status</TableHeadCell
            >
            <TableHeadCell
                class="dark:hover:text-white transition-all cursor-pointer"
                on:click={() => sortTable("threat_type")}>Threat type</TableHeadCell
            >
            <TableHeadCell
                class="dark:hover:text-white transition-all cursor-pointer"
                on:click={() => sortTable("host")}>Host</TableHeadCell
            >
            <TableHeadCell
                class="dark:hover:text-white transition-all cursor-pointer"
                on:click={() => sortTable("created_at")}>Created</TableHeadCell
            >
            <TableHeadCell
                class="dark:hover:text-white transition-all cursor-pointer"
                on:click={() => sortTable("updated_at")}>Updated</TableHeadCell
            >
        </TableHead>
        <TableBody>
            {#each $sortedItems as domain}
                <TableBodyRow>
                    <TableBodyCell
                        ><a href={domain.url} class="hover:text-primary-500 transition-all">{domain.domain}</a
                        ></TableBodyCell
                    >
                    <TableBodyCell>
                        <Badge
                            color={domain.status === DomainStatus.inactive
                                ? "green"
                                : domain.status === DomainStatus.active
                                  ? "red"
                                  : "dark"}
                            rounded
                        >
                            <Indicator
                                color={domain.status === DomainStatus.inactive
                                    ? "green"
                                    : domain.status === DomainStatus.active
                                      ? "red"
                                      : "gray"}
                                size="xs"
                                class="me-1"
                            />{domain.status
                                ? domain.status.charAt(0).toUpperCase() + domain.status.substring(1)
                                : "Unknown"}
                        </Badge>
                    </TableBodyCell>
                    <TableBodyCell>
                        {domain.threat_type
                            ? domain.threat_type.charAt(0).toUpperCase() + domain.threat_type.substring(1)
                            : "Unknown"}
                    </TableBodyCell>
                    <TableBodyCell>
                        {domain.host ? domain.host.charAt(0).toUpperCase() + domain.host.substring(1) : "Unknown"}
                    </TableBodyCell>
                    <TableBodyCell>{relativeTimeFromDate(new Date(domain.created_at * 1000))}</TableBodyCell>
                    <TableBodyCell>{relativeTimeFromDate(new Date(domain.updated_at * 1000))}</TableBodyCell>
                </TableBodyRow>
            {/each}
        </TableBody>
    </Table>
</div>
