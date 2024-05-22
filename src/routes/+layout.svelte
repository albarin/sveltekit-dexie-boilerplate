<script lang="ts">
	import Header from '$lib/components/common/header/Header.svelte';
	import Login from '$lib/components/common/header/auth/Login.svelte';
	import OTP from '$lib/components/common/header/auth/OTP.svelte';
	import { detectSWUpdate } from '$lib/updates';
	import { ModeWatcher } from 'mode-watcher';
	import { onMount } from 'svelte';
	import '../app.css';

	let { children } = $props();

	onMount(() => {
		detectSWUpdate();
	});
</script>

<ModeWatcher />

<div class="bg-muted/40">
	<Header />

	<div class="container flex min-h-screen w-full flex-col">
		<main class="h-screen p-4 md:p-10">
			{@render children()}
		</main>
	</div>
</div>

<Login />
<OTP />
