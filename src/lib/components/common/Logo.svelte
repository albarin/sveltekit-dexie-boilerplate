<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
	import { Snail } from 'lucide-svelte';
</script>

<div class="flex gap-1 items-center">
	<Button size="icon" variant="link" href="/">
		<Snail class="h-7 w-7" />
	</Button>
	<a href="/">
		<h1 class="text-xl">Home</h1>
	</a>
</div>
