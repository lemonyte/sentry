<script lang="ts">
    import "../app.css";
    import { page } from '$app/stores';
    import { Navbar, NavBrand, NavLi, NavUl, NavHamburger } from 'flowbite-svelte';
    $: activeUrl = $page.url.pathname;
</script>
  
<Navbar>
<NavBrand href="/">
    <span class="self-center whitespace-nowrap text-xl font-semibold dark:text-white">Sentry</span>
</NavBrand>
<NavHamburger />
<NavUl {activeUrl}>
    <NavLi href="/stats">Statistics</NavLi>
    <NavLi href="/domains">Domains</NavLi>
    <NavLi href="/admin">Admin</NavLi>
</NavUl>
</Navbar>

<slot />
