<script lang="ts">
	import { PUBLIC_VITE_APP_NAME } from '$env/static/public';
	import Account from '$lib/components/account/Account.svelte';
	import UpdateDialog from '$lib/components/common/UpdateDialog.svelte';
	import Header from '$lib/components/common/header/Header.svelte';
	import Login from '$lib/components/common/header/auth/Login.svelte';
	import OTP from '$lib/components/common/header/auth/OTP.svelte';
	import Preferences from '$lib/components/preferences/Preferences.svelte';
	import { ModeWatcher } from 'mode-watcher';
	import '../app.css';
	import LoginFlowDialog from '$lib/components/common/header/auth/LoginFlowDialog.svelte';

	let { children, data } = $props();
</script>

<svelte:head>
	<title>{PUBLIC_VITE_APP_NAME}</title>
</svelte:head>

<ModeWatcher />

<UpdateDialog newVersionAvailable={data.newVersionAvailable} serviceWorker={data.serviceWorker} />

<div class="bg-muted/40">
	<Header />

	<div class="container flex min-h-screen w-full flex-col">
		<main class="h-screen p-4 md:p-10">
			{@render children()}
		</main>
	</div>
</div>

<LoginFlowDialog />

<Account />
<Preferences />
