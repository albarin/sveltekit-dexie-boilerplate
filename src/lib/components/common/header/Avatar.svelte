<script lang="ts">
	import * as Avatar from '$lib/components/ui/avatar';
	import { db } from '$lib/db';
	import { sha256 } from 'js-sha256';
	import { UserRound } from 'lucide-svelte';

	const user = db.cloud.currentUser;
	const email = $user.email || '';
</script>

<Avatar.Root class="h-7 w-7">
	<Avatar.Image src="https://gravatar.com/avatar/{sha256(email)}" alt={$user.name} />
	<Avatar.Fallback>
		<UserRound />
	</Avatar.Fallback>
</Avatar.Root>
