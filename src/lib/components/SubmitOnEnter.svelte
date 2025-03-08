<script lang="ts">
	let { action } = $props();

	const submitOnEnter = (e: KeyboardEvent) => {
		if (e.key === 'Enter') {
			e.preventDefault();
			action(e);
		}
	};
</script>

<svelte:window onkeydown={submitOnEnter} />
