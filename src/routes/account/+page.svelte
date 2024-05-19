<script lang="ts">
	import Account from '$lib/components/account/Account.svelte';

	let open = $state(true);
</script>

<Account bind:open />
