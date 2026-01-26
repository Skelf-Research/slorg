<script>
    import "../app.css";

    import { isSidebarOpen, searchHistory } from '$lib/store';
  
    function toggleSidebar() {
      $isSidebarOpen = !$isSidebarOpen;
    }
  </script>
  
  <div class="drawer lg:drawer-open">
    <input id="my-drawer" type="checkbox" class="drawer-toggle" bind:checked={$isSidebarOpen} />
    <div class="drawer-content flex flex-col">
      <!-- Top bar -->
      <div class="navbar bg-base-100">
        <div class="flex-none">
          <label for="my-drawer" class="btn btn-square btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="inline-block w-5 h-5 stroke-current"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
          </label>
        </div>
        <div class="flex-1">
          <a class="btn btn-ghost normal-case text-xl">Answer AI : Precise, Accurate, and Fast</a>
        </div>
      </div>
  
      <!-- Page content -->
      <main class="container mx-auto p-4">
        <slot />
      </main>
    </div>
  
    <!-- Sidebar -->
    <div class="drawer-side">
      <label for="my-drawer" class="drawer-overlay"></label>
      <ul class="menu p-4 w-80 h-full bg-base-200 text-base-content">
        <li class="menu-title">Search History</li>
        {#each $searchHistory as query}
          <li><a>{query}</a></li>
        {/each}
      </ul>
    </div>
  </div>
  