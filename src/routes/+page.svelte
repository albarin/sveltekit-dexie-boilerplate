<script lang="ts">
	import { page } from '$app/state';
	import Button from '$lib/components/ui/button/button.svelte';
	import { Notification } from '$lib/db/models/Notification';

	const notificationRepo = page.data.notificationRepository;

	async function test() {
		await notificationRepo.create(new Notification(new Date().toUTCString()));
	}
</script>

<h1>Welcome to SvelteKit</h1>

<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>

<Button onclick={test}>test</Button>
