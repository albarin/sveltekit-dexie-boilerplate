<script lang="ts">
	import Header from '$lib/components/common/header/Header.svelte';
	import Login from '$lib/components/common/header/auth/Login.svelte';
	import OTP from '$lib/components/common/header/auth/OTP.svelte';
	import { ModeWatcher } from 'mode-watcher';
	import { pwaInfo } from 'virtual:pwa-info';
	import '../app.css';

	let { children } = $props();

	let webManifestLink = $derived(pwaInfo ? pwaInfo.webManifest.linkTag : '');
</script>

<svelte:head>
	{@html webManifestLink}
</svelte:head>
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
