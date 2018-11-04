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
          <img :src=item.countryFlag @click="changeCardNum(index)"/><span>{{ item.symbol }}</span>
          <select v-model="item.index" name="countryOptions" @change="changeCountry(item,countryOptions,index)" >
            <option :value="options.symbol" v-for="(options) in countryOptions" :key="options">
              <span>{{ options.symbol }}</span>
            </option>
          </select>
        </div>
        <div class="item_right" style="float: right; display: grid; margin-right: 10px;">
          <el-input v-model="item.input" :placeholder="item.currentPrice" @focus="handleFocus(index, item)" @input.native="inputCur(index, item)"></el-input>
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
import selectCur from '@/components/selectCurrency'
export default {
  name: 'Exchange',
  components: {
    selectCur
  },
  data () {
    return {
      input: '',
      focusIndex: 0,
      curIndex: '',
      currencyList: [
        {
          countryFlag: 'https://oahox70gu.qnssl.com/explorer/country/CNY@3x.png',
          symbol: 'CNY',
          currencyName: '人民币',
          currencySign: '¥',
          currentPrice: null,
          input: null
        },
        {
          countryFlag: 'https://oahox70gu.qnssl.com/explorer/country/USD@3x.png',
          symbol: 'USD',
          currencyName: '美元',
          currencySign: '¥',
          currentPrice: null,
          input: null
        },
        {
          countryFlag: 'https://oahox70gu.qnssl.com/explorer/country/EUR@3x.png',
          symbol: 'EUR',
          currencyName: '欧元',
          currencySign: '¥',
          currentPrice: null,
          input: null
        },
        {
          countryFlag: 'https://oahox70gu.qnssl.com/explorer/country/HKD@3x.png',
          symbol: 'HKD',
          currencyName: '港币',
          currencySign: '¥',
          currentPrice: null,
          input: null
        },
        {
          countryFlag: 'https://oahox70gu.qnssl.com/explorer/country/MOP@3x.png',
          symbol: 'MOP',
          currencyName: '澳元币',
          currencySign: '¥',
          currentPrice: null,
          input: null
        },
        {
          countryFlag: 'https://oahox70gu.qnssl.com/explorer/country/JPY@3x.png',
          symbol: 'JPY',
          currencyName: '日元',
          currencySign: '¥',
          currentPrice: null,
          input: null
        }
      ],
      countryOptions: [
        {
          countryFlag: 'https://oahox70gu.qnssl.com/explorer/country/CNY@3x.png',
          symbol: 'CNY',
          currencyName: '人民币',
          currencySign: '¥'
        },
        {
          countryFlag: 'https://oahox70gu.qnssl.com/explorer/country/USD@3x.png',
          symbol: 'USD',
          currencyName: '美元',
          currencySign: '¥'
        },
        {
          countryFlag: 'https://oahox70gu.qnssl.com/explorer/country/MOP@3x.png',
          symbol: 'MOP',
          currencyName: '澳元币',
          currencySign: '¥'
        },
        {
          countryFlag: 'https://oahox70gu.qnssl.com/explorer/country/HKD@3x.png',
          symbol: 'HKD',
          currencyName: '港币',
          currencySign: '¥'
        },
        {
          countryFlag: 'https://oahox70gu.qnssl.com/explorer/country/EUR@3x.png',
          symbol: 'EUR',
          currencyName: '欧元',
          currencySign: '¥'
        }
      ],
      initDate: [],
      basicCurrency: ''
    }
  },
  mounted () {
    axios.get('/api/ver2/exchange/unionpay/latest').then(response => {
      // initDate 接口返回数据
      this.initDate = response
      console.log('initDate:', this.initDate)

      //  确定基准货币
      this.basicCurrency = this.currencyList[0].symbol
      // console.log('basicCurrency:', this.basicCurrency)
      this.currencyList[0].currentPrice = 100
      this.curIndex = this.currencyList[0].symbol

      // 初始化显示数据
      for (let i = 1; i < this.currencyList.length; i++) {
        // console.log('currencyList:', this.currencyList)
        for (let j = 0; j < this.initDate.data.resources.length; j++) {
          if (this.currencyList[i].symbol + '=X' === this.initDate.data.resources[j].resource.fields.symbol) {
            this.currencyList[i].currentPrice = this.initDate.data.resources[j].resource.fields['xch-sell'] * 100
            this.currencyList[i].currentPrice = this.currencyList[i].currentPrice.toFixed(2)
          }
        }
      }
    })
  },
  methods: {
    changeCountry: function (item, countryOptions, index) {
      console.log('换城市')
      console.log(item)
      console.log('当前聚焦点:' + this.focusIndex + '聚焦货币:' + this.curIndex)
      // 更换城市
      item.symbol = item.index

      for (let i = 0; i < countryOptions.length; i++) {
        // 改变基本信息
        if (countryOptions[i].symbol === item.index) {
          item.countryFlag = countryOptions[i].countryFlag
          item.currencyName = countryOptions[i].currencyName
          item.currencySign = countryOptions[i].currencySign
        }
        // console.log(index)
      }
      axios.get('/api/ver2/exchange/unionpay/latest').then(response => {
        let topCur, bottomCur, basCur
        if (index !== this.focusIndex) {
          if (this.curIndex === 'CNY') {
            for (let j = 0; j < response.data.resources.length; j++) {
              if (item.symbol + '=X' === response.data.resources[j].resource.fields.symbol) {
                this.currencyList[index].currentPrice = response.data.resources[j].resource.fields['xch-sell'] * 100
                this.currencyList[index].currentPrice = this.currencyList[index].currentPrice.toFixed(2)
                if (this.currencyList[index].input !== null) {
                  this.currencyList[index].input = response.data.resources[j].resource.fields['xch-sell'] * this.currencyList[this.focusIndex].input
                  this.currencyList[index].input = this.currencyList[index].input.toFixed(2)
                }
              }
            }
          } else {
            for (let j = 0; j < response.data.resources.length; j++) {
              if (this.curIndex + '=X' === response.data.resources[j].resource.fields.symbol) {
                topCur = response.data.resources[j].resource.fields['xch-sell']
                break
              }
            }
            for (let y = 0; y < response.data.resources.length; y++) {
              if (item.symbol + '=X' === response.data.resources[y].resource.fields.symbol) {
                bottomCur = 1 / (response.data.resources[y].resource.fields['xch-sell'])
                basCur = 1 / (topCur * bottomCur)
                this.currencyList[index].currentPrice = basCur * 100
                this.currencyList[index].currentPrice = this.currencyList[index].currentPrice.toFixed(2)
                if (this.currencyList[index].input !== null) {
                  this.currencyList[index].input = response.data.resources[y].resource.fields['xch-sell'] * this.currencyList[this.focusIndex].input
                  this.currencyList[index].input = this.currencyList[index].input.toFixed(2)
                }
              }
            }
          }
        } else {
          console.log('all')
          if (item.symbol === 'CNY') {
            for (let i = 0; i < this.currencyList.length; i++) {
              if (i === index) {
                continue
              }
              // console.log('currencyList:', this.currencyList)
              for (let j = 0; j < response.data.resources.length; j++) {
                if (this.currencyList[i].symbol + '=X' === response.data.resources[j].resource.fields.symbol) {
                  this.currencyList[i].currentPrice = response.data.resources[j].resource.fields['xch-sell'] * 100
                  this.currencyList[i].currentPrice = this.currencyList[i].currentPrice.toFixed(2)
                  if (this.currencyList[i].input !== null) {
                    this.currencyList[i].input = response.data.resources[j].resource.fields['xch-sell'] * this.currencyList[this.focusIndex].input
                    this.currencyList[i].input = this.currencyList[i].input.toFixed(2)
                  }
                }
              }
            }
          } else {
            for (let x = 0; x < response.data.resources.length; x++) {
              if (item.symbol + '=X' === response.data.resources[x].resource.fields.symbol) {
                // console.log('1')
                topCur = response.data.resources[x].resource.fields['xch-sell']
                // console.log(topCur)
                break
              }
            }
            for (let x = 0; x < this.currencyList.length; x++) {
              if (x === index) {
                continue
              } else {
                for (let y = 0; y < response.data.resources.length; y++) {
                  if (this.currencyList[x].symbol + '=X' === response.data.resources[y].resource.fields.symbol) {
                    // console.log('2')
                    bottomCur = 1 / (response.data.resources[y].resource.fields['xch-sell'])
                    // console.log(bottomCur)
                    basCur = 1 / (topCur * bottomCur)
                    // console.log('3')
                    // console.log(basCur)
                    this.currencyList[x].currentPrice = basCur * 100
                    this.currencyList[x].currentPrice = this.currencyList[x].currentPrice.toFixed(2)
                    if (this.currencyList[x].input !== null) {
                      this.currencyList[x].input = basCur * this.currencyList[this.focusIndex].input
                      this.currencyList[x].input = this.currencyList[x].input.toFixed(2)
                    }
                  }
                }
              }
            }
          }
        }
      })
    },
    handleFocus: function (index, list) {
      console.log('第' + index + '个输入框')
      console.log(list)
      for (let x = 0; x < this.currencyList.length; x++) {
        this.currencyList[x].input = null
      }
      // 当前默认为100
      this.currencyList[index].currentPrice = 100
      this.curIndex = list.symbol
      this.focusIndex = index
      console.log(this.currencyList)
      axios.get('/api/ver2/exchange/unionpay/latest').then(response => {
        let topCur, bottomCur, basCur
        if (this.curIndex === 'CNY') {
          for (let i = 0; i < this.currencyList.length; i++) {
            if (i === index) {
              continue
            }
            // console.log('currencyList:', this.currencyList)
            for (let j = 0; j < response.data.resources.length; j++) {
              if (this.currencyList[i].symbol + '=X' === response.data.resources[j].resource.fields.symbol) {
                this.currencyList[i].currentPrice = response.data.resources[j].resource.fields['xch-sell'] * 100
                this.currencyList[i].currentPrice = this.currencyList[i].currentPrice.toFixed(2)
              }
            }
          }
        } else {
          for (let x = 0; x < response.data.resources.length; x++) {
            if (this.curIndex + '=X' === response.data.resources[x].resource.fields.symbol) {
              // console.log('1')
              topCur = response.data.resources[x].resource.fields['xch-sell']
              // console.log(topCur)
              break
            }
          }
          for (let x = 0; x < this.currencyList.length; x++) {
            if (x === index) {
              continue
            } else {
              for (let y = 0; y < response.data.resources.length; y++) {
                if (this.currencyList[x].symbol + '=X' === response.data.resources[y].resource.fields.symbol) {
                  // console.log('2')
                  bottomCur = 1 / (response.data.resources[y].resource.fields['xch-sell'])
                  // console.log(bottomCur)
                  basCur = 1 / (topCur * bottomCur)
                  // console.log('3')
                  // console.log(basCur)
                  this.currencyList[x].currentPrice = basCur * 100
                  this.currencyList[x].currentPrice = this.currencyList[x].currentPrice.toFixed(2)
                }
              }
            }
          }
        }
      })
    },
    inputCur: function (index, item) {
      console.log(this.curIndex)
      console.log(item.input)
      // let currency
      if (this.curIndex === 'CNY') {
        axios.get('/api/ver2/exchange/unionpay/latest').then(response => {
          for (let x = 0; x < this.currencyList.length; x++) {
            if (x === index) {
              continue
            }
            for (let y = 0; y < response.data.resources.length; y++) {
              if (this.currencyList[x].symbol + '=X' === response.data.resources[y].resource.fields.symbol) {
                this.currencyList[x].input = response.data.resources[y].resource.fields['xch-sell'] * this.currencyList[this.focusIndex].input
                console.log(this.currencyList[x].input)
                this.currencyList[x].input = this.currencyList[x].input.toFixed(2)
              }
            }
          }
        })
        // for (let x = 0; x < this.currencyList.length; x++) {
        //   if (x === index) {
        //     continue
        //   }
        //   // currency = this.curCNY(this.currencyList[x].symbol)
        //   // console.log(currency)
        //   this.currencyList[x].currentPrice = currency * 100
        //   this.currencyList[x].currentPrice = this.currencyList[x].currentPrice.toFixed(2)
        // }
      } else {
        let topCur, bottomCur, basCur
        axios.get('/api/ver2/exchange/unionpay/latest').then(response => {
          for (let x = 0; x < response.data.resources.length; x++) {
            if (this.curIndex + '=X' === response.data.resources[x].resource.fields.symbol) {
              // console.log('1')
              topCur = response.data.resources[x].resource.fields['xch-sell']
              // console.log(topCur)
              break
            }
          }
          for (let x = 0; x < this.currencyList.length; x++) {
            if (x === index) {
              continue
            } else {
              for (let y = 0; y < response.data.resources.length; y++) {
                if (this.currencyList[x].symbol + '=X' === response.data.resources[y].resource.fields.symbol) {
                  // console.log('2')
                  bottomCur = 1 / (response.data.resources[y].resource.fields['xch-sell'])
                  // console.log(bottomCur)
                  basCur = 1 / (topCur * bottomCur)
                  // console.log('3')
                  // console.log(basCur)
                  this.currencyList[x].input = basCur * this.currencyList[this.focusIndex].input
                  this.currencyList[x].input = this.currencyList[x].input.toFixed(2)
                }
              }
            }
          }
        })
      }
    },
    curCNY: function (goal) {
      axios.get('/api/ver2/exchange/unionpay/latest').then(response => {
        for (let x = 0; x < response.data.resources.length; x++) {
          if (goal + '=X' === response.data.resources[x].resource.fields.symbol) {
            // console.log(goal)
            console.log(response.data.resources[x].resource.fields['xch-sell'])
            return response.data.resources[x].resource.fields['xch-sell']
          }
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
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
    width: 650px;
    margin: 0 auto;
  }
  .current_currency {
    text-align: right;
  }
  .selectCur {
    width: 650px;
    height: 500px;
    top: 700px;
    // margin-top: -520px;
    margin: 0 auto;
    z-index: 9;
  }
</style>
