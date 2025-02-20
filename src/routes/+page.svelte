<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import { Notification } from '$lib/db';

	async function test() {
		Notification.create(new Date().toUTCString());
	}
</script>

<h1>Welcome to SvelteKit</h1>

<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>

<Button onclick={test}>test</Button>
