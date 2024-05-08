<script lang="ts">
	import { login } from '$lib/auth';
	import { Button } from '$lib/components/ui/button';
</script>

<Button variant="ghost" onclick={login}>Sign in</Button>
