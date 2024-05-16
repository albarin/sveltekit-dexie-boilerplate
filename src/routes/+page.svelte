<script lang="ts">
	import { db } from '$lib/db';

	async function test() {
		const data = await db.settings.add({ key: 'foo', value: 'bar' });
	}
</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>

<button onclick={test}>test</button>
