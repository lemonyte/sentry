<script lang="ts">
    import type { PageData } from "./$types";
    import { DomainStatus } from "$lib/database";
    import { Card } from "flowbite-svelte";

    export let data: PageData;
</script>

<div class="flex flex-col items-center min-h-screen">
    <div class="flex flex-row space-x-4" id="cards">
        <Card>
            <h3>Active domains</h3>
            <p class="text-red-500">{data.domains.filter((domain) => domain.status === DomainStatus.active).length}</p>
        </Card>
        <Card>
            <h3>Inactive domains</h3>
            <p class="text-gray-500">
                {data.domains.filter((domain) => domain.status === DomainStatus.inactive).length}
            </p>
        </Card>
        <Card>
            <h3>Domains actioned</h3>
            <p class="text-green-500">TODO</p>
        </Card>
    </div>
</div>

<style lang="postcss">
    #cards h3 {
        @apply text-xl;
    }

    #cards p {
        @apply text-6xl font-bold self-center;
    }
</style>
