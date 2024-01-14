<script lang="ts">
    import type { PageData } from "./$types";
    import { relativeTimeFromDate } from "$lib/time";

    export let data: PageData;
</script>

<div class="flex flex-col items-center min-h-screen">
    <div>
        <table>
            <thead>
                <tr>
                    <th>Domain</th>
                    <th>Status</th>
                    <th>Threat type</th>
                    <th>Host</th>
                    <th>Created</th>
                    <th>Last updated</th>
                </tr>
            </thead>
            <tbody>
                {#each data.domains as domain}
                    <tr>
                        <td><a href={domain.url}>{domain.domain}</a></td>
                        <td>{domain.status}</td>
                        <td>{domain.threat_type}</td>
                        <td>{domain.host}</td>
                        <td>{relativeTimeFromDate(new Date(domain.created_at * 1000))}</td>
                        <td>{relativeTimeFromDate(new Date(domain.updated_at * 1000))}</td>
                    </tr>
                {/each}
            </tbody>
        </table>
    </div>
</div>

<style lang="postcss">
    a {
        transition: all 0.1s ease-in-out;
    }
    
    a:hover {
        cursor: pointer;
        color: #006eec;
        text-decoration: underline;
    }

    table, th, td {
        border: 1px solid #ffffff;
    }

    td, th {
        padding: 0.5rem;
    }
</style>
