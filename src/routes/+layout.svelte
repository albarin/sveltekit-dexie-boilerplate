<script lang="ts">
	import StatusToaster from '$lib/components/common/StatusToaster.svelte';
	import Header from '$lib/components/common/header/Header.svelte';
	import { ModeWatcher } from 'mode-watcher';
	import '../app.css';

	let { children } = $props();
</script>

<ModeWatcher />

<div class="bg-muted/40">
	<Header />

	<div class="container flex min-h-screen w-full flex-col">
		<main class="h-screen p-4 md:p-10">
			{@render children()}
		</main>
	</div>

	<StatusToaster />
</div>
