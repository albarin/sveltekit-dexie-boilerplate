<script lang="ts">
	import { licenseDaysLeft, licenseIsExpired, licenseIsValid } from '$lib/license';
	import Badge from '$lib/components/ui/badge/badge.svelte';
	import * as HoverCard from '$lib/components/ui/hover-card';
	import { db } from '$lib/db';
	import { inSync, login } from '$lib/auth';
	import Button from '$lib/components/ui/button/button.svelte';

	const user = db.cloud.currentUser;
	const syncState = db.cloud.syncState;

	const synced = $derived(inSync($syncState));
	const license = $derived.by(() => {
		if (!$user.license) {
			return {
				label: 'Offline',
				content:
					'You are offline. All your data is stored on your browser and will be lost if you clear your data or change devices.',
				button: {
					label: 'Login to sync data',
					action: login
				},
				color: 'bg-gray-500',
				hoverColor: 'hover:bg-gray-700'
			};
		}

		if (licenseIsExpired($user.license)) {
			return {
				label: 'Expired',
				content:
					'Your license is expired. You can still use the app but you will not be able to sync your data or access premium features.',
				button: {
					label: 'Renew your license',
					action: () => console.log('Renew your license')
				},
				color: 'bg-red-500',
				hoverColor: 'hover:bg-red-700'
			};
		}

		let licenseExpiresInDays = licenseDaysLeft($user.license);
		if (licenseExpiresInDays) {
			return {
				label: 'Trial',
				content: `Your free trial ends in ${licenseExpiresInDays} days. Upgrade to continue using the app and access premium features.`,
				button: {
					label: 'Upgrade now',
					action: () => console.log('Upgrade now')
				},
				color: 'bg-yellow-500',
				hoverColor: 'hover:bg-yellow-700'
			};
		}
	});
</script>

{#if synced && !licenseIsValid($user.license)}
	<HoverCard.Root>
		<HoverCard.Trigger>
			<Badge class={`${license?.color} ${license?.hoverColor}`}>
				{license?.label}
			</Badge>
		</HoverCard.Trigger>
		<HoverCard.Content class="text-sm text-center space-y-4">
			<p>{license?.content}</p>
			<Button class="text-xs" size="sm" onclick={license?.button?.action}>
				{license?.button?.label}
			</Button>
		</HoverCard.Content>
	</HoverCard.Root>
{/if}
