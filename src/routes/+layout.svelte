<script lang="ts">
	import Header from '$lib/components/common/header/Header.svelte';
	import { ModeWatcher } from 'mode-watcher';
	import '../app.css';

	let { children } = $props();
</script>

<ModeWatcher />

<div class="container flex min-h-screen w-full flex-col">
	<Header />

	<main class="h-screen p-4 md:p-10">
		{@render children()}
	</main>
</div>
