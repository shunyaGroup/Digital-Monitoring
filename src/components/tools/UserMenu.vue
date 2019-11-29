<template>
  <div class="user-wrapper" :class="theme">
  	<a-modal
            title="选择对应企业数据，点击跳过则为默认数据包。"
            v-model="visible"
            @ok="handleOk"
            okText="跳过"
            :closable="false"
            :cancelButtonProps="{ props: {disabled: true} }"
            :maskClosable="false"
          >

            <a-list
                itemLayout="horizontal"
                :dataSource="items"
              >
                <a-list-item slot="renderItem" slot-scope="item, index">
                  <a-list-item-meta>
                    <a slot="title" :id = "item.id" @click="dianji(item.id)" >{{item.name}}</a>
                    <a-avatar slot="avatar" :id = "item.id" :src="item.logo" style = "width: 55px;height: 39px;"/>
                  </a-list-item-meta>
                </a-list-item>
            </a-list>
    </a-modal> 
  	
    <!-- <span class="action">
      <a-icon type="question-circle-o"></a-icon>
    </span>
    <header-notice class="action"/> -->
   <!-- <a-dropdown>-->
    	<!--<span class="action action-full ant-dropdown-link user-dropdown-menu">-->
    		<!--<span>切换企业数据包</span>
    		<a-select defaultValue="lucy" style="width: 120px" @change="handleChange">
		      <a-select-option value="jack">Jack</a-select-option>
		      <a-select-option value="lucy">Lucy</a-select-option>
		      <a-select-option value="disabled" disabled>Disabled</a-select-option>
		      <a-select-option value="Yiminghe">yiminghe</a-select-option>
		    </a-select>-->
		    <a-button type="primary" @click='qiehuan' style="background: #FFFFFF;color: #000000;">切换企业</a-button>
      <span class="action action-full ant-dropdown-link user-dropdown-menu">
        <a-avatar class="avatar" size="small" :src="src"/>
        <span>{{this.name}}</span>
        <span>！{{this.trueN}}</span>
        <span>-{{this.mobile}}</span>
        <!-- v-if="isDesktop()"-->
      </span>
      <!--<a-menu slot="overlay" class="user-dropdown-menu-wrapper">
        <a-menu-item key="0">
          <router-link :to="{ name: 'account-center' }">
            <a-icon type="user"/>
            <span>个人中心</span>
          </router-link>
        </a-menu-item>
        <a-menu-item key="1">
          <router-link :to="{ name: 'account-settings' }">
            <a-icon type="setting"/>
            <span>账户设置</span>
          </router-link>
        </a-menu-item>-->
       <!-- <a-menu-item key="2" disabled>
          <a-icon type="setting"/>
          <span>测试</span>
        </a-menu-item>
        <a-menu-divider/>
        <a-menu-item key="3">
          <a href="javascript:;" @click="handleLogout">
            <a-icon type="logout"/>
            <span>退出登录</span>
          </a>
        </a-menu-item>-->
      <!--</a-menu>-->
<!--    </a-dropdown>-->
    <span class="action">
      <a class="logout_title" href="javascript:;" @click="handleLogout">
        <a-icon type="logout"/>
        <span v-if="isDesktop()">&nbsp;退出登录</span>
      </a>
    </span>
  </div>
  
</template>

<script>
  import { timeFix } from '@/utils/util'
  import HeaderNotice from './HeaderNotice'
  import { mapActions, mapGetters } from 'vuex'
  import { mixinDevice } from '@/utils/mixin.js'
  import { getInit } from '@/api/newpage'
  import { nLogin,dealList,selectDeal } from '@/api/newpage'
  export default {
    name: "UserMenu",
    mixins: [mixinDevice],
    components: {
      HeaderNotice
    },
    props: {
      theme: {
        type: String,
        required: false,
        default: 'dark'
      }
    },
    data(){
    	return{
    		visible:false,
    		items: [],
    		src:'',
    		name:'',
    		trueN:'',
    		mobile:'',
    		homeData:{
    			enterpriseInfo:[]
    		},
    		ep:{
		        id:''
		    }
    	}
    },
    mounted() {
    	this.getInit()
    },
    methods: {
      ...mapActions(["Logout"]),
      ...mapGetters(["username", ""]),
     /* getAvatar(){
        return this.avatar()
      },*/
	  showModal() {
      this.visible = true
       dealList().then(res => {
        console.log(res)
        this.items = res.list
        console.log(this.items)
        
        var deaS = this.items
        for(var i =0;i<deaS.length;i++){
					console.log(deaS[i])
	         this.items[i].logo = 'http://39.97.241.172' + deaS[i].logo
	         console.log(this.items[i].logo)
		};
       
        
      })
    },
    handleOk() {
      /*console.log();*/
      this.visible = false
      this.loginBtn = false
      this.$router.push({ name: 'dashboard' })
      this.$notification.success({
        message: '欢迎',
        description: `${timeFix()}，欢迎回来`
      })
    },
    qiehuan(){
    	this.visible = true
    	this.showModal()
    },
    dianji(id){
      console.log(id)
      this.ep.id = id
      console.log(this.ep.id);
      selectDeal(this.ep).then(res => {
        console.log(res)
      this.loginBtn = false
      this.$router.push({ name: 'dashboard' })
      /*this.$notification.success({
        message: '欢迎',
        description: `${timeFix()}，欢迎回来`
      })*/
      this.getInit()
     	this.$notification.success({
        message: '欢迎',
        description: `${timeFix()}，欢迎回来`
      	})
      this.visible = false
    })
   },
      getInit(){
      	getInit().then( res => {
      		console.log(res)
      		this.homoData = res.list
      		this.enterpriseInfo = res.list.enterpriseInfo 
      		//this.homoData.userInfo.true_name = res.list.userInfo.true_name
      		console.log(this.homoData.userInfo.true_name)
      		this.trueN = res.list.userInfo.true_name
      		this.mobile = res.list.userInfo.mobile
      		
      		console.log(this.trueN)
      		var qiyeArr = this.enterpriseInfo
      		
					for(let i = 0, len = qiyeArr.length; i < len; i++) {
					    console.log(qiyeArr[i]);
					    this.name = qiyeArr[0].name
					    this.src = 'http://39.97.241.172' + qiyeArr[0].logo
					    console.log(this.name)
					    console.log(this.src)
					}
      		
      	})
      },
      handleLogout() {
        const that = this

        this.$confirm({
          title: '提示',
          content: '真的要注销登录吗 ?',
          onOk() {
            return that.Logout({}).then(() => {
                window.location.href="/";
              //window.location.reload()
            }).catch(err => {
              that.$message.error({
                title: '错误',
                description: err.message
              })
            })
          },
          onCancel() {
          },
        });
      },
    }
  }
</script>

<style scoped>
  .logout_title {
    color: inherit;
    text-decoration: none;
  }
  .layout .header .user-wrapper .action .avatar, .layout .top-nav-header-index .user-wrapper .action .avatar {
    margin: 0px 10px 0px 0px;
    color: #1890ff;
    background: rgba(255, 255, 255, 0.85);
    vertical-align: middle;
    width: 80px;
    height: 50px;
    line-height: 50px;
    border-radius: 10px;
}
</style>