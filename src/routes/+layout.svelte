<script lang="ts">
    import "../app.css";
    import { page } from "$app/stores";
    import { Navbar, NavBrand, NavLi, NavUl, NavHamburger } from "flowbite-svelte";

    $: activeUrl = $page.url.pathname;
    const navLinks = {
        "/stats": "Statistics",
        "/domains": "Domains",
        "/admin": "Admin",
    };
</script>

<Navbar class="!bg-gray-800">
    <NavBrand href="/">
        <span class="self-center whitespace-nowrap text-2xl font-bold dark:text-white">Sentry</span>
    </NavBrand>
    <NavHamburger />
    <NavUl {activeUrl} ulClass="flex flex-col p-2 mt-4 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:text-sm md:font-medium">
        {#each Object.entries(navLinks) as [url, name]}
            <NavLi href={url} class="text-lg transition-all">{name}</NavLi>
        {/each}
    </NavUl>
</Navbar>

<div class="mt-4 flex flex-col items-center">
    <slot />
</div>
