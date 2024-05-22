<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import * as Dialog from '$lib/components/ui/dialog';
	import { Input } from '$lib/components/ui/input';
	import { db } from '$lib/db';
	import { t } from '$lib/translations';

	let ui = db.cloud.userInteraction;

	let otp = $state('');
	let open = $state($ui?.type === 'otp');

	$effect(() => {
		open = $ui?.type === 'otp';
	});
</script>

<Dialog.Root bind:open>
	<Dialog.Content role="dialog" class="dialog sm:max-w-[425px]">
		<Dialog.Header>
			<Dialog.Title>{$t('header.otp.title')}</Dialog.Title>
			<Dialog.Description>
				{$t('header.otp.description')}
			</Dialog.Description>
		</Dialog.Header>
		<form class="space-y-4">
			<div class="flex flex-col gap-2">
				<Input type="string" bind:value={otp} />
				{#if $ui?.alerts && $ui?.alerts?.length > 1 && otp.length > 0}
					<span class="text-sm text-red-400">
						{$t(`header.otp.${$ui.alerts[1].messageCode.toLowerCase()}`)}
					</span>
				{/if}
			</div>
			<Dialog.Footer>
				<Button
					type="submit"
					onclick={() => {
						$ui?.onSubmit({ otp });
						if ($ui?.alerts && !$ui?.alerts?.length) {
							otp = '';
						}
					}}
					disabled={!otp.length}
					title={$t('header.otp.submit')}
				>
					{$t('header.otp.submit')}
				</Button>
			</Dialog.Footer>
		</form>
	</Dialog.Content>
</Dialog.Root>
