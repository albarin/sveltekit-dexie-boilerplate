<script lang="ts">
	import { Notification } from '$lib/db';

	async function test() {
		const n = Notification.create('test static');
		await n.save();
	}
</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>

<button onclick={test}>test</button>
