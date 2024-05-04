<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
	import { Snail } from 'lucide-svelte';
</script>

<a href="/" class="flex gap-1 items-center">
	<Button size="icon" variant="link">
		<Snail class="h-7 w-7" strokeWidth="1.8" />
	</Button>
	<h1 class="text-xl">Home</h1>
</a>
