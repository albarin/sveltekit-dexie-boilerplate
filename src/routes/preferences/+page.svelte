<script lang="ts">
	import Preferences from '$lib/components/preferences/Preferences.svelte';

	let open = $state(true);
</script>

<Preferences bind:open />
