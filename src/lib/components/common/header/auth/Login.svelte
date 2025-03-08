<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import * as Dialog from '$lib/components/ui/dialog';
	import { Input } from '$lib/components/ui/input';
	import { db } from '$lib/db';
	import { t } from '$lib/translations';
	import { isEmailValid } from '$lib/utils';

	let ui = db.cloud.userInteraction;

	let { loggingIn = $bindable() }: { loggingIn: boolean } = $props();

	let email = $state('');

	$effect(() => {
		if (!loggingIn) {
			email = '';
		}
	});
</script>

<Dialog.Header>
	<Dialog.Title>{$t('header.login.title')}</Dialog.Title>
	<Dialog.Description>
		{$t('header.login.description')}
	</Dialog.Description>
</Dialog.Header>

<form class={['space-y-4', { 'pointer-events-none': loggingIn }]}>
	<div class="flex flex-col gap-2">
		<Input bind:value={email} type="email" placeholder="my@email.com" />
		{#if $ui?.alerts && $ui?.alerts?.length > 0 && email.length > 0}
			<span class="text-sm text-red-400">{$ui.alerts[0].message}</span>
		{/if}
	</div>
	<Dialog.Footer>
		<Button
			type="submit"
			onclick={() => {
				$ui?.onSubmit({ email });
				loggingIn = true;
			}}
			disabled={!isEmailValid(email)}
			title={$t('header.login.submit')}
		>
			{$t('header.login.submit')}
		</Button>
	</Dialog.Footer>
</form>
