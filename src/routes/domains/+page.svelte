<script lang="ts">
    import type { PageData } from "./$types";
    import { relativeTimeFromDate } from "$lib/time";
    import type { Domain } from "$lib/database";
    import { DomainStatus } from "$lib/database";
    import {
        TableBody,
        TableBodyCell,
        TableBodyRow,
        TableHead,
        TableHeadCell,
        TableSearch,
        Indicator,
        Badge,
    } from "flowbite-svelte";
    import { writable } from "svelte/store";

    export let data: PageData;

    let searchTerm = "";
    $: filteredItems = data.domains.filter(
        (domain) => domain.domain.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1,
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
            if (!aVal || !bVal) {
                return 0;
            }
            if (aVal < bVal) {
                return -direction;
            } else if (aVal > bVal) {
                return direction;
            }
            return 0;
        });
        sortedItems.set(sorted);
    }
</script>

<div class="flex flex-col items-center min-h-screen">
    <TableSearch placeholder="Search domains" striped={true} bind:inputValue={searchTerm}>
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
                on:click={() => sortTable("threat_type")}>
                Threat type
                </TableHeadCell
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
                    <TableBodyCell><a href={domain.url}>{domain.domain}</a></TableBodyCell>
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
                            />{domain.status ? domain.status.charAt(0).toUpperCase() + domain.status.substring(1) : "Unknown"}
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
    </TableSearch>
</div>
