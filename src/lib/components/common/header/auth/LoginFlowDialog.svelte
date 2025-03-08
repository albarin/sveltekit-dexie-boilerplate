<script lang="ts">
	import * as Dialog from '$lib/components/ui/dialog';
	import { db } from '$lib/db';
	import Login from './Login.svelte';
	import Otp from './OTP.svelte';

	let ui = db.cloud.userInteraction;

	let loggingIn = $state(false);
	let open = $state($ui?.type === 'email' || $ui?.type === 'otp');
	$effect(() => {
		open = $ui?.type === 'email' || $ui?.type === 'otp' || loggingIn;
	});

    $effect(() => {
        if ($ui?.type === 'otp') {
            loggingIn = false;
        }
    });
</script>

<Dialog.Root bind:open>
	<Dialog.Content role="dialog" class="dialog sm:max-w-[425px]">
		{#if $ui?.type === 'email' || loggingIn}
			<Login bind:loggingIn />
		{/if}
		{#if $ui?.type === 'otp'}
			<Otp />
		{/if}
	</Dialog.Content>
</Dialog.Root>
