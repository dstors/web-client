<template>
	<v-tooltip top v-if="type">
    <v-btn icon :color="types[type].color" slot="activator">
      <v-icon color="white">{{ types[type].icon }}</v-icon>
    </v-btn>
    <span>{{ types[type].label }}</span>
  </v-tooltip>
</template>

<script>
export default {
  name: 'product-type-label',
  props: ['type'],
  data() {
    return {
      types: {
        giveaway : { label: 'Giveaway', icon: 'card_giftcard', color: 'yellow darken-2' },
        auction: { label: 'Auction', icon: 'gavel', color: 'red' },
        'direct-sell': { label: 'Direct Sell', icon: 'attach_money', color: 'green' },
      },
    }
  }
}
</script>

<style scoped>

</style>