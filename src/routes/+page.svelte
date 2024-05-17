<script lang="ts">
	import { db } from '$lib/db';

	async function test() {
		await db.notifications.add({ body: new Date().toISOString(), read: false, date: new Date() });
	}
</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>

<button onclick={test}>test</button>
