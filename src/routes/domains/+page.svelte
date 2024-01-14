<script lang="ts">
    import type { PageData } from "./$types";
    import { relativeTimeFromDate } from "$lib/time";
    import { TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell, TableSearch } from "flowbite-svelte";

    export let data: PageData;

    let searchTerm = "";
    $: filteredItems = data.domains.filter(
        (domain) => domain.domain.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1,
    );
</script>

<div class="flex flex-col items-center min-h-screen">
    <TableSearch placeholder="Search domains" striped={true} bind:inputValue={searchTerm}>
        <TableHead>
            <TableHeadCell>Domain</TableHeadCell>
            <TableHeadCell>Status</TableHeadCell>
            <TableHeadCell>Threat type</TableHeadCell>
            <TableHeadCell>Host</TableHeadCell>
            <TableHeadCell>Created</TableHeadCell>
            <TableHeadCell>Updated</TableHeadCell>
        </TableHead>
        <TableBody class="divide-y">
            {#each filteredItems as domain}
                <TableBodyRow>
                    <TableBodyCell><a href={domain.url}>{domain.domain}</a></TableBodyCell>
                    <TableBodyCell>{domain.status}</TableBodyCell>
                    <TableBodyCell>{domain.threat_type}</TableBodyCell>
                    <TableBodyCell>{domain.host}</TableBodyCell>
                    <TableBodyCell>{relativeTimeFromDate(new Date(domain.created_at * 1000))}</TableBodyCell>
                    <TableBodyCell>{relativeTimeFromDate(new Date(domain.updated_at * 1000))}</TableBodyCell>
                </TableBodyRow>
            {/each}
        </TableBody>
    </TableSearch>
</div>
