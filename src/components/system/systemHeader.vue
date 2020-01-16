<template>
    <div id="systemHeader">
        <div class="float-left">
            <router-link to="/home" class="logo" target="_blank" v-if="!$exe.installation"></router-link>
            <router-link to="/home" class="logo" v-else></router-link>
            <div class="line"></div>
            <div class="project-name">{{projectName}}</div>
        </div>
        <div class="float-right">
            <a class="message">
                消息
            </a>
            <!-- <a class="home">
                首页
            </a> -->
            <router-link to="/systemHome" class="home">
                首页
            </router-link>
            <a class="user">
                <el-dropdown @command="handleCommand">
                    <a class="el-dropdown-link">
                        <!-- 用户 -->
                        {{userName}}
                        <i class="el-icon-arrow-down el-icon--right"></i>
                    </a>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item command="edit">修改密码</el-dropdown-item>
                        <el-dropdown-item command="login">退出</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </a>
        </div>
        <change-password :show="dialogShow" @close="dialogShow=false"></change-password>
    </div>
</template>

<style lang="less">
    #systemHeader {
        width: 100%;
        height: .8rem;
        background: linear-gradient(to right, #6cc4ff, #489cff);
        .float-left {
            float: left;
            height: .8rem;
            line-height: .8rem;
            padding-left: .24rem;
            a {
                width: 1.75rem;
                height: .3rem;
                display: inline-block;
                vertical-align: middle;
                background-size: contain;
                background-repeat: no-repeat;
                background-position: center center;
                background-image: url('../../../static/images/szsw-long.png');
                background-size: 100% 100%;
            }
            div {
                color: #fff;
                display: inline-block;
            }
            .line {
                height: .2rem;
                width: .01rem;
                // line-height: .8rem;
                margin-left: .16rem;
                margin-right: .16rem;
                vertical-align: middle;
                background-color: #fff;
            }
            .project-name {
                font-size: .2rem;
                vertical-align: middle;
            }
        }
        .float-right {
            float: right;
            margin-top: .27rem;
            padding-right: .3rem;
            >a {
                color: #fff;
                font-size: .2rem;
                a {
                    color: #fff;
                    font-size: .2rem;
                }
            }
            .user {
                margin-left: .56rem;
            }
            .home {
                margin-left: .38rem;
            }
        }
    }
</style>

<script>
import changePassword from '@/base/changePassword'
export default {
    data() {
        return {
            pid: '', // 项目id
            projectName: '', // 项目名称
            userName: '', // 用戶名
            dialogShow: false, // 修改密码弹窗
        }
    },
    components: {
        changePassword
    },
    created() {
        this.getProjectId()
        this.selectIndex()
        this.getName()
    },
    methods: {
        // 获取项目id
        getProjectId() {
            this.pid = sessionStorage.getItem('pid')
        },

        // 获取项目名称
        selectIndex() {
            this.$axios.post(`/api/pcLzIndex/selectIndex?pid=${this.pid}`).then(
                res => {
                    // console.log(res.data.data.projectName)
                    this.projectName = res.data.data.projectName
                }
            )
        },

        // 退出
        handleCommand(command) {
            if (command == 'login') {
                this.$router.push('login')
                sessionStorage.setItem("islogin", "false")
            } else if (command == 'edit') {
                this.dialogShow = true
            }
        },

        // 獲取用戶名
        getName() {
            this.userName = sessionStorage.getItem('userName')
        },

        // 切换header
        header() {
            // this.$store.commit('changeSystemHeader', false)
            // this.$store.commit('changeHeader', true)
        },
    }
}
</script>

