<script lang="ts">
	import { PUBLIC_VITE_APP_NAME } from '$env/static/public';
	import { Snail } from 'lucide-svelte';
</script>

<div class="flex flex-1 justify-start gap-1 items-center">
	<a class="flex gap-2 items-center" href="/">
		<Snail class="h-8 w-8" />
		<h1 class="text-xl">{PUBLIC_VITE_APP_NAME}</h1>
	</a>
</div>
