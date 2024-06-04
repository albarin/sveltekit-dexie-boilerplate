<script lang="ts">
	import { login } from '$lib/auth';
	import Badge from '$lib/components/ui/badge/badge.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import * as HoverCard from '$lib/components/ui/hover-card';
	import { db } from '$lib/db';
	import { licenseDaysLeft, licenseIsExpired, licenseIsValid } from '$lib/license';
	import { t } from '$lib/translations';

	const user = db.cloud.currentUser;

	const license = $derived.by(() => {
		if (!$user.license) {
			return {
				label: $t('license.offline.label'),
				content: $t('license.offline.content'),
				button: {
					label: $t('license.offline.button'),
					action: login,
					color: 'bg-gray-500'
				},
				color: 'text-gray-100 bg-gray-500 dark:bg-gray-600',
				hoverColor: 'hover:bg-gray-400 dark:hover:bg-gray-500'
			};
		}

		if (licenseIsExpired($user.license)) {
			return {
				label: $t('license.expired.label'),
				content: $t('license.expired.content'),
				button: {
					label: $t('license.expired.button'),
					action: () => console.log('Renew your license'),
					color: 'bg-red-500 hover:bg-red-600'
				},
				color: 'text-red-100 bg-red-500 dark:bg-red-600',
				hoverColor: 'hover:bg-red-600 dark:hover:bg-red-500'
			};
		}

		let licenseExpiresInDays = licenseDaysLeft($user.license);
		if (licenseExpiresInDays) {
			return {
				label: $t('license.trial.label'),
				content: $t('license.trial.content'),
				button: {
					label: $t('license.trial.button'),
					action: () => console.log('Upgrade now'),
					color: 'bg-amber-600 hover:bg-amber-500'
				},
				color: 'text-amber-100 bg-amber-600 dark:bg-amber-700',
				hoverColor: 'hover:bg-amber-500 dark:hover:bg-amber-600'
			};
		}
	});
</script>

{#if !licenseIsValid($user.license)}
	<HoverCard.Root>
		<HoverCard.Trigger href="/account">
			<Badge
				class={`flex-1 justify-center font-normal text-sm ${license?.color} ${license?.hoverColor}`}
			>
				{license?.label}
			</Badge>
		</HoverCard.Trigger>
		<HoverCard.Content class="text-sm text-center space-y-4">
			<p>{license?.content}</p>
			<Button
				class={`text-white ${license?.button.color}`}
				size="sm"
				onclick={license?.button?.action}
				title={license?.button?.label}
			>
				{license?.button?.label}
			</Button>
		</HoverCard.Content>
	</HoverCard.Root>
{/if}
