<template>
  <div id="userLayout" :class="['user-layout-wrapper', device]">
    <div class="container">
      <!-- <div class="top">
        <div class="header desc">
          <a href="/">
            <img src="~@/assets/logo.svg" class="logo" alt="logo">
            <span class="title">正量数据演示平台</span>
          </a>
        </div>
        <div class="desc">
          Jeecg Boot 是中国最具影响力的 企业级 快速开发平台
        </div>
      </div> -->

      <route-view></route-view>

      <div class="footer">
        <!-- <div class="links">
          <a href="http://jeecg-boot.mydoc.io" target="_blank">帮助</a>
          <a href="https://github.com/zhangdaiscott/jeecg-boot" target="_blank">隐私</a>
          <a href="https://github.com/zhangdaiscott/jeecg-boot" target="_blank">条款</a>
        </div> -->
        <div class="copyright">
          Copyright  ©上海至深大数据科技有限公司(宣亚集团)出品
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import RouteView from "@/components/layouts/RouteView"
  import { mixinDevice } from '@/utils/mixin.js'
	import imgUrl from '../../static/img/dashuju.jpg'
  export default {
    name: "UserLayout",
    components: { RouteView },
    mixins: [mixinDevice],
    data () {
      return {}
    },
    mounted () {
      document.body.classList.add('userLayout')
    },
    beforeDestroy () {
      document.body.classList.remove('userLayout')
    },
  }
</script>

<style lang="scss" scoped>
  #userLayout.user-layout-wrapper {
    height: 100%;

    &.mobile {
      .container {
        .main {
          max-width: 368px;
          width: 98%;
        }
      }
    }

    .container {
      width: 100%;
      min-height: 100%;
      background: url(../../static/img/dashuju.jpg) no-repeat;
      /*background: url(~@/assets/background.png) no-repeat;*/
      background-size: 100% 100%;
      padding: 110px 0 144px;
      position: fixed;
      left: 0xp;
      right: 0px;
      top: 0px;
      bottom: 0px;
      z-index: 100;
      a {
        text-decoration: none;
      }

      .top {
        text-align: center;

        .header {
          height: 44px;
          line-height: 44px;

          .badge {
            position: absolute;
            display: inline-block;
            line-height: 1;
            vertical-align: middle;
            margin-left: -12px;
            margin-top: -10px;
            opacity: 0.8;
          }

          .logo {
            height: 44px;
            vertical-align: top;
            margin-right: 16px;
            border-style: none;
          }

          .title {
            font-size: 33px;
            color: rgba(0, 0, 0, .85);
            font-family: "Chinese Quote", -apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "Helvetica Neue", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
            font-weight: 600;
            position: relative;
            top: 2px;
          }
        }
        .desc {
          font-size: 14px;
          color: rgba(0, 0, 0, 0.45);
          margin-top: 12px;
          margin-bottom: 40px;
        }
      }

      .main {
        min-width: 260px;
        width: 300px;
        margin: 0 auto;
        background: white;
        border-radius: 5px;
        position: absolute;
        right: 400px;
        top: 50%; /*偏移*/
        transform: translateY(-60%);
        padding: 20px;
        padding-top: 30px;
        box-shadow: 50px 50px 30px 6px #348fc6;
      }


      .footer {
        position: absolute;
        width: 100%;
        bottom: 0;
        padding: 0 16px;
        margin: 24px 0 24px;
        text-align: center;

        .links {
          margin-bottom: 8px;
          font-size: 14px;
          a {
            color: rgba(0, 0, 0, 0.45);
            transition: all 0.3s;
            &:not(:last-child) {
              margin-right: 40px;
            }
          }
        }
        .copyright {
          /*color: rgba(0, 0, 0, 0.45);*/
          color:#27f1ebe3;
          font-size: 14px;
        }
      }
    }
  }
</style>