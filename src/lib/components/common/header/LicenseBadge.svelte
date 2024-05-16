<script lang="ts">
	import { login } from '$lib/auth';
	import Badge from '$lib/components/ui/badge/badge.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import * as HoverCard from '$lib/components/ui/hover-card';
	import { db } from '$lib/db';
	import { licenseDaysLeft, licenseIsExpired, licenseIsValid } from '$lib/license';

	const user = db.cloud.currentUser;
	const syncState = db.cloud.syncState;

	const license = $derived.by(() => {
		if (!$user.license) {
			return {
				label: 'Offline',
				content:
					'You are offline. All your data is stored on your browser only. Start your free trial to sync your data and try premium features.',
				button: {
					label: 'Start free trial!',
					action: login
				},
				color: 'text-gray-100 bg-gray-500 dark:bg-gray-600',
				hoverColor: 'hover:bg-gray-400 dark:hover:bg-gray-500'
			};
		}

		if (licenseIsExpired($user.license)) {
			return {
				label: 'Expired',
				content:
					"Your license is expired. You can still use the app but you don't have access premium to features anymore.",
				button: {
					label: 'Renew your license',
					action: () => console.log('Renew your license')
				},
				color: 'text-red-100 bg-red-500 dark:bg-red-600',
				hoverColor: 'hover:bg-red-400 dark:hover:bg-red-500'
			};
		}

		let licenseExpiresInDays = licenseDaysLeft($user.license);
		if (licenseExpiresInDays) {
			return {
				label: 'Trial',
				content: `Your free trial ends in ${licenseExpiresInDays} days. Upgrade to continue using the app and access premium features.`,
				button: {
					label: 'Upgrade now!',
					action: () => console.log('Upgrade now')
				},
				color: 'text-blue-100 bg-blue-500 dark:bg-blue-600',
				hoverColor: 'hover:bg-blue-400 dark:hover:bg-blue-500'
			};
		}
	});
</script>

{#if $syncState.phase !== 'offline' && !licenseIsValid($user.license)}
	<HoverCard.Root>
		<HoverCard.Trigger>
			<Badge
				class={`flex-1 justify-center font-normal text-sm ${license?.color} ${license?.hoverColor}`}
			>
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
