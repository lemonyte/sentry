<script lang="ts">
    import type { PageData } from "./$types";
    import { Alert } from "flowbite-svelte";

    export let data: PageData;
</script>

<div class="flex flex-col items-center min-h-screen">
    <div class="p-8">
        <Alert>
            <span class="font-medium">Info alert!</span>
            Change a few things up and try submitting again.
        </Alert>
    </div>
</div>
