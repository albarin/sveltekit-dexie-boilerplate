<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
	import { Moon, Sun } from 'lucide-svelte';
	import { toggleMode, mode } from 'mode-watcher';

	const modeTitle = $derived($mode === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
</script>

<Button on:click={toggleMode} variant="ghost" size="icon" title={modeTitle}>
	<Sun class="rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
	<Moon class="absolute rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
	<span class="sr-only">Toggle theme</span>
</Button>
