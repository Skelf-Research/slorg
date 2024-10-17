import { writable } from 'svelte/store';

export const searchQuery = writable('');
export const searchResults = writable([]);
export const isLoading = writable(false);
export const isSidebarOpen = writable(false);
export const searchHistory = writable([]);
export const tokenCount = writable(0);