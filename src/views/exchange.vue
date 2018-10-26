<template>
  <div class="app_container">
    我是汇率换算页面
    <!-- <div v-for="item in currency" :key="item">
      <el-card class="box-card" shadow="hover">
        <div class="text item" style="height: 25px; margin-bottom: 5px;">
          <div class="item_left" style="float: left;">
            <img class="countryFlag" :src=item.src style="width: 50px;" />
            <span class="countryName">{{ item.countryName }}</span>
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
      currency: [
        {
          src: '../../static/img/china.png',
          countryName: '中国',
          money: '100',
          moneyName: '人民币¥'
        },
        {
          src: '../../static/img/china.png',
          countryName: '中国',
          money: '100',
          moneyName: '人民币¥'
        },
        {
          src: '../../static/img/china.png',
          countryName: '中国',
          money: '100',
          moneyName: '人民币¥'
        },
        {
          src: '../../static/img/china.png',
          countryName: '中国',
          money: '100',
          moneyName: '人民币¥'
        },
        {
          src: '../../static/img/china.png',
          countryName: '中国',
          money: '100',
          moneyName: '人民币¥'
        }
      ]
    }
  }
}
</script>

<style>
  * {
    padding: 0;
    margin: 0;
  }
  .el-card {
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
  }
</style>
