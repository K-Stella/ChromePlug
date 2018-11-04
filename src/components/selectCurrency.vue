<template>
  <div class="app_container">
    <div
      class="all_countries"
      v-for="(item, index) in allCountry"
      :key="index"
    >
      <div class="country">
        <img :src="item.countryFlag">
        <span class="countryName">{{ item.symbol }}</span>
        <div class="hr"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      allCountry: [
        {
          countryFlag: 'https://oahox70gu.qnssl.com/explorer/country/CNY@3x.png',
          symbol: 'CNY',
          currencyName: '人民币',
          currencySign: '$'
        },
        {
          countryFlag: 'https://oahox70gu.qnssl.com/explorer/country/USD@3x.png',
          symbol: 'USD',
          currencyName: '美元',
          currencySign: '$'
        }
      ]
    }
  }
}
</script>

<style>

</style>
