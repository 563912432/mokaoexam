<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
html,body {
  width: 100%;
  height: 100%;
  overflow: hidden;
  margin: 0;
  padding: 0;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /*text-align: center;*/
  color: #2c3e50;
  font-size: 16px;
  width: 100%;
  height: 100%;
  overflow: auto;
}
  .flex {
    display: flex;
  }
  .flex-1{
    flex: 1;
  }
  .flex-column{
    flex-direction: column;
  }
  .flex-align-center {
    align-items: center;
  }
  .flex-justify-center{
    justify-content: center;
  }
  .flex-justify-end{
    justify-content: flex-end;
  }
  .flex-justify-between{
    justify-content: space-between;
  }
  .button{
    width: 206px!important;
    height: 48px!important;
    font-size: 16px!important;
  }
  .margin-top-10{
    margin-top: 10px;
  }
  .margin-top-15{
    margin-top: 15px;
  }
  .margin-bottom-5{
    margin-bottom: 5px
  }
.flex-start{
  justify-content: flex-start;
}
.flex-end{
  justify-content: flex-end;
}
.c-red{
  color: #F56C6C;
}
.c-blue{
  color: #447ED9;
}
.c-333 {
  color: #333333;
}
.c-666 {
  color: #666666;
}
.c-999 {
  color: #999999;
}
.c-light{
  background-color: #F2F6FC;
  color: #ffffff;
}
.f-bold {
  font-weight: bold;
}

.pointer {
  cursor: pointer;
}
.f12 {
  font-size: 12px;
}
.f14 {
  font-size: 14px;
}
.f15 {
  font-size: 15px;
}
.f16 {
  font-size: 16px;
}
.f18 {
  font-size: 18px;
}
.f20 {
  font-size: 20px;
}
.font-parse{
  font-family: Georgia,"Times New Roman",Times,Kai,"Kaiti SC",KaiTi,BiauKai,FontAwesome,serif;
}
.pd-5 {
  padding: 5px
}

.pd-10 {
  padding: 10px
}
.pd-left-right-10 {
  padding-left: 10px;
  padding-right: 10px;
}
.pd-20 {
  padding: 20px
}
.pd-15 {
  padding: 15px
}
.pl-10 {
  padding-left: 10px
}
.pl-15 {
  padding-left: 15px
}
.pl-20 {
  padding-left: 20px
}
.pt-10 {
  padding-top: 10px;
}
.pt-15 {
  padding-top: 15px;
}
.pt-20 {
  padding-top: 20px;
}
.pt-30 {
  padding-top: 30px;
}
.pd-30 {
  padding: 30px;
}
.pb-15 {
  padding-bottom: 15px;
}
.pb-20 {
  padding-bottom: 20px;
}
.border-radius-3{
  border-radius: 3px;
}
.mt-5 {
  margin-top: 5px;
}
.mt-10 {
  margin-top: 10px
}
.mt-15 {
  margin-top: 15px
}
.mt-20 {
  margin-top: 20px
}
.mt-30 {
  margin-top: 30px
}
.mb-5 {
  margin-bottom: 5px
}
.mb-10 {
  margin-bottom: 10px
}
.mb-12 {
  margin-bottom: 12px
}
.mb-15 {
  margin-bottom: 15px
}
.mb-20 {
  margin-bottom: 20px
}
.mb-25 {
  margin-bottom: 25px
}
.mb-30 {
  margin-bottom: 30px
}
.ml-5 {
  margin-left: 5px
}
.ml-10{
  margin-left: 10px;
}
.ml-15{
  margin-left: 15px;
}
.ml-20 {
  margin-left: 20px
}
.mr-5 {
  margin-right: 5px
}
.mr-20 {
  margin-right: 20px
}
.line-height25 {
  line-height: 25px;
}
.border1{
  border: solid 1px #E4E7ED;
}
.border-bottom-line {
  border-bottom: 1px solid #E6E6E6;
}
.separate-line {
  height: 25px;
  width: 1px;
  border-right: 1px solid #ddd
}
.text-center {
  text-align: center;
}
.text-right {
  text-align: right;
}
.small {
  font-size: 12px;
}

.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%
}
.line-one-title{
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  letter-spacing:1px;
}
.line-two-title{
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  letter-spacing:1px;
}
h4{
  font-size: 20px;
  line-height: 60px;
  white-space: nowrap;
  margin: 0 0 10px 0;
  color: #333;
}
.tm-text{
  padding: 0 15px;
  border-left: solid 1px #F2F6FC;
  line-height: 25px;
  margin-bottom: 15px;
}
.tm-text p{
  margin: 0;
}
.tm-option{
  padding: 0 15px;
  border-left: solid 1px #F2F6FC;
  margin-bottom: 15px;
}
.tm-option p{
  margin: 10px 0;
  font-size: 16px;
}
</style>
