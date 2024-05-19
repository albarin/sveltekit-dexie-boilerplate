<script lang="ts">
	let { children } = $props();
</script>

<div class="space-y-3 mt-4">
	{@render children()}
</div>
