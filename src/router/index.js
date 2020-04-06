import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
const router = new VueRouter({
  // 懒加载
  routes: [
    // 看板页面
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      component: resolve => require(['../components/login/login.vue'], resolve)
    },
    {
      path: '/loginOld',
      component: resolve => require(['../components/login/loginOld.vue'], resolve)
    },
    {
      path: '/projectManagement',
      component: resolve => require(['../components/projectManagement/projectManagement.vue'], resolve)
    },
    {
      path: '/homePage',
      component: resolve => require(['../components/homePage/homePage.vue'], resolve)
    },
    {
      path: '/home',
      component: resolve => require(['../components/home/home.vue'], resolve)
    },
    {
      path: '/green',
      component: resolve => require(['../components/green/green.vue'], resolve)
    },
    {
      path: '/green/g_particulars',
      component: resolve => require(['../components/green/g_particulars.vue'], resolve)
    },
    {
      path: '/green/g_electricity',
      component: resolve => require(['../components/green/g_electricity'], resolve)
    },
    {
      path: '/labour',
      component: resolve => require(['../components/labour/labour.vue'], resolve)
    },
    {
      path: '/unopen',
      component: resolve => require(['../components/unopen/unopen.vue'], resolve)
    },
    {
      path: '/monitoring',
      component: resolve => require(['../components/monitoring/monitoring.vue'], resolve)
    },
    {
      path: '/aiDiscern',
      component: resolve => require(['../components/aiDiscern/aiDiscern.vue'], resolve)
    },
    {
      path: '/information',
      component: resolve => require(['../components/information/information.vue'], resolve)
    },
    {
      path: '/schedule',
      component: resolve => require(['../components/schedule/schedule.vue'], resolve)
    },
    {
      path: '/safety',
      component: resolve => require(['../components/safety/safety.vue'], resolve),
      children: [{
          path: "",
          component: resolve => require(['../components/safety/elevator.vue'], resolve)
        },
        {
          path: "towerCrane",
          component: resolve => require(['../components/safety/towerCrane.vue'], resolve)
        },
        {
          path: "elevator",
          component: resolve => require(['../components/safety/elevator.vue'], resolve)
        },
        {
          path: "car",
          component: resolve => require(['../components/safety/car.vue'], resolve)
        },
        {
          path: "gantryCrane",
          component: resolve => require(['../components/safety/gantryCrane.vue'], resolve)
        },
        {
          path: "gas",
          component: resolve => require(['../components/safety/gas.vue'], resolve)
        },
      ]
    },
    {
      path: '/location',
      component: resolve => require(['../components/location/location.vue'], resolve),
      children: [{
          path: "",
          component: resolve => require(['../components/location/l_monitoring.vue'], resolve)
        },
        {
          path: "l_homePage",
          component: resolve => require(['../components/location/l_homePage.vue'], resolve)
        },
        {
          path: "l_monitoring",
          component: resolve => require(['../components/location/l_monitoring.vue'], resolve)
        },
        {
          path: "l_search",
          component: resolve => require(['../components/location/l_search.vue'], resolve)
        },
        {
          path: "l_history",
          component: resolve => require(['../components/location/l_history.vue'], resolve)
        },
        {
          path: "l_set",
          component: resolve => require(['../components/location/l_set.vue'], resolve)
        },
        {
          path: "l_rail",
          component: resolve => require(['../components/location/l_rail.vue'], resolve)
        },
        {
          path: "l_alarmInformation",
          component: resolve => require(['../components/location/l_alarmInformation.vue'], resolve)
        },
      ]
    },
    {
      path: '/quality',
      component: resolve => require(['../components/quality/quality.vue'], resolve),
      children: [{
          path: "",
          component: resolve => require(['../components/quality/q_statistics.vue'], resolve)
        },
        {
          path: "q_statistics",
          component: resolve => require(['../components/quality/q_statistics.vue'], resolve)
        },
        {
          path: "q_set",
          component: resolve => require(['../components/quality/q_set.vue'], resolve)
        },
        {
          path: "q_record",
          component: resolve => require(['../components/quality/q_record.vue'], resolve)
        },
        {
          path: "q_infopath",
          component: resolve => require(['../components/quality/q_infopath.vue'], resolve)
        },
        {
          path: 'q_infoParticulars',
          component: resolve => require(['../components/quality/q_infoParticulars.vue'], resolve)
        },
      ]
    },
    {
      path: '/q_particulars',
      component: resolve => require(['../components/quality/q_particulars.vue'], resolve)
    },
    {
      path: '/workerHome',
      component: resolve => require(['../components/worker/workerHome.vue'], resolve)
    },
    {
      path: '/workerParticular',
      component: resolve => require(['../components/worker/workerParticular.vue'], resolve)
    },
    {
      path: '/dormitory',
      component: resolve => require(['../components/dormitory/dormitory.vue'], resolve)
    },
    {
      path: '/gongsiManagement',
      component: resolve => require(['../components/gongsiManagement/gongsiManagement.vue'], resolve)
    },
    {
      path: '/gongsiShouquan',
      component: resolve => require(['../components/gongsiManagement/gongsiShouquan.vue'], resolve)
    },
    {
      path: '/projectShezhi',
      component: resolve => require(['../components/projectManagement/projectShezhi.vue'], resolve)
    },
    {
      path: '/projectShouquan',
      component: resolve => require(['../components/projectManagement/projectShouquan.vue'], resolve)
    },
    {
      path: '/gaoZhiMo',
      component: resolve => require(['../components/gaoZhiMo/gaoZhiMo.vue'], resolve)
    },
    {
      path: '/shenJiKeng',
      component: resolve => require(['../components/shenJiKeng/shenJiKeng.vue'], resolve)
    },
    {
      path: '/companyGuanLi',
      component: resolve => require(['../components/company/companyGuanLi/companyGuanLi.vue'], resolve),
      children: [{
          path: '',
          component: resolve => require(['../components/company/companyGuanLi/companyGuanLi_set.vue'], resolve)
        },
        {
          path: '/companyGuanLi_set',
          component: resolve => require(['../components/company/companyGuanLi/companyGuanLi_set.vue'], resolve)
        },
        {
          path: '/companyGuanLi_user',
          component: resolve => require(['../components/company/companyGuanLi/companyGuanLi_user.vue'], resolve)
        },
        {
          path: '/companyGuanLi_role',
          component: resolve => require(['../components/company/companyGuanLi/companyGuanLi_role.vue'], resolve)
        }
      ]
    },
    {
      path: '/projectGuanLi',
      component: resolve => require(['../components/company/projectGuanLi/projectGuanLi.vue'], resolve),
      children: [{
          path: '',
          component: resolve => require(['../components/company/projectGuanLi/projectGuanLi_set.vue'], resolve)
        },
        {
          path: '/projectGuanLi_set',
          component: resolve => require(['../components/company/projectGuanLi/projectGuanLi_set.vue'], resolve)
        },
        {
          path: '/projectGuanLi_user',
          component: resolve => require(['../components/company/projectGuanLi/projectGuanLi_user.vue'], resolve)
        }
      ]
    },
    {
      path: '/talkback',
      meta: {
        needLogin: true
      },
      component: resolve => require(['@/components/talkback/talkback.vue'], resolve)
    },
    // 后台管理系统页面
    {
      path: '/spectaculars',
      component: resolve => require(['../components/system/systemLiangZhi/spectaculars.vue'], resolve)
    },
    {
      path: '/systemHome',
      component: resolve => require(['../components/system/systemHome.vue'], resolve)
    },
    {
      path: '/systemMonitoring',
      component: resolve => require(['../components/system/systemMonitoring/systemMonitoring.vue'], resolve)
    },
    {
      path: '/systemInformation',
      component: resolve => require(['../components/system/systemInformation/systemInformation.vue'], resolve)
    },
    {
      path: '/systemLiangZhi',
      component: resolve => require(['../components/system/systemLiangZhi/systemLiangZhi.vue'], resolve),
      children: [{
          path: '',
          component: resolve => require(['../components/system/systemLiangZhi/systemLiangZhi_home.vue'], resolve)
        },
        {
          path: '/systemLiangZhi_home',
          component: resolve => require(['../components/system/systemLiangZhi/systemLiangZhi_home.vue'], resolve)
        },
        {
          path: '/systemLiangZhi_contractors',
          component: resolve => require(['../components/system/systemLiangZhi/systemLiangZhi_contractors.vue'], resolve)
        },
        {
          path: '/systemLiangZhi_team',
          component: resolve => require(['../components/system/systemLiangZhi/systemLiangZhi_team.vue'], resolve)
        },
        {
          path: '/systemLiangZhi_personnel',
          component: resolve => require(['../components/system/systemLiangZhi/systemLiangZhi_personnel.vue'], resolve)
        },
        {
          path: '/systemLiangZhi_attendance',
          component: resolve => require(['../components/system/systemLiangZhi/systemLiangZhi_attendance.vue'], resolve)
        },
        {
          path: '/systemLiangZhi_exception',
          component: resolve => require(['../components/system/systemLiangZhi/systemLiangZhi_exception'], resolve)
        },
        {
          path: '/systemLiangZhi_blacklist',
          component: resolve => require(['../components/system/systemLiangZhi/systemLiangZhi_blacklist'], resolve)
        },
        {
          path: '/systemLiangZhi_equipment',
          component: resolve => require(['../components/system/systemLiangZhi/systemLiangZhi_equipment'], resolve)
        },
        {
          path: '/systemLiangZhi_salary',
          component: resolve => require(['../components/system/systemLiangZhi/systemLiangZhi_salary'], resolve)
        },
        {
          path: '/systemLiangZhi_fw_one',
          component: resolve => require(['../components/system/systemLiangZhi/systemLiangZhi_fw_one.vue'], resolve)
        },
        {
          path: '/systemLiangZhi_fw_two',
          component: resolve => require(['../components/system/systemLiangZhi/systemLiangZhi_fw_two.vue'], resolve)
        },
        {
          path: '/systemLiangZhi_fw_three',
          component: resolve => require(['../components/system/systemLiangZhi/systemLiangZhi_fw_three.vue'], resolve)
        },
        {
          path: '/systemLiangZhi_fw_four',
          component: resolve => require(['../components/system/systemLiangZhi/systemLiangZhi_fw_four.vue'], resolve)
        },
        {
          path: '/systemLiangZhi_reward_category',
          component: resolve => require(['../components/system/systemLiangZhi/systemLiangZhi_reward_category.vue'], resolve)
        },
        {
          path: '/systemLiangZhi_reward_record',
          component: resolve => require(['../components/system/systemLiangZhi/systemLiangZhi_reward_record.vue'], resolve)
        },
        {
          path: '/systemLuabfZhi_reward_inquire',
          component: resolve => require(['../components/system/systemLiangZhi/systemLuabfZhi_reward_inquire.vue'], resolve)
        },
      ]
    },
    {
      path: '/systemZhiHui',
      component: resolve => require(['../components/system/systemZhiHui/systemZhiHui.vue'], resolve),
      children: [{
          path: '',
          component: resolve => require(['../components/system/systemZhiHui/systemZhiHui_taDiao.vue'], resolve)
        },
        {
          path: '/systemZhiHui_taDiao',
          component: resolve => require(['../components/system/systemZhiHui/systemZhiHui_taDiao.vue'], resolve)
        },
        {
          path: '/systemZhiHui_shengJiangJi',
          component: resolve => require(['../components/system/systemZhiHui/systemZhiHui_shengJiangJi.vue'], resolve)
        },
        {
          path: '/systemZhiHui_dianXiang',
          component: resolve => require(['../components/system/systemZhiHui/systemZhiHui_dianXiang.vue'], resolve)
        },
        {
          path: '/systemZhiHui_car',
          component: resolve => require(['../components/system/systemZhiHui/systemZhiHui_car.vue'], resolve)
        },
        {
          path: '/systemZhiHui_car_sub',
          component: resolve => require(['../components/system/systemZhiHui/systemZhiHui_car_sub'], resolve)
        },
        {
          path: '/systemZhiHui_gas',
          component: resolve => require(['../components/system/systemZhiHui/systemZhiHui_gas'], resolve)
        },
        {
          path: '/systemZhiHui_gaoZhiMo',
          component: resolve => require(['../components/system/systemZhiHui/systemZhiHui_gaoZhiMo.vue'], resolve)
        },
        {
          path: '/systemZhiHui_shenJiKeng',
          component: resolve => require(['../components/system/systemZhiHui/systemZhiHui_shenJiKeng.vue'], resolve)
        },
        {
          path: '/systemZhiHui_shuidian',
          component: resolve => require(['../components/system/systemZhiHui/systemZhiHui_shuidian.vue'], resolve)
        },
        {
          path: '/systemZhiHui_unloading',
          component: resolve => require(['../components/system/systemZhiHui/systemZhiHui_unloading.vue'], resolve)
        },
      ]
    },
    {
      path: '/systemGreen',
      component: resolve => require(['../components/system/systemGreen/systemGreen.vue'], resolve),
      children: [{
          path: '',
          component: resolve => require(['../components/system/systemGreen/systemGreen_TSP.vue'], resolve)
        },
        {
          path: '/systemGreen_TSP',
          component: resolve => require(['../components/system/systemGreen/systemGreen_TSP.vue'], resolve)
        },
      ]
    },
    {
      path: '/systemSet',
      component: resolve => require(['../components/system/systemSet/systemSet.vue'], resolve),
      children: [{
          path: '',
          component: resolve => require(['../components/system/systemSet/systemSet_workAreaSet.vue'], resolve)
        },
        {
          path: '/systemSet_workAreaSet',
          component: resolve => require(['../components/system/systemSet/systemSet_workAreaSet.vue'], resolve)
        },
        {
          path: '/systemSet_equipmentSet',
          component: resolve => require(['../components/system/systemSet/systemSet_equipmentSet.vue'], resolve)
        },
        {
          path: '/systemSet_equipmentSet_location',
          component: resolve => require(['../components/system/systemSet/systemSet_equipmentSet/systemSet_equipmentSet_location.vue'], resolve)
        },
        {
          path: '/systemSet_equipmentSet_towerCrane',
          component: resolve => require(['../components/system/systemSet/systemSet_equipmentSet/systemSet_equipmentSet_towerCrane.vue'], resolve)
        },
        {
          path: '/systemSet_equipmentSet_elevator',
          component: resolve => require(['../components/system/systemSet/systemSet_equipmentSet/systemSet_equipmentSet_elevator.vue'], resolve)
        },
        {
          path: '/systemSet_equipmentSet_electricityBox',
          component: resolve => require(['../components/system/systemSet/systemSet_equipmentSet/systemSet_equipmentSet_electricityBox.vue'], resolve)
        },
        {
          path: '/systemSet_equipmentSet_car',
          component: resolve => require(['../components/system/systemSet/systemSet_equipmentSet/systemSet_equipmentSet_car.vue'], resolve)
        },
        {
          path: '/systemSet_equipmentSet_camera',
          component: resolve => require(['../components/system/systemSet/systemSet_equipmentSet/systemSet_equipmentSet_camera.vue'], resolve)
        },
        {
          path: '/systemSet_equipmentSet_TSP',
          component: resolve => require(['../components/system/systemSet/systemSet_equipmentSet/systemSet_equipmentSet_TSP.vue'], resolve)
        },
        {
          path: '/systemSet_equipmentSet_quality',
          component: resolve => require(['../components/system/systemSet/systemSet_equipmentSet/systemSet_equipmentSet_quality.vue'], resolve)
        },
        {
          path: '/systemSet_equipmentSet_safety',
          component: resolve => require(['../components/system/systemSet/systemSet_equipmentSet/systemSet_equipmentSet_safety.vue'], resolve)
        },
        {
          path: '/systemSet_equipmentSet_spectaculars',
          component: resolve => require(['../components/system/systemSet/systemSet_equipmentSet/systemSet_equipmentSet_spectaculars.vue'], resolve)
        },
        {
          path: '/systemSet_permission_user',
          component: resolve => require(['../components/system/systemSet/systemSet_permission_user.vue'], resolve)
        },
        {
          path: '/systemSet_permission_role',
          component: resolve => require(['../components/system/systemSet/systemSet_permission_role.vue'], resolve)
        },
        {
          path: '/systemSet_unit',
          component: resolve => require(['../components/system/systemSet//systemSet_unit.vue'], resolve)
        },
      ]
    },
    {
      path: '/systemQuality',
      component: resolve => require(['../components/system/systemQuality/systemQuality.vue'], resolve),
      children: [{
          path: '',
          component: resolve => require(['../components/system/systemQuality/systemQuality_home.vue'], resolve)
        },
        {
          path: '/systemQuality_home',
          component: resolve => require(['../components/system/systemQuality/systemQuality_home.vue'], resolve)
        },
        {
          path: '/systemQuality_record',
          component: resolve => require(['../components/system/systemQuality/systemQuality_record.vue'], resolve)
        },
        {
          path: '/systemQuality_recordInfo',
          component: resolve => require(['../components/system/systemQuality/systemQuality_recordInfo.vue'], resolve)
        },
        {
          path: '/systemQuality_manage',
          component: resolve => require(['../components/system/systemQuality/systemQuality_manage.vue'], resolve)
        },
        {
          path: '/systemQuality_manageInfo',
          component: resolve => require(['../components/system/systemQuality/systemQuality_manageInfo.vue'], resolve)
        },
      ]
    },
    {
      path: '/systemPersonnel',
      component: resolve => require(['../components/system/systemPersonnel/systemPersonnel.vue'], resolve)
    },
    {
      path: '/systemLocation',
      component: resolve => require(['../components/system/systemPersonnel/systemLocation/systemLocation.vue'], resolve),
      children: [{
          path: '',
          component: resolve => require(['../components/system/systemPersonnel/systemLocation/systemLocation_home.vue'], resolve)
        },
        {
          path: '/systemLocation_home',
          component: resolve => require(['../components/system/systemPersonnel/systemLocation/systemLocation_home.vue'], resolve)
        },
        {
          path: '/systemLocation_search',
          component: resolve => require(['../components/system/systemPersonnel/systemLocation/systemLocation_search.vue'], resolve)
        },
        {
          path: '/systemLocation_history',
          component: resolve => require(['../components/system/systemPersonnel/systemLocation/systemLocation_history.vue'], resolve)
        },
        {
          path: '/systemLocation_alarm',
          component: resolve => require(['../components/system/systemPersonnel/systemLocation/systemLocation_alarm.vue'], resolve)
        },
      ]
    },
    {
      path: '/systemSafety',
      component: resolve => require(['../components/system/systemSafety/systemSafety.vue'], resolve),
      children: [{
          path: '',
          component: resolve => require(['../components/system/systemSafety/systemSafety_home.vue'], resolve)
        },
        {
          path: '/systemSafety_home',
          component: resolve => require(['../components/system/systemSafety/systemSafety_home.vue'], resolve)
        },
        {
          path: '/systemSafety_record',
          component: resolve => require(['../components/system/systemSafety/systemSafety_record.vue'], resolve)
        },
        {
          path: '/systemSafety_recordInfo',
          component: resolve => require(['../components/system/systemSafety/systemSafety_recordInfo.vue'], resolve)
        },
        {
          path: '/systemSafety_manage',
          component: resolve => require(['../components/system/systemSafety/systemSafety_manage.vue'], resolve)
        },
        {
          path: '/systemSafety_manageInfo',
          component: resolve => require(['../components/system/systemSafety/systemSafety_manageInfo'], resolve)
        },
      ]
    },
    {
      path: '/systemSchedule',
      component: resolve => require(['../components/system/systemSchedule/systemSchedule.vue'], resolve),
      children: [{
          path: '',
          component: resolve => require(['../components/system/systemSchedule/systemSchedule_home.vue'], resolve)
        },
        {
          path: '/systemSchedule_home',
          component: resolve => require(['../components/system/systemSchedule/systemSchedule_home.vue'], resolve)
        },
        {
          path: '/systemSchedule_control',
          component: resolve => require(['../components/system/systemSchedule/systemSchedule_control.vue'], resolve)
        },
        {
          path: '/systemSchedule_plan',
          component: resolve => require(['../components/system/systemSchedule/systemSchedule_plan.vue'], resolve)
        },
      ]
    },
    {
      path: '/blocPage',
      component: resolve => require(['../components/blocPage/blocPage.vue'], resolve)
    },
  ]
})

router.beforeEach((to, from, next) => {
  if (to.path == '/login') {
    next()
  } else {
    let islogin = JSON.parse(sessionStorage.getItem('islogin'))
    if (islogin == true) {
      next()
    } else {
      next('/login')
    }
  }
})

export default router