<script lang="ts">
	import * as Avatar from '$lib/components/ui/avatar';
	import { db } from '$lib/db';
	import { sha256 } from 'js-sha256';
	import { UserRound } from 'lucide-svelte';

	const user = db.cloud.currentUser;
	const email = $derived($user.email || '');
</script>

<Avatar.Root class="h-7 w-7 flex items-center justify-center">
	{#if $user.isLoggedIn}
		<Avatar.Image src="https://gravatar.com/avatar/{sha256(email)}" alt={$user.name} />
		<Avatar.Fallback class="bg-white">
			<UserRound />
		</Avatar.Fallback>
	{:else}
		<UserRound />
	{/if}
</Avatar.Root>
