<template>
  <div class="app_container">
    我是汇率换算页面
    <div
      class="currency_list"
      v-for="(item,index) in (currencyList)"
      :key="index"
    >
      <el-card
        class="box_card"
        shadow="hover"
      >
        <div class="item_left">
          <img :src=item.countryFlag /><span @click="showlist(item, index)">{{ item.symbol }}</span>
          <select v-model="item.index" name="countryOptions" @change="changeCountry(item,countryOptions)" >
            <option :value="options.name" v-for="(options) in countryOptions" :key="options">
              <span>{{ options.name }}</span>
            </option>
          </select>
        </div>
        <div class="item_right" style="float: right; display: grid; margin-right: 50px;">
          <el-input v-model="input" :placeholder="item.currentPrice"></el-input>
          <div class="current_currency">
            <span class="currency_name" style="text-align: right;">{{ item.currencyName }}</span>
            <span class="currency_sign" style="text-align: right;">{{ item.currencySign }}</span>
          </div>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'Exchange',
  data () {
    return {
      flag: false,
      currencyList: [
        {
          countryFlag: 'https://oahox70gu.qnssl.com/explorer/country/CNY@3x.png',
          symbol: 'CNY',
          currencyName: '人民币',
          currencySign: '¥',
          currentPrice: 100
        },
        {
          countryFlag: 'https://oahox70gu.qnssl.com/explorer/country/USD@3x.png',
          symbol: 'USD',
          currencyName: '美元',
          currencySign: '¥',
          currentPrice: 150
        },
        {
          countryFlag: 'https://oahox70gu.qnssl.com/explorer/country/EUR@3x.png',
          symbol: 'EUR',
          currencyName: '欧元',
          currencySign: '¥',
          currentPrice: 200
        },
        {
          countryFlag: 'https://oahox70gu.qnssl.com/explorer/country/HKD@3x.png',
          symbol: 'HKD',
          currencyName: '港币',
          currencySign: '¥',
          currentPrice: 150
        },
        {
          countryFlag: 'https://oahox70gu.qnssl.com/explorer/country/MOP@3x.png',
          symbol: 'MOP',
          currencyName: '澳元币',
          currencySign: '¥',
          currentPrice: 100
        }
      ],
      countryOptions: [
        {
          value: '0',
          name: '英国',
          moneyName: '英镑¥',
          src: '../../static/img/china.png'
        },
        {
          value: '1',
          name: '美国',
          moneyName: '美元¥',
          src: '../../static/img/america.png'
        },
        {
          value: '2',
          name: '澳大利',
          moneyName: '意大利元¥',
          src: '../../static/img/china.png'
        },
        {
          value: '3',
          name: '香港',
          moneyName: '港币¥',
          src: '../../static/img/hongkong.png'
        },
        {
          value: '4',
          name: '中国',
          moneyName: '人民币¥',
          src: '../../static/img/china.png'
        }
      ],
      initDate: []
    }
  },
  mounted () {
    axios.get('/api/ver2/exchange/unionpay/latest').then(response => {
      this.initDate = response
      console.log('initDtae:', this.initDate)

      // 初始化显示数据
      for (let i = 0; i < this.currencyList.length; i++) {
        this.currencyList[i].currentPrice = 500
      }
    })
  },
  methods: {
    showlist: function (item, index) {
      console.log(index)
      this.flag = !this.flag
      console.log(item)
    },
    changeCountry: function (item, countryOptions) {
      console.log('换城市')
      item.symbol = item.index
      for (let i = 0; i < countryOptions.length; i++) {
        if (countryOptions[i].name === item.index) {
          item.src = countryOptions[i].src
          item.moneyName = countryOptions[i].moneyName
        }
      }
    }
  }
}
</script>

<style>
  * {
    padding: 0;
    margin: 0;
  }
  .item_left {
    float: left;
  }
  .item_left img{
    width: 50px;
  }
  .item_left span{
    margin-bottom: 5px;
  }
  .el-card {
    width: 850px;
    margin: 0 auto;
  }
  .current_currency {
    text-align: right;
  }
</style>
