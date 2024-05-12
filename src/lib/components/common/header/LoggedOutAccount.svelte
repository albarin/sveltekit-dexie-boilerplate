<script lang="ts">
	import { login } from '$lib/auth';
	import Button from '$lib/components/ui/button/button.svelte';
	import { UserRound } from 'lucide-svelte';
</script>

<Button variant="ghost" size="icon" onclick={login}>
	<UserRound onclick={login} />
</Button>
