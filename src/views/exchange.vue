<template>
  <div class="app_container">
    我是汇率换算页面
    <div
      class="currency_list"
      v-for="(item,index) in (currency)"
      :key="index"
    >
      <el-card
        class="box-card"
        shadow="hover"
      >
        <div class="item_left">
          <img :src=item.src /><span @click="showlist(index)">{{ item.countryName }}</span>
          <select v-model="item.index" name="countryOptions" @change="changeCountry(item,countryOptions)" >
            <option :value="options.name" v-for="(options) in countryOptions" :key="options">
              <span>{{ options.name }}</span>
            </option>
          </select>
        </div>
        <div class="item_right" style="float: right; display: grid; margin-right: 50px;">
          <el-input v-model="input" placeholder="100"></el-input>
          <span class="money_name" style="text-align: right;">{{ item.moneyName }}</span>
        </div>
      </el-card>
    </div>
    <!-- <div v-for="item in currency" :key="item">
      <el-card class="box-card" shadow="hover">
        <div class="text item" style="height: 25px; margin-bottom: 5px;">
          <div class="item_left" style="float: left;">
            <span><img class="countryFlag" :src=item.src style="width: 50px;" />{{ item.countryName }}</span>
              <ul v-show="flag">
                <li @click="checkThis(item.countryName,item.src)" v-for="item in currency" :key="item">
                  <img :src="item.src" />
                  <span>{{ item.countryName }}</span>
                </li>
              </ul>
          </div>
          <div class="item_right" style="float: right; display: grid;">
            <el-input v-model="input" placeholder="100"></el-input>
            <span class="money_name" style="text-align: right;">{{ item.moneyName }}</span>
          </div>
        </div>
      </el-card>
    </div> -->
  </div>
</template>

<script>
export default {
  name: 'Exchange',
  data () {
    return {
      selected: '',
      flag: false,
      currency: [
        {
          src: '../../static/img/china.png',
          countryName: '中国',
          money: '100',
          moneyName: '人民币¥'
        },
        {
          src: '../../static/img/america.png',
          countryName: '美国',
          money: '100',
          moneyName: '美元¥'
        },
        {
          src: '../../static/img/italy.png',
          countryName: '意大利',
          money: '100',
          moneyName: '意大利元¥'
        },
        {
          src: '../../static/img/hongkong.png',
          countryName: '香港',
          money: '100',
          moneyName: '港币¥'
        },
        {
          src: '../../static/img/macao.png',
          countryName: '澳门',
          money: '100',
          moneyName: '澳元币¥'
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
      ]
    }
  },
  methods: {
    showlist: function (index) {
      console.log(index)
      this.flag = !this.flag
      console.log('111' + this.countryOptions[index].flag)
    },
    changeCountry: function (item, countryOptions) {
      item.countryName = item.index
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
  /* .el-card {
      border: 1px solid #464646;
      background-color: #434958eb !important;
      color: #26282b;
      -webkit-transition: .3s;
      transition: .3s;
      border-radius: 0px;
  }
  .el-card__body {
    padding: 5px;
    width: 600px;
  }
  .el-card:hover {
    background-color: #666b75 !important;
  }
  .el-input__inner {
    text-align: right;
    -webkit-appearance: none;
    background-color: #515766;
    background-image: none;
    border-radius: 4px;
    border: 1px solid #515766;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    color: #ffffff;
    display: inline-block;
    font-size: inherit;
    height: 40px;
    line-height: 40px;
    outline: 0;
    padding: 0 15px;
    -webkit-transition: border-color .2s cubic-bezier(.645,.045,.355,1);
    transition: border-color .2s cubic-bezier(.645,.045,.355,1);
    width: 100%;
  } */
</style>
