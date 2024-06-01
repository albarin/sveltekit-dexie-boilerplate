<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import UpdateDialog from '$lib/components/common/UpdateDialog.svelte';
	import Header from '$lib/components/common/header/Header.svelte';
	import Login from '$lib/components/common/header/auth/Login.svelte';
	import OTP from '$lib/components/common/header/auth/OTP.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import { db } from '$lib/db';
	import { subscribe, unsubscribe } from '$lib/notifications';
	import { ModeWatcher } from 'mode-watcher';
	import '../app.css';

	let { children, data } = $props();

	const user = db.cloud.currentUser;

	let isSubscribed = $derived(data.subscription !== null);

	const handleSubscribe = async () => {
		await subscribe($user.email);
		invalidateAll();
	};

	const handleUnsubscribe = async () => {
		await unsubscribe();
		invalidateAll();
	};
</script>

<ModeWatcher />

<UpdateDialog newVersionAvailable={data.newVersionAvailable} serviceWorker={data.serviceWorker} />

<div class="bg-muted/40">
	<Header />

	<div class="container flex min-h-screen w-full flex-col">
		<main class="h-screen p-4 md:p-10">
			{#if isSubscribed}
				<p>Subscribed!</p>

				<Button onclick={handleUnsubscribe}>Unsubscribe</Button>
			{:else}
				<Button onclick={handleSubscribe}>Subscribe</Button>
			{/if}

			{@render children()}
		</main>
	</div>
</div>

<Login />
<OTP />
