<script lang="ts">
    import "../app.css";
</script>

<nav class="flex items-center p-2 border-b-[1px] ">
    <h1>Sentry</h1>
    <a href="/dashboard">Dashboard</a>
    <a href="/domains">Domains</a>
    <a href="/stats">Statistics</a>
</nav>

<slot />

<style>
    * {
        transition: all 0.1s ease-in-out;
    }

    nav a {
        padding: 6px;
        color: #ffffff;
        text-decoration: none;
        border-radius: 10px;
    }
    
    nav a:hover {
        background-color: #ffffff;
        color: #006eec;
    }
</style>
