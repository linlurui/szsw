<template>
  <div class="content">
    <!-- <span class="backTo" v-if="$exe.installation" @click="backTo">返回</span>
    <span class="reload" v-if="$exe.installation" @click="reload">刷新</span> -->
    <!-- <span class="backTo" @click="backTo">返回</span> -->
    <!-- 左侧视频列表 -->
    <ul class="video-list-wrap">
      <!-- 分区列表 -->
      <li v-for="item0 in listWrap" :key="item0.areaName" :title="item0.areaName">
        <div
          class="list"
          :class="item0.areaName == lifeName ? 'active' :  ''"
          @click="openLife(item0.areaName)"
          style="display: none"
        >
          <i class="el-icon-office-building"></i>
          <p>{{item0.areaName}}</p>
          <i class="el-icon-caret-right"></i>
        </div>
        <!-- 项目列表 -->
        <transition name="fade">
          <ul class="child" v-show="item0.areaName == lifeName">
            <li v-for="item in item0.projectList" :key="item.pid" :title="item.projectName">
              <div class="lists" :class="item.pid == liId ? 'active' : ''">
                <i class="el-icon-map-location" @click="dialogMap(item, $event)" title="点击查看摄像头位置"></i>
                <i
                  class="el-icon-video-camera"
                  :class="camera.pid == item.pid && camera.areaName == item0.areaName ? 'red' : ''"
                  @click="setCamera(item0.areaName, item.pid)"
                  title="点击播放该项目下所有视频"
                ></i>
                <p @click="setCamera(item0.areaName, item.pid)" id="onlyArea">{{item.projectName}}</p>
                <i class="el-icon-caret-right"></i>
              </div>
              <!-- 摄像头列表 -->
              <transition name="fade">
                <ul class="childs" v-show="item.pid == liId">
                  <li
                    v-for="item2 in item.videoList"
                    :key="item2.videoSn"
                    draggable="true"
                    @dragend="dragend(item.pid, item2.videoSn)"
                    :title="item2.videoName"
                    @click="videoListClick"
                  >
                    <div
                      class="loading-img"
                      v-loading="imgLoading"
                      element-loading-spinner="el-icon-loading"
                      element-loading-background="#081038"
                    >
                      <template v-for="(itemImg, index) in imgList">
                        <img
                          :src="itemImg.picUrl?itemImg.picUrl:noPic"
                          :key="itemImg.videoSn"
                          v-if="itemImg.isStatus == '1'&&itemImg.videoSn==item2.videoSn"
                        />
                        <span :key="index" v-if="itemImg.videoSn==item2.videoSn">该摄像头不在线</span>
                      </template>
                    </div>
                    <p>{{item2.videoName}}</p>
                  </li>
                </ul>
              </transition>
            </li>
          </ul>
        </transition>
      </li>
    </ul>
    <!-- 右侧视频标签和对讲机模块 -->
    <box class="video-wrap">
      <div class="video-top">
        <div
          class="video-area"
          :class="videoNum == 4 ? 'area4' : videoNum == 9 ? 'area9' : videoNum ==16 ? 'area16' : 'area1'"
        >
          <!-- 全屏显示 -->
          <div class="video-only" v-if="videoNum==1">
            <div class="background"></div>
            <span class="center"></span>
            <span class="back" @click="back">
              <i class="el-icon-arrow-left"></i>
              返回列表
            </span>
            <div class="get-time" v-if="!isDaHua">
              <span>回放开始：</span>
              <input
                type="datetime-local"
                v-model="beginTime"
                min="2000-01-01T01:01"
                :max="nowTime"
              />
              <br />
              <span>回放结束：</span>
              <input type="datetime-local" v-model="endTime" :max="nowTime" />
            </div>
            <span
              class="cut"
              @click="cutDefinition=!cutDefinition,getIframeSrc()"
              v-if="!playback && !isDaHua && (!beginTime||!endTime)"
            >{{cutDefinition?'高清':'标清'}}</span>
            <span
              class="cut"
              @click="checkedTime"
              v-if="beginTime && endTime && !isDaHua"
              :style="{right: playback?'0.6rem':'0.5rem'}"
            >确定</span>
            <span
              class="cut-back"
              @click="playback=false,getIframeSrc()"
              v-if="playback && !isDaHua"
            >返回</span>
            <iframe
              :src="iframeSrc"
              height="100%"
              width="100%"
              id="player17"
              allowfullscreen
              v-if="!isDaHua"
            ></iframe>
            <div id="player17" v-else style="height: 100%"></div>
          </div>
          <!-- 根据不同的数值循环出显示video -->
          <div
            class="area-list"
            v-for="item in oldVideoNum"
            :key="item"
            v-show="videoNum != 1"
            draggable="true"
            @dragstart="videoDragStart"
            @dragend="videoDropEnd"
          >
            <!-- 第一行显示内容 -->
            <div class="list-top">
              <i class="circle"></i>
              <p :title="this">请选择视频</p>
              <!-- <span></span> -->
              <i class="maximize" @click="maximize"></i>
              <div class="cut" @click="clickDefinition" style="display:none">高清</div>
            </div>
            <!-- video标签 -->
            <div
              class="list-bottom"
              @dragenter="dragenter"
              @dragleave="dragleave"
              @dragover="dragover"
              @drop="drop"
            >
              <i
                class="el-icon-circle-close"
                @click="clearOneVideo('player' + item, $event)"
                style="display:none"
              ></i>
              <video
                :id="'player' + item"
                playsinline
                webkit-playsinline
                autoplay
                width="100%"
                height="100%"
                controls
              >
                <source src type />
                <source src type="application/x-mpegURL" />
              </video>
              <!-- <p>请将视频拖拽至此</p> -->
            </div>
          </div>
        </div>
        <!-- 对讲机模块，视频云端控制的方向盘 -->
        <div class="talkback">
          <p @click="clickCut = clickCut== 1 ? 0 : 1">语音对讲</p>
          <div class="button" v-if="clickCut== 1">
            <div @click="fn_callout">
              <i class="microphone"></i>
              <p>{{call?'点击对讲':'点击挂断'}}</p>
            </div>
            <i
              class="el-icon-download"
              @click="downloadDialog=true,pageNum=1,searchName='',searchs='',downloadTime='',allDownlodList=[],getDownloadVideo()"
            ></i>
          </div>
          <div class="list-header" v-if="clickCut== 1">
            <!-- <el-checkbox
              class="parent-checkbox"
              :indeterminate="isIndeterminate"
              v-model="checkAll"
              @change="handleCheckAllChange"
            ></el-checkbox>-->
            <!-- 最大化，根据项目来显示对讲机 -->
            <p
              v-if="videoNum == 1 || isPid"
            >对讲列表({{onlyInterphoneList?onlyInterphoneList.length:0}})</p>
            <!-- 普通显示 -->
            <p v-else>对讲列表({{interphoneList?interphoneList.length:0}})</p>
          </div>
          <!-- 最大化，根据项目来显示对讲机 -->
          <ul v-if="(videoNum == 1 || isPid) && clickCut== 1" style="maxHeight:6.05rem">
            <el-checkbox-group v-model="checked" @change="handleCheckedChange">
              <li v-for="item in onlyInterphoneList" :key="item.id" v-show="item.pid == pid">
                <el-checkbox class="child-checkbox" :label="item.atAccount">
                  <p :title="item.atName">{{item.atName}}</p>
                </el-checkbox>
                <!-- <i class="wi-fi" :class="item.on ? 'online' : ''"></i> -->
                <i class="wi-fi online"></i>
              </li>
            </el-checkbox-group>
          </ul>
          <!-- 普通显示 -->
          <ul v-else-if="clickCut== 1">
            <el-checkbox-group v-model="checked" @change="handleCheckedChange">
              <li v-for="item in interphoneList" :key="item.id">
                <el-checkbox class="child-checkbox" :label="item.atAccount">
                  <p :title="item.atName">{{item.atName}}</p>
                </el-checkbox>
                <!-- <i class="wi-fi" :class="item.on ? 'online' : ''"></i> -->
                <i class="wi-fi online"></i>
              </li>
            </el-checkbox-group>
          </ul>
          <!-- 云端控制的方向盘 -->
          <!-- <div class="steering-wrap" v-if="videoNum == 1">
            <div class="top-left" @click="videoMove(0)">
              <i class="el-icon-caret-top"></i>
            </div>
            <div class="top-right" @click="videoMove(3)">
              <i class="el-icon-caret-right"></i>
            </div>
            <div class="buttom-left" @click="videoMove(2)">
              <i class="el-icon-caret-left"></i>
            </div>
            <div class="buttom-right" @click="videoMove(1)">
              <i class="el-icon-caret-bottom"></i>
            </div>
            <div class="center">
              <div @click="videoMove(8)">
                <i class="el-icon-plus"></i>
              </div>
              <div @click="videoMove(9)">
                <i class="el-icon-minus"></i>
              </div>
            </div>
          </div>-->
          <p v-if="videoNum == 1 || isPid" @click="clickCut = clickCut == 2 ? 0 : 2">项目信息</p>
          <div class="introduce" v-if="(videoNum == 1 || isPid) && clickCut == 2">
            <span>项目名称：</span>
            <p>{{introduce('projectName')?introduce('projectName'):''}}</p>
            <span>项目介绍：</span>
            <p>{{introduce('remark')?introduce('remark'):''}}</p>
            <span>{{introduce('djorzcbType')?introduce('djorzcbType')+'：':''}}</span>
            <p>{{introduce('djorzcb')?introduce('djorzcb'):''}}</p>
            <span>所属部门：</span>
            <p>{{introduce('projectDept')?introduce('projectDept'):''}}</p>
            <span>项目经理：</span>
            <p>{{introduce('projectPrincipal')?introduce('projectPrincipal'):''}}</p>
            <span>联系电话：</span>
            <p>{{introduce('phone')?introduce('phone'):''}}</p>
            <div
              v-for="(item, index) in introduce('cList')"
              :key="index"
              v-show="introduce('cList').length>0"
              :title="item.constructionName"
            >
              <span>{{item.constructionType}}:</span>
              <p>{{item.constructionName}}</p>
              <span>{{item.contacts}}:</span>
              <p>{{item.mobilePhone}}</p>
            </div>
          </div>
          <p v-if="videoNum == 1" @click="clickCut = clickCut == 3 ? 0 : 3">预置点</p>
          <ul v-if="videoNum == 1 && clickCut == 3 && selectPreset.length>0" class="presetPoint">
            <li
              v-for="item in selectPreset"
              :key="item.id"
              @click="callPreset(item.presetIndex, item.videoSn)"
            >
              <span class="name">{{item.presetName}}</span>
              <span class="delete" @click="clearPreset(item.presetIndex, item.videoSn)">删除</span>
            </li>
          </ul>
          <span
            v-if="videoNum == 1 && clickCut == 3"
            class="insertPreset"
            @click="insertPreset"
          >添加预置点</span>
        </div>
      </div>
      <div class="video-bottom">
        <div
          class="video-4"
          :class="videoNum == 4 ? 'video-image-active' : ''"
          @click="videoNumClick(4)"
        ></div>
        <div
          class="video-9"
          :class="videoNum == 9 ? 'video-image-active' : ''"
          @click="videoNumClick(9)"
        ></div>
        <div
          class="video-16"
          :class="videoNum == 16 ? 'video-image-active' : ''"
          @click="videoNumClick(16)"
        ></div>
        <!-- <div class="all-video-player" @click="allVideoPlay('null')"></div> -->
        <div class="video-playe-wheel" @click="wheel=!wheel" v-if="videoNum == 1&&!playback">
          <!-- 云端控制的方向盘 -->
          <div class="steering-wrap" v-if="wheel">
            <div class="top-left" @click="videoMove(0, $event)">
              <i class="el-icon-caret-top"></i>
            </div>
            <div class="top-right" @click="videoMove(3, $event)">
              <i class="el-icon-caret-right"></i>
            </div>
            <div class="buttom-left" @click="videoMove(2, $event)">
              <i class="el-icon-caret-left"></i>
            </div>
            <div class="buttom-right" @click="videoMove(1, $event)">
              <i class="el-icon-caret-bottom"></i>
            </div>
            <div class="center">
              <div @click="videoMove(8, $event)">
                <i class="el-icon-plus"></i>
              </div>
              <div @click="videoMove(9, $event)">
                <i class="el-icon-minus"></i>
              </div>
            </div>
          </div>
        </div>
        <!-- <p @click="openVideoHistory">点击跳转录音页面</p> -->
      </div>
    </box>
    <video width="300" height="300" id="id_video_my_v" autoplay muted style="display:none"></video>
    <video width="300" height="300" id="id_video_peer_v" autoplay style="display:none"></video>
    <!-- 地图弹窗 -->
    <el-dialog :title="dialogProjectName" :visible.sync="mapDialog" width="50%" center>
      <el-dropdown @command="handleCommand" class="addPlace" v-if="this.addPlaceList.length">
        <span class="el-dropdown-link">添加位置</span>
        <el-dropdown-menu slot="dropdown" class="dropdown">
          <el-dropdown-item
            v-for="item in this.addPlaceList"
            :command="item.videoSn"
            :key="item.videoSn"
            style="color:#3975fe;font-size:.14rem;"
          >{{item.videoName}}</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <div id="mapId" style="width:100%;height:5rem"></div>
    </el-dialog>
    <!-- 修改确认摄像头位置 -->
    <el-dialog width="30%" title="确认修改" :visible.sync="affirmMark">
      <p>确定修改该摄像头的位置吗？</p>
      <div slot="footer" class="dialog-footer">
        <div @click="affirmMark = false,editMark()">确定</div>
        <div @click="affirmMark = false,getMap()">取 消</div>
      </div>
    </el-dialog>
    <!-- 添加摄像头位置 -->
    <el-dialog width="30%" title="确认位置" :visible.sync="addMark">
      <p>确定该摄像头的位置吗？</p>
      <div slot="footer" class="dialog-footer">
        <div @click="addMark = false,editMark('add')">确定</div>
        <div @click="addMark = false,videoList.length==addPlaceList.length?getNoMap():getMap()">取 消</div>
      </div>
    </el-dialog>
    <!-- 下载语音对讲 -->
    <el-dialog
      :title="'下载语音对讲'"
      :visible.sync="downloadDialog"
      width="50%"
      center
      class="dialog-download-wrap"
    >
      <div class="dialog-download">
        <div class="header">
          <p>选择人员:</p>
          <el-input type="text" placeholder="请输入人员名称" v-model="searchs"></el-input>
          <p>选择时间:</p>
          <el-date-picker
            class="download-time"
            v-model="downloadTime"
            type="daterange"
            range-separator="至"
            value-format="yyyy-MM-dd"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          ></el-date-picker>
          <div class="button" @click="pageNum=1,allDownlodList=[],searchVideo()">搜索</div>
        </div>
        <el-table
          ref="table"
          :data="tableData"
          tooltip-effect="dark"
          style="width: 90%"
          :header-row-style="headerRow"
          :header-cell-style="headerStyle"
          :row-style="rowStyle"
          :cell-style="cellStyle"
          @row-click="rowClick"
          @selection-change="handleSelectionChange"
          v-loading="tableLoading"
          element-loading-background="#02042299"
        >
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column label="序号" width="120">
            <template slot-scope="scope">{{scope.$index + 1 + (pageNum - 1) * 7}}</template>
          </el-table-column>
          <el-table-column prop="atAccount" label="对讲机账号"></el-table-column>
          <el-table-column prop="atName" label="对讲机名称"></el-table-column>
        </el-table>
        <div class="botton" @click="downloadVideoList">下载</div>
        <el-pagination
          @current-change="handleCurrentChange"
          :current-page.sync="pageNum"
          :page-size="7"
          layout="total, prev, pager, next"
          :total="total"
        ></el-pagination>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import mixin from "@/utils/mixin";
import box from "@/base/box";
export default {
  mixins: [mixin],
  data() {
    return {
      listWrap: [{ areaName: "无数据" }], // 视频列表
      lifeName: null, // 点击区域列表选项
      liId: null, // 点击的视频列表项
      videoNum: 4, // 点击的显示数量
      oldVideoNum: 4, // 点击的显示数量(旧，用来对比)
      interphoneList: new Array(), // 对讲机列表
      isIndeterminate: true, // 全选
      checkAll: false, // 全选的样式
      checked: new Array(), // 选中项
      urlList: new Array(), // 选择的视频数据
      cid: "", // 公司id
      sn: 0, // 设备序列号
      pid: 0, // 项目ID
      player1: "",
      player2: "",
      player3: "",
      player4: "",
      player5: "",
      player6: "",
      player7: "",
      player8: "",
      player10: "",
      player11: "",
      player12: "",
      player13: "",
      player14: "",
      player15: "",
      player16: "",
      player17: "",
      call: true, // 是否在通话
      accountId: null, // 账号
      accountPassWord: null, // 密码
      callList: new Array(), // 呼叫的列表
      interval: null, //循环
      onlyInterphoneList: new Array(), // 根据项目显示不同的对讲机
      wheel: false, // 方向盘的显示
      clickCut: 1, // 点击切换右侧的显示项(对讲机1、项目信息2)
      camera: {}, // 用于显示播放项目下全部摄像头的样式
      isPid: false, // 是否点击播放项目下的全部摄像头
      selectPreset: new Array(), //预制点列表
      iframeSrc: "", // iframe链接
      token: "", // 萤石云token
      sns: 0, // 如果不可云端控制，增加一个字段用于调用iframe的url
      cutDefinition: true, // 切换清晰度，true是高清
      playback: false, // 回放
      beginTime: "", //回放开始时间
      endTime: "", // 回放结束时间
      nowTime: "", // 现在的时间
      videoDrop: false, // 视频拖拽，切换video
      videoDropOldEvent: "", // 拖动之前的event
      imgLoading: false, // 截图加载动画
      imgList: new Array(), // 截图列表
      mapDialog: false, // 地图弹窗
      affirmMark: false, // 确认修改的地图位置
      map: false, //地图
      videoList: [], //地图点坐标文字
      dialogProjectName: "", // 弹窗的名字
      downloadDialog: false, // 下载弹窗
      infoWindow: "", // 地图弹窗信息
      draggingLng: 0, // 拖拽经度
      draggingLat: 0, // 拖拽纬度
      editMarkSn: 0, // 修改位置的摄像头sn
      addMarkSn: 0, // 添加位置的摄像头sn
      noPic: require("../../../static/images/noPic.png"), // 默认加载图片
      addPlaceList: new Array(), // 可添加位置信息的摄像头列表
      clickListener: "", // 新增位置点击绑定事件
      addMark: false, // 添加位置弹窗
      downloadTime: "", // 下载的时间段
      searchName: "", // 搜索的名称
      tableData: [],
      pageDownloadList: [], // 单页选择的数据
      allDownlodList: [], // 全部选中的数据
      pageNum: 1, // 下载弹窗的页码数
      oldPageNum: 1, //旧的页码
      total: 0, //下载的条目数
      tableLoading: false, // 下载表格的loading
      searchs: "", // 搜索绑定的字段
      isDaHua: false // 最大化的视频是否是大华的视频流
    };
  },
  computed: {},
  created() {},
  mounted() {
    this.getVideo();
    this.talkback();
    this.getImgList();
    setTimeout(() => {
      document.getElementById('onlyArea').click()
    }, 500)
  },
  methods: {
    // 获取视频列表
    getVideo(get = true) {
      this.pid = sessionStorage.getItem("pid");
      this.$axios
        .post(`/api/ProjectVideoAreaApi/getVideoProject?pid=${this.pid}`)
        .then(res => {
          this.listWrap = [{}];
          this.listWrap[0].areaName = res.data.projectName;
          this.listWrap[0].projectList = [];
          this.listWrap[0].projectList.push(res.data);
          if (get == true) {
            this.openLife(res.data.projectName);
            this.openVideo(res.data.pid);
          }
        });
    },

    // 获取对讲机列表
    talkback() {
      this.$axios
        .post(`/api/sbGroupTalkback/getAccountList?cpid=${this.pid}&isIdType=2`)
        .then(res => {
          if (res.data.length == 1) {
            this.interphoneList = res.data[0].atList;
            this.accountId = res.data[0].gtAccount;
            this.accountPassWord = res.data[0].gtPassword;
            window.fn_Start(this.accountId, this.accountPassWord);
          }
        });
    },

    // 获取截图列表
    getImgList() {
      this.pid = sessionStorage.getItem("pid");
      this.imgLoading = true;
      this.$axios
        .post(`/api/ProjectVideoAreaApi/getProjectVideoImgUrl?pid=${this.pid}`)
        .then(res => {
          this.imgList = res.data;
          this.imgLoading = false;
        });
    },

    // 获取下载对讲机列表
    getDownloadVideo() {
      this.tableLoading = true;
      this.$axios
        .post(
          `/api/sbAccountTalkback/getAccountListPage?isIdType=2&cpid=${this.cid}&atName=${this.searchName}&pageSize=7&pageNum=${this.pageNum}`
        )
        .then(res => {
          if (res.data.code == 0) {
            this.tableLoading = false;
            this.tableData = res.data.data.rows;
            this.total = res.data.data.total;
            setTimeout(() => {
              this.toggleSelection(this.allDownlodList);
            }, 500);
          }
        });
    },

    // 获取每个项目的第一个摄像头视频流
    getEveryProjectFirstVideo(list) {
      let projectList = list.map(a =>
        a.projectList.map(b => {
          for (let i = 0; i < b.videoList.length; i++) {
            const element = b.videoList[i];
            element.pid = b.pid;
          }
          return b.videoList;
        })
      );
      let urlList = projectList.map(a => a.map(b => b[0]));
      let urlLists = new Array();
      for (let i = 0; i < urlList.length; i++) {
        const element = urlList[i];
        urlLists = urlLists.concat(element);
      }
      this.allVideoPlay(urlLists);
    },

    // 点击视频列表
    openVideo(id) {
      if (this.liId != id) {
        this.liId = id;
      } else {
        this.liId = null;
      }
    },

    // 点击区域列表
    openLife(name) {
      if (this.lifeName != name) {
        this.lifeName = name;
        this.liId = null;
      } else {
        this.lifeName = null;
      }
    },

    // 拖拽元素在目标元素上移动的时候触发的事件
    dragover(e) {
      e.preventDefault();
      e.dataTransfer.dropEffect = "move";
    },

    // 进入视频区域内
    dragenter(e) {
      if (!e.target.getElementsByTagName("p")[0]) {
        return;
      }
      e.target.getElementsByTagName("p")[0].style.display = "none";
      e.target.style.borderColor = "#909399";
      e.target.style.background = "#909399";
    },

    // video开始拖拽
    videoDragStart(e) {
      this.videoDrop = true;
      this.videoDropOldEvent = e;
    },

    // video结束拖拽
    videoDropEnd() {
      this.videoDrop = false;
      this.videoDropOldEvent = "";
    },

    // 拖拽离开区域时
    dragleave(e) {
      if (!e.target.getElementsByTagName("p")[0]) {
        return;
      }
      e.target.getElementsByTagName("p")[0].style.display = "inline-block";
      e.target.style.borderColor = "";
      e.target.style.background = "";
    },

    // 拖拽结束（对于video标签）
    drop(e) {
      if (!this.videoDrop) {
        setTimeout(() => {
          if (this.getVideoSrc(this.urlList[this.urlList.length - 1].url)) {
            this.isPid = false;
            this.clickCut = 1;
            setTimeout(() => {
              if (e.target.nodeName !== "VIDEO") {
                // header显示的文字和样式
                e.target.parentNode.childNodes[0].childNodes[1].innerHTML = this.urlList[
                  this.urlList.length - 1
                ].videoName;
                // e.target.parentNode.childNodes[0].childNodes[2].style.background =
                //   "green";
                // 显示video标签
                e.target.childNodes[
                  e.target.childNodes.length - 2
                ].style.display = "block";
                // video标签的src
                e.target.childNodes[
                  e.target.childNodes.length - 2
                ].childNodes[0].src = this.urlList[this.urlList.length - 1].url;
                e.target.childNodes[
                  e.target.childNodes.length - 2
                ].childNodes[1].src = this.urlList[this.urlList.length - 1].url;
                // 显示关闭按钮
                e.target.getElementsByClassName(
                  "el-icon-circle-close"
                )[0].style.display = "block";
                // 挂载video到变量上
                this[
                  `${e.target.childNodes[e.target.childNodes.length - 2].id}`
                ] = new EZUIPlayer(
                  `${e.target.childNodes[e.target.childNodes.length - 2].id}`
                );
              } else {
                // 第二次拖拽
                // 先将video标签删除
                let id = e.target.id;
                let div = e.target.parentNode;
                let rm = document.getElementById(id);
                // 动态创建video标签，添加到相应的div
                let video = this.createVideo(id);
                div.replaceChild(video, rm);
                // 将对应的视频流、文字渲染上去
                let rm2 = document.getElementById(id);
                div.parentNode.getElementsByTagName(
                  "p"
                )[0].innerHTML = this.urlList[
                  this.urlList.length - 1
                ].videoName;
                div.parentNode.title = this.urlList[
                  this.urlList.length - 1
                ].videoName;
                rm2.childNodes[0].src = this.urlList[this.urlList.length - 1]
                  .hdUrl
                  ? this.urlList[this.urlList.length - 1].hdUrl
                  : this.urlList[this.urlList.length - 1].url;
                rm2.childNodes[1].src = this.urlList[this.urlList.length - 1]
                  .hdUrl
                  ? this.urlList[this.urlList.length - 1].hdUrl
                  : this.urlList[this.urlList.length - 1].url;
                // 显示关闭按钮
                div.getElementsByClassName(
                  "el-icon-circle-close"
                )[0].style.display = "block";
                // 显示高清标清按钮
                div.parentNode.getElementsByClassName("cut")[0].style.display =
                  "block";
                div.parentNode.getElementsByClassName("cut")[0].innerHTML = this
                  .urlList[this.urlList.length - 1].hdUrl
                  ? "高清"
                  : "标清";
                // 绿点点
                // div.parentNode.getElementsByTagName(
                //   "span"
                // )[0].style.background = "green";
                // 隐藏掉文字
                // div.getElementsByTagName("p")[0].style.display = "none"
                this[`${id}`] = new EZUIPlayer(`${id}`);
              }
            }, 20);
          } else {
            this.messageBox("该视频已经播放了哦！", 0);
          }
        }, 20);
      } else {
        this.moveVideo(e);
      }
    },

    // 拖拽移动video标签
    moveVideo(e) {
      // 获取到相关的id，并停止
      let before = this.videoDropOldEvent.target;
      let beforeVideo = before.getElementsByTagName("video")[0];
      let now = e.target.parentNode.parentNode;
      let nowVideo = now.getElementsByTagName("video")[0];

      let oldUrl = beforeVideo.getElementsByTagName("source")[0].src;
      let url = nowVideo.getElementsByTagName("source")[0].src;
      // 判断是否是相同的视频
      if (oldUrl !== url) {
        if (typeof this[`${beforeVideo.id}`] === "object")
          this[`${beforeVideo.id}`].stop();
        if (typeof this[`${nowVideo.id}`] === "object")
          this[`${nowVideo.id}`].stop();
        // 切换高清按钮
        let oldDisplay = before.getElementsByClassName("cut")[0].style.display;
        let diaplay = now.getElementsByClassName("cut")[0].style.display;
        before.getElementsByClassName("cut")[0].style.display = diaplay;
        now.getElementsByClassName("cut")[0].style.display = oldDisplay;
        // 切换高清文字
        let oldText = before.getElementsByClassName("cut")[0].innerHTML;
        let text = now.getElementsByClassName("cut")[0].innerHTML;
        before.getElementsByClassName("cut")[0].innerHTML = text;
        now.getElementsByClassName("cut")[0].innerHTML = oldText;
        // 切换文字
        let oldP = before.getElementsByTagName("p")[0].innerHTML;
        let p = now.getElementsByTagName("p")[0].innerHTML;
        before.getElementsByTagName("p")[0].innerHTML = p;
        now.getElementsByTagName("p")[0].innerHTML = oldP;
        // 切换绿点点
        // let oldDot = before.getElementsByTagName("span")[0].style.background;
        // let dot = now.getElementsByTagName("span")[0].style.background;
        // before.getElementsByTagName("span")[0].style.background = dot;
        // now.getElementsByTagName("span")[0].style.background = oldDot;
        // 切换title
        let oldTitle = before.title;
        let title = now.title;
        before.title = title;
        now.title = oldTitle;
        // 切换叉叉样式
        let oldFork = before.getElementsByClassName("el-icon-circle-close")[0]
          .style.display;
        let fork = now.getElementsByClassName("el-icon-circle-close")[0].style
          .display;
        before.getElementsByClassName(
          "el-icon-circle-close"
        )[0].style.display = fork;
        now.getElementsByClassName(
          "el-icon-circle-close"
        )[0].style.display = oldFork;
        // 删除video，之后重新添加
        // let oldUrl = beforeVideo.getElementsByTagName('source')[0].src
        // let url = nowVideo.getElementsByTagName('source')[0].src
        let oldVideo = this.createVideo(beforeVideo.id);
        oldVideo.getElementsByTagName("source")[0].src = url;
        oldVideo.getElementsByTagName("source")[1].src = url;
        let video = this.createVideo(nowVideo.id);
        video.getElementsByTagName("source")[0].src = oldUrl;
        video.getElementsByTagName("source")[1].src = oldUrl;
        before
          .getElementsByClassName("list-bottom")[0]
          .replaceChild(oldVideo, beforeVideo);
        now
          .getElementsByClassName("list-bottom")[0]
          .replaceChild(video, nowVideo);
        // 挂载
        this[`${beforeVideo.id}`] = new EZUIPlayer(`${beforeVideo.id}`);
        this[`${nowVideo.id}`] = new EZUIPlayer(`${nowVideo.id}`);
      }
    },

    // 获取所有video标签的src
    getVideoSrc(url) {
      let urlList = new Array();
      for (let i = 0; i < 16; i++) {
        let player = document.getElementById(`player${i + 1}`);
        if (player) {
          let src = player.getElementsByTagName("source")[0].src;
          urlList.push(src);
          switch (src.includes(".hd.m3u8")) {
            case true:
              urlList.push(src.replace(/.hd/g, ""));
              break;
            default:
              urlList.push(src.replace(/.m3u8'/g, ".hd.m3u8"));
              break;
          }
        }
      }
      return !urlList.includes(url);
    },

    // 动态创建video标签
    createVideo(id) {
      let video = document.createElement("video");
      video.id = id;
      video.style.width = "100%";
      video.style.height = "100%";
      video.playsinline = true;
      video.autoplay = true;
      video.webkitPlaysinline = true;
      video.controls = true;
      let source1 = document.createElement("source");
      let source2 = document.createElement("source");
      source2.type = "application/x-mpegURL";
      video.appendChild(source1);
      video.appendChild(source2);
      return video;
    },

    // 拖拽结束（对于视频列表来说）
    dragend(parentId, childId) {
      for (let i = 0; i < this.listWrap.length; i++) {
        // 循环分类
        for (let j = 0; j < this.listWrap[i].projectList.length; j++) {
          let item = this.listWrap[i].projectList[j];
          if (item.pid == parentId && item.videoList.length) {
            // 找到对应项目的视频列表
            for (let k = 0; k < item.videoList.length; k++) {
              if (item.videoList[k].videoSn == childId) {
                // 根据sn定位具体的摄像头
                if (!item.videoList[k].pid) item.videoList[k].pid = parentId;
                this.urlList.push(item.videoList[k]);
              }
            }
          }
        }
      }
    },

    // 点击视频列表中的视频
    videoListClick() {
      this.$message({
        message: "请将视频拖放至播放区域"
      });
    },

    // 全选
    handleCheckAllChange(val) {
      let temp = new Array();
      for (let i = 0; i < this.interphoneList.length; i++) {
        temp.push(this.interphoneList[i].atName);
      }
      this.checked = val ? temp : new Array();
      this.isIndeterminate = false;
    },

    // 选择
    handleCheckedChange(val) {
      let temp = new Array();
      for (let i = 0; i < this.interphoneList.length; i++) {
        temp.push(this.interphoneList[i].id);
      }
      this.checkAll = val.length === temp.length;
      this.isIndeterminate = val.length > 0 && val.length < temp;
      this.callList = val;
    },

    // 停止所有video调用
    clearVideo() {
      if (typeof this.player1 === "object") this.player1.stop();
      if (typeof this.player2 === "object") this.player2.stop();
      if (typeof this.player3 === "object") this.player3.stop();
      if (typeof this.player4 === "object") this.player4.stop();
      if (typeof this.player5 === "object") this.player5.stop();
      if (typeof this.player6 === "object") this.player6.stop();
      if (typeof this.player7 === "object") this.player7.stop();
      if (typeof this.player8 === "object") this.player8.stop();
      if (typeof this.player9 === "object") this.player9.stop();
      if (typeof this.player10 === "object") this.player10.stop();
      if (typeof this.player11 === "object") this.player11.stop();
      if (typeof this.player12 === "object") this.player12.stop();
      if (typeof this.player13 === "object") this.player13.stop();
      if (typeof this.player14 === "object") this.player14.stop();
      if (typeof this.player15 === "object") this.player15.stop();
      if (typeof this.player16 === "object") this.player16.stop();
    },

    // 最大化
    maximize(e) {
      let daHuaUrl;
      let name = e.target.parentNode.childNodes[1].innerHTML;
      if (name === "请选择视频") {
        this.$message({
          type: "warning",
          message: "请选择视频"
        });
        return;
      }
      this.videoNum = 1;
      this.$nextTick(() => {
        let div = document.getElementsByClassName("video-only")[0];
        div.getElementsByClassName("center")[0].innerHTML = name;
        // 判断当前摄像头是否可云端控制，可以的话保存sn
        for (let i = 0; i < this.urlList.length; i++) {
          if (this.urlList[i].videoName == name) {
            this.pid = this.urlList[i].pid;
            if (this.urlList[i].isControl == 1) {
              this.sn = this.urlList[i].videoSn;
            } else {
              this.sns = this.urlList[i].videoSn;
            }
            if (this.urlList[i].factory == "DAH") {
              this.isDaHua = true;
            } else {
              this.isDaHua = false;
            }
          }
        }
        // 获取token
        this.listWrap.forEach(area => {
          area.projectList.forEach(project => {
            project.videoList.forEach(videoList => {
              switch (videoList.videoSn) {
                case this.sn:
                case this.sns:
                  this.token = project.token;
                  daHuaUrl = videoList.hdUrl;
                  break;
              }
            });
          });
        });
        if (!this.isDaHua) {
          this.getIframeSrc();
        } else {
          let video = this.createVideo("bigVideo");
          video.childNodes[0].src = daHuaUrl;
          video.childNodes[1].src = daHuaUrl;
          let that = this;
          setTimeout(() => {
            document.getElementById("player17").appendChild(video);
            that.player17 = new EZUIPlayer("bigVideo");
          }, 500);
        }
        this.getOnlyInterphoneList();
        this.clickCut = 2;
        this.getSelectPreset();
        this.getTime();
      });
    },

    //查询监控预置点
    getSelectPreset() {
      this.$axios
        .post(`/api/ProjectVideoPresetApi/selectPreset?videoSn=${this.sn}`)
        .then(res => {
          if (res.data.code == 0) {
            this.selectPreset = res.data.data;
          }
        });
    },

    // 退出全屏
    back() {
      if (typeof this.player17 === "object") this.player17.stop();
      this.player17 = "";
      let div = document.getElementById("player17");
      if (document.getElementById("bigVideo")) {
        let rm = document.getElementById("bigVideo");
        div.removeChild(rm);
      }
      this.videoNum = this.oldVideoNum;
      this.sn = 0;
      // this.pid = 0;
      this.clickCut = 1;
      this.cutDefinition = true;
      this.isDaHua = false;
    },

    // 云端控制摄像头
    videoMove(direction, e) {
      e.stopPropagation();
      if (this.sn == 0) {
        this.$message({
          type: "warning",
          message: "该摄像头不支持云端控制"
        });
      } else {
        this.$axios.post(
          `/api/ProjectVideo/ysCloudControldirection?pid=${this.pid}&deviceSerial=${this.sn}&direction=${direction}`
        );
      }
    },

    // 返回
    backTo() {
      this.$router.go(-1);
    },

    // 刷新
    reload() {
      location.reload();
    },

    // 获取所有的视频流，和需要显示的数据
    getAllVideo() {
      let urlList = new Array();
      for (let j = 0; j < this.listWrap.length; j++) {
        let projectList = this.listWrap[j].projectList;
        for (let k = 0; k < projectList.length; k++) {
          let videoList = projectList[k].videoList;
          for (let i = 0; i < videoList.length; i++) {
            videoList[i].pid = projectList[k].pid;
            urlList.push(videoList[i]);
          }
        }
      }
      return urlList;
    },

    // 点击播放全部视频
    allVideoPlay(list) {
      this.clearVideo();
      this.oldVideoNum = 16;
      this.videoNum = 16;
      this.cutDefinition = true;
      this.playback = false;
      if (list == "null") {
        this.clickCut = 1;
        this.isPid = false;
      }
      this.$nextTick(() => {
        let parent = document.getElementsByClassName("area-list");
        let urlList = list != "null" ? list : this.getAllVideo();
        // 替换掉现有video的数据
        for (
          let i = 0;
          i < (parent.length < urlList.length ? parent.length : urlList.length);
          i++
        ) {
          if (urlList[i] != undefined) {
            // 添加title
            parent[i].title = urlList[i].videoName;
            // 修改第一行显示内容
            let top = parent[i].getElementsByClassName("list-top")[0];
            top.getElementsByTagName("p")[0].innerHTML = urlList[i].videoName;
            // top.getElementsByTagName("span")[0].style.background = "green";
            top.getElementsByClassName("cut")[0].style.display = "block";
            top.getElementsByClassName("cut")[0].innerHTML = urlList[i].hdUrl
              ? "高清"
              : "标清";
            // 修改video标签的显示内容
            let bottom = parent[i].getElementsByClassName("list-bottom")[0];
            // bottom.getElementsByTagName("p")[0].style.display = "none";
            bottom.getElementsByClassName(
              "el-icon-circle-close"
            )[0].style.display = "block";
            let video = bottom.getElementsByTagName("video")[0];
            let newVideo = this.createVideo(`player${i + 1}`);
            newVideo.getElementsByTagName("source")[0].src = urlList[i].hdUrl
              ? urlList[i].hdUrl
              : urlList[i].url;
            newVideo.getElementsByTagName("source")[1].src = urlList[i].hdUrl
              ? urlList[i].hdUrl
              : urlList[i].url;
            this.urlList.push(urlList[i]);
            bottom.replaceChild(newVideo, video);
            this[`player${i + 1}`] = new EZUIPlayer(`player${i + 1}`);
          }
        }
        // 清除掉其他多余的video
        if (urlList.length < 16) {
          for (let i = urlList.length + 1; i < 17; i++) {
            let video = document.getElementById(`player${i}`);
            let id = video.parentNode;
            let brother = id.parentNode.getElementsByClassName("list-top")[0];
            // 删除title
            brother.parentNode.title = "";
            id.getElementsByTagName("i")[0].style.display = "none";
            // id.getElementsByTagName('p')[0].style.display = 'block'
            // id.getElementsByTagName('p')[0].innerHTML= '请将视频拖拽至此'
            brother.getElementsByTagName("p")[0].innerHTML = "请选择视频";
            // brother.getElementsByTagName("span")[0].style.background =
            // "#6b6b6b";
            brother.getElementsByClassName("cut")[0].style.display = "none";
            brother.getElementsByClassName("cut")[0].innerHTML = "高清";
            let newVideo = this.createVideo(`player${i}`);
            id.replaceChild(newVideo, video);
          }
        }
      });
    },

    // 点击videoNum
    videoNumClick(num) {
      // if (typeof this.player17 === "object") {
      //   this.player17.stop();
      //   this.player17 = ''
      //   let div = document.getElementsByClassName("video-only")[0];
      //   let rm = document.getElementById("player17");
      //   div.removeChild(rm);
      // }
      this.videoNum = num;
      this.cutDefinition = true;
      this.playback = false;
      // for (let i = 0; i < num; i++) {
      //   let doc = document.getElementById(`player${i+1}`)
      //   if (doc != null) {
      //     doc.width = "100%"
      //     doc.height = "100%"
      //   }
      // }
    },

    // 操作对讲机
    fn_callout() {
      sessionStorage.removeItem("message");
      if (this.callList.length == 0) {
        this.$message({
          type: "warning",
          message: "请选择呼叫的对讲机"
        });
        return;
      } else if (
        this.callList.length > 1 &&
        this.callList[0] != this.callList[1]
      ) {
        this.$message({
          type: "warning",
          message: "只能选择单个对讲机"
        });
        return;
      }
      if (this.call) {
        window.fn_callout(this.callList[0]);
        this.call = false;
        let time = 0;
        this.interval = setInterval(() => {
          let message = sessionStorage.getItem("message");
          time++;
          if (message != null) {
            this.call = true;
            this.$message({
              type: "warning",
              message: message
            });
            sessionStorage.removeItem("message");
            clearInterval(this.interval);
          }
          this.$log(time);
        }, 100);
      } else {
        this.call = true;
        clearInterval(this.interval);
        window.fn_rel();
      }
    },

    // 关闭video标签
    clearOneVideo(id, e) {
      if (typeof this[id] === "object") this[id].stop();
      let videoWrap = e.target.parentNode;
      let header = videoWrap.parentNode.firstChild;
      // 删除title
      videoWrap.parentNode.title = "";
      // header 恢复样式
      header.childNodes[1].innerHTML = "请选择视频";
      // header.childNodes[2].style.background = "#6b6b6b";
      header.getElementsByClassName("cut")[0].style.display = "none";
      header.getElementsByClassName("cut")[0].innerHTML = "高清";
      // videoWrap.style.background = "#6b6b6b";
      // 显示文字
      // videoWrap.childNodes[videoWrap.childNodes.length-1].style.display = 'block'
      // 隐藏关闭按钮
      videoWrap.getElementsByClassName(
        "el-icon-circle-close"
      )[0].style.display = "none";
      // 创建video并替换掉当前的video
      let video = this.createVideo(id);
      videoWrap.replaceChild(
        video,
        videoWrap.childNodes[videoWrap.childNodes.length - 1]
      );
    },

    // 计算不同项目的对讲机
    getOnlyInterphoneList() {
      this.onlyInterphoneList = new Array();
      this.onlyInterphoneList = this.interphoneList.filter(
        item => item.pid == this.pid
      );
    },

    // 显示项目数据
    introduce(data) {
      let list = new Array();
      for (let i = 0; i < this.listWrap.length; i++) {
        if (list.length == 0) {
          list = this.listWrap[i].projectList.filter(
            item => item.pid == this.pid
          );
        }
      }
      if (list.length > 0) {
        switch (data) {
          case "projectAddress":
            return list[0].projectAddress;
          case "remark":
            return list[0].remark;
          case "cList":
            return list[0].cList;
          case "projectName":
            return list[0].projectName;
          case "projectDept":
            return list[0].projectDept;
          case "projectPrincipal":
            return list[0].projectPrincipal;
          case "phone":
            return list[0].phone;
          case "djorzcb":
            return list[0].djorzcb;
          case "djorzcbType":
            return list[0].djorzcbType;
        }
        // if (data === "projectAddress") {
        //   return list[0].projectAddress;
        // } else if (data === "remark") {
        //   return list[0].remark;
        // } else if (data === "cList") {
        //   return list[0].cList;
        // } else if (data === "projectName") {
        //   return list[0].projectName;
        // } else if (data === "projectDept") {
        //   return list[0].projectDept;
        // } else if (data === "projectPrincipal") {
        //   return list[0].projectPrincipal;
        // } else if (data === "phone") {
        //   return list[0].phone;
        // }
      }
    },

    // 修改项目点击播放全部摄像头样式
    setCamera(areaName, pid) {
      // if (typeof this.player17 === "object") {
      //   this.player17.stop();
      //   this.player17 = ''
      //   let div = document.getElementsByClassName("video-only")[0];
      //   let rm = document.getElementById("player17");
      //   div.removeChild(rm);
      // }
      // if (this.camera.areaName == areaName && this.camera.pid == pid) {
      //   this.camera = {};
      // } else {
      this.isPid = true;
      this.camera.areaName = areaName;
      this.camera.pid = pid;
      let list = this.listWrap
        .filter(a => a.areaName == areaName)[0]
        .projectList.filter(a => a.pid == pid)[0].videoList;
      for (let i = 0; i < list.length; i++) {
        list[i].pid = pid;
      }
      this.pid = pid;
      this.clickCut = 2;
      this.cutDefinition = true;
      this.allVideoPlay(list);
      this.getOnlyInterphoneList();
      // }
    },

    // 调用预置点
    callPreset(index, sn) {
      this.$axios.post(
        `/api/ProjectVideoPresetApi/callPreset?pid=${this.pid}&deviceSerial=${sn}&index=${index}`
      );
    },

    // 删除预置点
    clearPreset(index, sn) {
      this.$axios
        .post(
          `/api/ProjectVideoPresetApi/clearPreset?pid=${this.pid}&deviceSerial=${sn}&index=${index}`
        )
        .then(res => {
          if (res.data.code == 0) {
            this.$message({
              type: "success",
              message: "删除成功"
            });
            this.getSelectPreset();
          } else {
            this.$message({
              type: "warning",
              message: "删除失败"
            });
          }
        });
    },

    // 添加监控预置点
    insertPreset() {
      if (this.sn == 0) {
        this.$message({
          type: "warning",
          message: "该摄像头不支持云端控制"
        });
      } else if (this.selectPreset.length == 12) {
        this.$message({
          type: "warning",
          message: "预置点添加上线为12"
        });
      } else {
        this.$axios
          .post(
            `/api/ProjectVideoPresetApi/insertPreset?pid=${this.pid}&deviceSerial=${this.sn}`
          )
          .then(res => {
            if (res.data.code == 0) {
              this.$message({
                type: "success",
                message: "添加成功"
              });
              this.getSelectPreset();
            } else {
              this.$message({
                type: "warning",
                message: "添加失败"
              });
            }
          });
      }
    },

    // 拼接iframeSrc
    getIframeSrc(beginTime, endTime) {
      if (this.playback) {
        this.iframeSrc = `https://open.ys7.com/ezopen/h5/iframe?url=ezopen://open.ys7.com/${
          this.sn == 0 ? this.sns : this.sn
        }/1.rec?begin=${beginTime}&end=${endTime}&autoplay=1&accessToken=${
          this.token
        }`;
      } else {
        this.beginTime = "";
        this.endTime = "";
        this.iframeSrc = `https://open.ys7.com/ezopen/h5/iframe?url=ezopen://open.ys7.com/${
          this.sn == 0 ? this.sns : this.sn
        }/1.${this.cutDefinition ? "hd." : ""}live&autoplay=1&accessToken=${
          this.token
        }`;
      }
    },

    // 确定回放时间
    checkedTime() {
      let begin = [...this.beginTime].filter(a => {
        if (a != "-" && a != "T" && a != ":") {
          return a;
        }
      });
      let end = [...this.endTime].filter(a => {
        if (a != "-" && a != "T" && a != ":") {
          return a;
        }
      });
      if (begin.join("") >= end.join("")) {
        this.messageBox("结束时间需小于开始时间！", 0);
        return;
      } else {
        this.playback = true;
        this.getIframeSrc(begin.join("") + "00", end.join("") + "59");
      }
    },

    // 获取当前时间
    getTime() {
      let now = new Date();
      this.nowTime = `${now.getFullYear()}-${
        now.getMonth() + 1 < 10 ? "0" + now.getMonth() + 1 : now.getMonth() + 1
      }-${now.getDate() < 10 ? "0" + now.getDate() : now.getDate()}T${
        now.getHours() < 10 ? "0" + now.getHours() : now.getHours()
      }:${now.getMinutes() < 10 ? "0" + now.getMinutes() : now.getMinutes()}:${
        now.getSeconds() < 10 ? "0" + now.getSeconds() : now.getSeconds()
      }`;
    },

    // 点击切换高清的按钮
    clickDefinition(e) {
      let parent = e.target.parentNode.parentNode;
      let oldVideo = parent.getElementsByTagName("video")[0];
      let url = oldVideo.getElementsByTagName("source")[0].src;
      let temp = true;
      this.listWrap.forEach(area => {
        area.projectList.forEach(project => {
          project.videoList.forEach(item => {
            if (url == item.url && item.hdUrl == "") {
              this.$message({
                type: "warning",
                message: "该摄像头无法切换高清视频"
              });
              temp = false;
            } else if (url == item.hdUrl && item.factory == "DAH") {
              this.$message({
                type: "warning",
                message: "该摄像头无法切换标清视频"
              });
              temp = false;
            }
          });
        });
      });
      if (temp) {
        let text = e.target.innerHTML;
        e.target.innerHTML = text == "高清" ? "标清" : "高清";
        let video;
        if (typeof this[`${oldVideo.id}`] === "object")
          this[`${oldVideo.id}`].stop();
        if (text == "高清") {
          video = this.changeUrl(oldVideo.id, url, true);
        } else {
          video = this.changeUrl(oldVideo.id, url, false);
        }
        parent
          .getElementsByClassName("list-bottom")[0]
          .replaceChild(video, oldVideo);
        this[`${oldVideo.id}`] = new EZUIPlayer(`${oldVideo.id}`);
      }
      // let text = e.target.innerHTML;
      // e.target.innerHTML = text == "高清" ? "标清" : "高清";
      // let video;
      // if (typeof this[`${oldVideo.id}`] === "object")
      //   this[`${oldVideo.id}`].stop();
      // if (text == "高清") {
      //   video = this.changeUrl(oldVideo.id, url, true);
      // } else {
      //   video = this.changeUrl(oldVideo.id, url, false);
      // }
      // parent
      //   .getElementsByClassName("list-bottom")[0]
      //   .replaceChild(video, oldVideo);
      // this[`${oldVideo.id}`] = new EZUIPlayer(`${oldVideo.id}`);
    },

    // 切换高清标清的url,definition为true高清转标清
    changeUrl(id, url, definition) {
      let video = this.createVideo(id);
      let changeUrl;
      if (definition) {
        changeUrl = url.replace(/.hd/g, "");
      } else {
        changeUrl = url.replace(/.m3u8/, ".hd.m3u8");
      }
      video.getElementsByTagName("source")[0].src = changeUrl;
      video.getElementsByTagName("source")[1].src = changeUrl;
      return video;
    },

    // 点击地图弹窗
    dialogMap(list, e) {
      e.stopPropagation();
      this.videoList = list.videoList;
      this.dialogProjectName = list.projectName;
      if (
        this.videoList.length &&
        this.videoList.some(
          item =>
            (item.longitude && item.latitude) != null &&
            (item.longitude && item.latitude) != ""
        )
      ) {
        this.mapDialog = true;
        this.$nextTick(() => {
          this.getMap();
          this.addPlace();
        });
      } else if (this.videoList.length) {
        // this.$message({
        //   type: "warning",
        //   message: "该项目下的摄像头未设置位置"
        // });
        this.mapDialog = true;
        this.$nextTick(() => {
          this.getNoMap();
          this.addPlace();
        });
      } else {
        this.$message({
          type: "warning",
          message: "该项目下没有摄像头"
        });
      }
    },

    // 渲染地图
    getMap() {
      this.map = new AMap.Map("mapId", {
        zoom: 16,
        center: [
          Number(
            this.videoList.filter(
              item => item.longitude != null && item.longitude != ""
            )[0].longitude
          ),
          Number(
            this.videoList.filter(
              item => item.latitude != null && item.latitude != ""
            )[0].latitude
          )
        ],
        mapStyle: "amap://styles/fresh"
      });
      let markList = new Array();
      this.videoList.forEach(a => {
        if (
          (a.longitude && a.latitude) != null &&
          (a.longitude && a.latitude) != ""
        ) {
          markList.push(
            new AMap.Marker({
              position: [Number(a.longitude), Number(a.latitude)],
              animation: "AMAP_ANIMATION_DROP",
              draggable: true
            })
          );
        }
      });
      this.map.add(markList);
      markList.forEach(a => {
        a.on("mouseover", this.on);
        a.on("dragstart", this.moveMarkStart);
        a.on("dragend", this.moveMarkEnd);
      });
    },

    // 有摄像头却没有定位
    getNoMap() {
      this.map = new AMap.Map("mapId", {
        zoom: 12,
        center: [114.057939, 22.543527],
        mapStyle: "amap://styles/fresh"
      });
    },

    // mark开始移动
    moveMarkStart() {
      this.infoWindow.close();
    },

    // mark移动结束
    moveMarkEnd(e) {
      this.draggingLng = e.lnglat.getLng();
      this.draggingLat = e.lnglat.getLat();
      this.affirmMark = true;
    },

    // 修改摄像头位置
    editMark(add) {
      this.$axios
        .post(
          `/api/ProjectVideo/updateVideoCoordinate?videoSn=${
            add == "add" ? this.addMarkSn : this.editMarkSn
          }&longitude=${this.draggingLng}&latitude=${this.draggingLat}`
        )
        .then(res => {
          if (res.data.code == 0) {
            this.messageBox("修改成功", 1);
            this.getVideo(false);
            setTimeout(() => {
              this.listWrap.forEach(a =>
                a.projectList.forEach(b => {
                  if (b.projectName == this.dialogProjectName) {
                    this.videoList = b.videoList;
                  }
                })
              );
              this.getMap();
              this.addPlace();
            }, 500);
          } else {
            this.messageBox("修改失败", 0);
            this.getMap();
          }
        });
    },

    // 地图鼠标弹窗
    on(e) {
      let lng = e.target.B.position.lng;
      let lat = e.target.B.position.lat;
      this.videoList.forEach(a => {
        if (Number(a.longitude) == lng && Number(a.latitude) == lat) {
          this.infoWindow = new AMap.InfoWindow({
            anchor: "bottom-center",
            content: a.videoName,
            offset: new AMap.Pixel(0, -20)
          });
          this.infoWindow.open(this.map, [lng, lat]);
          this.editMarkSn = a.videoSn;
        }
      });
    },

    // 需要添加摄像头位置的摄像头列表
    addPlace() {
      this.addPlaceList = new Array();
      this.videoList.forEach(item => {
        if (
          (item.longitude && item.latitude) == null ||
          (item.longitude && item.latitude) == ""
        ) {
          this.addPlaceList.push(item);
        }
      });
    },

    // 选择添加的摄像头
    handleCommand(val) {
      this.addMarkSn = val;
      this.messageBox("请在地图上点选摄像头位置", 1);
      this.lister();
    },

    // 渲染mark标记
    setMark(e) {
      this.draggingLng = e.lnglat.lng;
      this.draggingLat = e.lnglat.lat;
      new AMap.Marker({
        position: e.lnglat,
        map: this.map
      });
      this.removeMark();
      setTimeout(() => {
        this.addMark = true;
      }, 1000);
    },

    // 监听事件
    lister() {
      // this.removeMark();//防止重复绑定
      this.clickListener = AMap.event.addListener(
        this.map,
        "click",
        this.setMark
      ); //绑定地图事件
    },

    // 清除mark标记
    removeMark() {
      if (this.clickListener) {
        AMap.event.removeListener(this.clickListener); //移除地图事件，以绑定时返回的对象作为参数
      }
    },

    // 表头样式
    headerRow() {
      return {
        background: "#0f1f53"
      };
    },

    // 表头单元格样式
    headerStyle() {
      return {
        background: "#020422",
        "font-size": "0.14rem",
        "font-weight": 500,
        color: "#fff",
        "text-align": "left",
        "border-top": "1px solid #0f1f53",
        "border-bottom": "1px solid #0f1f53"
        // "line-height": ".2rem"
      };
    },

    // 行样式
    rowStyle() {
      return {
        background: "#020422",
        "font-size": "0.14rem",
        "font-weight": 500,
        color: "#fff",
        "text-align": "left",
        "border-top": "1px solid #0f1f53",
        cursor: "pointer"
      };
    },

    // 表单元格样式
    cellStyle() {
      return {
        "border-bottom": "1px solid #0f1f53",
        "text-align": "left"
        // "line-height": ".2rem"
      };
    },

    // 点击行事件
    rowClick(row) {
      this.$refs.table.toggleRowSelection(row);
    },

    // 选择绑定
    handleSelectionChange(val) {
      this.pageDownloadList = val;
    },

    // 下载页面翻页
    handleCurrentChange() {
      this.allDownlodList[`${this.oldPageNum}`] = this.pageDownloadList;
      this.getDownloadVideo();
    },

    // 搜索对讲机
    searchVideo() {
      this.searchName = this.searchs;
      this.getDownloadVideo();
    },

    // 选中一行
    toggleSelection(rows) {
      let rowList = rows[`${this.pageNum}`];
      let check;
      if (rowList) {
        rowList.forEach(row => {
          for (let i = 0; i < this.tableData.length; i++) {
            if (this.tableData[i].id == row.id) {
              check = i;
            }
          }
          this.$refs.table.toggleRowSelection(this.tableData[`${check}`]);
        });
      } else {
        this.$refs.table.clearSelection();
      }
    },

    // 下载
    downloadVideoList() {
      this.allDownlodList[`${this.pageNum}`] = this.pageDownloadList;
      if (this.downloadTime.length == 0) {
        this.messageBox("请选择时间", 0);
        return;
      } else if (
        this.allDownlodList[`${Object.keys(this.allDownlodList)[0]}`].length ==
        0
      ) {
        this.messageBox("请选择下载项", 0);
        return;
      }
      let user = "";
      let name = "";
      for (const key in this.allDownlodList) {
        this.allDownlodList[key].forEach(a => {
          user = a.atAccount + "," + user;
          name = a.atName + "," + name;
        });
      }
      // 处理字符串
      name = name.replace(/\s/g, "");
      let a = [...name];
      a.pop();
      name = a.join("");
      let b = [...user];
      b.pop();
      user = b.join("");
      this.allDownlodList = {};
      // 下载
      location.href = `http://47.106.71.3:8080/api/sbGroupTalkback/ftpDownload?ftpPath=${this.accountId}&user=${user}&name=${name}&startTime=${this.downloadTime[0]}&endTime=${this.downloadTime[1]}`;
    }
  },
  components: {
    box
  },
  updated() {
    if (this.oldVideoNum !== this.videoNum && this.videoNum !== 1) {
      this.oldVideoNum = this.videoNum;
    }
  },
  watch: {
    pageNum: function(newValue, oldValue) {
      this.oldPageNum = oldValue;
    }
  },
  beforeDestroy() {
    this.clearVideo();
    if (this.interval != null) clearInterval(this.interval);
    window.fn_rel();
    sessionStorage.removeItem("message");
    if (typeof this.player17 === "object") this.player17.stop();
  }
};
</script>

<style scoped lang="less">
// @import "~@/assets/scrollBar.css";
.content {
  // width: 19.2rem;
  height: 10.8rem;
  box-sizing: border-box;
  padding: 0.5rem 0.25rem 0.25rem 0.25rem;
  display: flex;
  justify-content: space-between;
  flex-wrap: nowrap;
  .backTo,
  .reload {
    color: #fff;
    display: inline-block;
    border: 1px solid #fff;
    border-radius: 5px;
    height: 0.3rem;
    width: 0.5rem;
    text-align: center;
    line-height: 0.3rem;
    cursor: pointer;
    transition: 0.5s all;
    position: absolute;
    top: 0.1rem;
    &:hover {
      background: #0f1f53;
      color: #3375fe;
      border: 1px solid #3375fe;
    }
  }
  .reload {
    left: 0.8rem;
  }
  .video-list-wrap {
    width: 3.1rem;
    height: 100%;
    box-sizing: border-box;
    background: #020422;
    border: 1px solid #0f1f53;
    box-shadow: inset 0 0 7px 2px #0f1f53;
    overflow-y: auto;
    overflow-x: hidden;
    .list {
      height: 0.7rem;
      line-height: 0.7rem;
      position: relative;
      color: #3375fe;
      border-bottom: 1px solid transparent;
      border-image: linear-gradient(
        to right,
        rgba(15, 31, 83, 0),
        rgba(15, 31, 83, 1),
        rgba(15, 31, 83, 0)
      );
      border-image-slice: 10;
      cursor: pointer;
      font-size: 0.18rem;
      .el-icon-office-building {
        position: absolute;
        top: 50%;
        left: 0.1rem;
        transform: translateY(-50%);
        font-size: 0.25rem;
      }
      p {
        line-height: 0.7rem;
        padding-left: 0.5rem;
        width: 2.8rem;
        font-size: 0.15rem;
        display: inline-block;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
      }
      .el-icon-caret-right {
        transition: all 0.2s;
        position: absolute;
        right: 0.1rem;
        top: 50%;
        font-size: 0.14rem;
        margin-top: -0.07rem;
      }
    }
    .child {
      > li {
        width: 100%;
        // padding-left: 0.2rem;
        color: #3375fe;
        border-bottom: 1px solid transparent;
        border-image: linear-gradient(
          to right,
          rgba(15, 31, 83, 0),
          rgba(15, 31, 83, 1),
          rgba(15, 31, 83, 0)
        );
        border-image-slice: 10;
        cursor: pointer;
        .lists {
          height: 0.7rem;
          color: #3375fe;
          border-bottom: 1px solid transparent;
          border-image: linear-gradient(
            to right,
            rgba(15, 31, 83, 0),
            rgba(15, 31, 83, 1),
            rgba(15, 31, 83, 0)
          );
          border-image-slice: 10;
          cursor: pointer;
          position: relative;
          p {
            padding-left: 0.65rem;
            line-height: 0.7rem;
            width: 2.6rem;
            display: inline-block;
            text-overflow: ellipsis;
            white-space: nowrap;
            overflow: hidden;
          }
          .el-icon-caret-right {
            transition: all 0.2s;
            position: absolute;
            top: 50%;
            right: 0.1rem;
            margin-top: -0.07rem;
            font-size: 0.14rem;
          }
          .el-icon-video-camera {
            font-size: 0.22rem;
            position: absolute;
            top: 50%;
            left: 0.35rem;
            transform: translateY(-50%);
          }
          .el-icon-map-location {
            font-size: 0.22rem;
            position: absolute;
            top: 50%;
            left: 0.07rem;
            transform: translateY(-50%);
          }
          .red {
            color: red;
          }
        }
        .childs {
          color: #3375fe;
          // text-align: center;
          li {
            padding: 0.1rem 0 0.1rem 0.1rem;
            height: 0.9rem;
            overflow: hidden;
            .loading-img {
              display: inline-block;
              vertical-align: top;
              margin-right: 0.1rem;
              width: 1.24rem;
              height: 0.7rem;
              border-radius: 0.15rem;
              overflow: hidden;
              border: 1px solid #3975fe;
              text-align: center;
              /deep/.el-icon-loading {
                font-size: 0.4rem;
              }
              span {
                font-size: 0.14rem;
                color: #fff;
                display: inline-block;
                line-height: 0.7rem;
              }
              img {
                width: 100%;
                height: 100%;
              }
              /deep/.el-loading-spinner {
                margin-top: 0 !important;
                transform: translateY(-50%) !important;
              }
            }
            p {
              width: 1.35rem;
              line-height: 0.35rem;
              display: inline-block;
              // text-overflow: ellipsis;
              // white-space: nowrap;
              // overflow: hidden;
              // padding-left: 0.45rem;
            }
            .el-icon-caret-right {
              float: right;
              transition: all 0.2s;
              line-height: 0.25rem;
            }
          }
          // li:hover {
          //   background: linear-gradient(
          //     to right,
          //     rgba(26, 28, 54, 0),
          //     rgba(26, 28, 54, 1),
          //     rgba(26, 28, 54, 0)
          //   );
          // }
        }
      }
    }
    .active {
      background: linear-gradient(
        to right,
        rgba(26, 28, 54, 0),
        rgba(26, 28, 54, 1),
        rgba(26, 28, 54, 0)
      );
      .el-icon-caret-right {
        transform: rotate(90deg);
      }
    }
    .fade-enter-active {
      transition: all 0.5s;
    }
    .fade-leave-active {
      transition: all 0s;
    }
    .fade-enter {
      opacity: 0;
    }
    .fade-enter-to {
      opacity: 1;
    }
    .fade-leave {
      opacity: 0;
      height: 0;
      overflow: hidden;
    }
    .fade-leave-to {
      opacity: 0;
    }
  }
  .video-wrap {
    flex: 1;
    height: 100%;
    margin-left: 0.15rem;
    .video-top {
      width: 100%;
      height: 8.5rem;
      display: flex;
      .video-area {
        width: 12rem;
        height: 8.5rem;
        box-sizing: border-box;
        border-right: 1px solid #0f1f53;
        padding: 0.15rem;
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        align-content: space-between;
      }
      .area4 {
        .area-list {
          width: 5.75rem;
          height: 4rem;
          background: url("../../../static/images/videoImageBg.png");
          background-size: 100% 100%;
          background-repeat: no-repeat;
          padding: 0 0.25rem 0.25rem;
          .list-top {
            padding: 0.2rem 0;
            height: 0.66rem;
            .circle {
              background: url("../../../static/images/circle.png");
              display: inline-block;
              width: 0.25rem;
              height: 0.25rem;
              background-repeat: no-repeat;
              background-size: 100% 100%;
              vertical-align: unset;
            }
            p {
              display: inline-block;
              font-size: 0.16rem;
              line-height: 0.25rem;
              color: #fff;
              margin: 0 0.1rem;
              max-width: 70%;
              text-overflow: ellipsis;
              white-space: nowrap;
              overflow: hidden;
            }
            .cut {
              font-size: 0.16rem;
              line-height: 0.25rem;
              float: right;
              color: #fff;
              cursor: pointer;
              margin-right: 0.1rem;
              transition: color 0.5s;
            }
            .cut:hover {
              color: #3375fe;
            }
            .maximize {
              float: right;
              background: url("../../../static/images/maximize.png");
              width: 0.25rem;
              height: 0.25rem;
              background-repeat: no-repeat;
              background-size: 100% 100%;
              vertical-align: bottom;
              cursor: pointer;
            }
            span {
              display: inline-block;
              width: 0.08rem;
              height: 0.08rem;
              border-radius: 50%;
              background: #6b6b6b;
              vertical-align: text-top;
            }
          }
          .list-bottom {
            width: 100%;
            // height: calc(100% - 0.66rem);
            height: 3.1rem;
            background: #6b6b6b;
            border: 1px solid #4d4d4d;
            text-align: center;
            position: relative;
            p {
              position: absolute;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
            }
            .el-icon-circle-close {
              position: absolute;
              top: 10px;
              right: 10px;
              cursor: pointer;
              z-index: 5;
              color: #3375fe;
              transition: color 0.5s;
              font-size: 0.25rem;
              &:hover {
                color: red;
              }
            }
          }
        }
      }
      .area9 {
        .area-list {
          width: 3.8rem;
          height: 2.65rem;
          background: url("../../../static/images/videoImageBg.png");
          background-size: 100% 100%;
          background-repeat: no-repeat;
          padding: 0 0.2rem 0.2rem;
          .list-top {
            padding: 0.1rem 0;
            height: 0.44rem;
            .circle {
              background: url("../../../static/images/circle.png");
              display: inline-block;
              width: 0.2rem;
              height: 0.2rem;
              background-repeat: no-repeat;
              background-size: 100% 100%;
              vertical-align: unset;
            }
            p {
              display: inline-block;
              font-size: 0.14rem;
              line-height: 0.24rem;
              color: #fff;
              margin: 0 0.1rem;
              max-width: 68%;
              text-overflow: ellipsis;
              white-space: nowrap;
              overflow: hidden;
            }
            .cut {
              font-size: 0.14rem;
              line-height: 0.24rem;
              float: right;
              color: #fff;
              cursor: pointer;
              margin-right: 0.1rem;
              transition: color 0.5s;
            }
            .cut:hover {
              color: #3375fe;
            }
            .maximize {
              float: right;
              background: url("../../../static/images/maximize.png");
              width: 0.2rem;
              height: 0.2rem;
              background-repeat: no-repeat;
              background-size: 100% 100%;
              vertical-align: bottom;
              cursor: pointer;
            }
            span {
              display: inline-block;
              width: 0.06rem;
              height: 0.06rem;
              border-radius: 50%;
              background: #6b6b6b;
              vertical-align: text-top;
            }
          }
          .list-bottom {
            width: 100%;
            // height: calc(100% - 0.44rem);
            height: 2rem;
            background: #6b6b6b;
            border: 1px solid #4d4d4d;
            text-align: center;
            position: relative;
            p {
              position: absolute;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
            }
            .el-icon-circle-close {
              position: absolute;
              top: 10px;
              right: 10px;
              cursor: pointer;
              z-index: 5;
              color: #3375fe;
              transition: color 0.5s;
              font-size: 0.2rem;
              &:hover {
                color: red;
              }
            }
          }
        }
      }
      .area16 {
        .area-list {
          width: 2.85rem;
          height: 1.95rem;
          background: url("../../../static/images/videoImageBg.png");
          background-size: 100% 100%;
          background-repeat: no-repeat;
          padding: 0 0.1rem 0.1rem;
          .list-top {
            padding: 0.05rem 0;
            height: 0.33rem;
            .circle {
              background: url("../../../static/images/circle.png");
              display: inline-block;
              width: 0.15rem;
              height: 0.15rem;
              background-repeat: no-repeat;
              background-size: 100% 100%;
              vertical-align: super;
            }
            p {
              display: inline-block;
              font-size: 0.12rem;
              color: #fff;
              margin: 0 0.05rem;
              max-width: 67%;
              text-overflow: ellipsis;
              white-space: nowrap;
              overflow: hidden;
              line-height: 0.23rem;
            }
            .cut {
              font-size: 0.12rem;
              line-height: 0.23rem;
              float: right;
              color: #fff;
              cursor: pointer;
              margin-right: 0.1rem;
              transition: color 0.5s;
            }
            .cut:hover {
              color: #3375fe;
            }
            .maximize {
              float: right;
              background: url("../../../static/images/maximize.png");
              width: 0.12rem;
              height: 0.12rem;
              margin-top: 0.04rem;
              background-repeat: no-repeat;
              background-size: 100% 100%;
              vertical-align: bottom;
              cursor: pointer;
            }
            span {
              display: inline-block;
              width: 0.04rem;
              height: 0.04rem;
              border-radius: 50%;
              background: #6b6b6b;
              vertical-align: text-top;
            }
          }
          .list-bottom {
            width: 100%;
            // height: calc(100% - 0.33rem);
            height: 1.5rem;
            background: #6b6b6b;
            border: 1px solid #4d4d4d;
            text-align: center;
            position: relative;
            p {
              position: absolute;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
            }
            .el-icon-circle-close {
              position: absolute;
              top: 5px;
              right: 5px;
              cursor: pointer;
              z-index: 5;
              color: #3375fe;
              transition: color 0.5s;
              font-size: 0.15rem;
              &:hover {
                color: red;
              }
            }
          }
        }
      }
      .area1 {
        position: relative;
        .back {
          position: absolute;
          top: 0.4rem;
          left: 0.35rem;
          // color: #3975fe;
          font-size: 0.22rem;
          font-weight: 500;
          cursor: pointer;
          z-index: 5;
          transition: text-shadow 0.5s;
        }
        .back:hover {
          text-shadow: 1px 3px 8px black;
        }
        .center {
          position: absolute;
          top: 0.4rem;
          left: 50%;
          transform: translateX(-50%);
          // color: #3975fe;
          font-size: 0.22rem;
          font-weight: 500;
          z-index: 5;
        }
        .cut {
          position: absolute;
          top: 0.35rem;
          right: 0.5rem;
          font-size: 0.18rem;
          cursor: pointer;
          z-index: 5;
          -webkit-transition: all 0.5s;
          transition: all 0.5s;
          border: 1px solid #000;
          border-radius: 0.05rem;
          padding: 0.05rem;
          background: #d8d8d8;
        }
        .cut:hover {
          color: #3375fe;
          border: 1px solid #3375fe;
          box-shadow: 2px 2px 2px 0px black;
        }
        .cut-back {
          position: absolute;
          top: 0.35rem;
          right: 0.35rem;
          font-size: 0.18rem;
          cursor: pointer;
          z-index: 4;
          -webkit-transition: all 0.5s;
          transition: all 0.5s;
          border: 1px solid #000;
          border-radius: 0.05rem;
          padding: 0.05rem;
          background: #d8d8d8;
        }
        .cut-back:hover {
          color: #3375fe;
          border: 1px solid #3375fe;
          z-index: 6;
          box-shadow: 2px 2px 2px 0px black;
        }
        .video-only {
          width: 100%;
          height: 100%;
          background: gray;
          .background {
            position: absolute;
            top: 0.15rem;
            left: 0.15rem;
            background: #e4e4e4f2;
            z-index: 1;
            box-shadow: 0px 2px 4px 0px #000000a3;
            position: absolute;
            width: 11.7rem;
            height: 0.7rem;
          }
          .get-time {
            position: absolute;
            // top: 0.25rem;
            right: 1rem;
            z-index: 5;
            width: 3rem;
            height: 0.7rem;
            padding: 0.05rem;
            font-size: 0.14rem;
            input {
              width: 1.8rem;
            }
            span {
              display: inline-block;
            }
          }
        }
      }
      .talkback {
        width: calc(100% - 12rem);
        text-align: center;
        position: relative;
        overflow-y: auto;
        > p {
          color: #fff;
          font-size: 0.24rem;
          font-weight: 500;
          line-height: 0.5rem;
          border-bottom: 1px solid transparent;
          border-image: linear-gradient(
            to right,
            rgba(15, 31, 83, 0),
            rgba(15, 31, 83, 1),
            rgba(15, 31, 83, 0)
          );
          border-image-slice: 10;
          cursor: pointer;
        }
        .button {
          height: 0.65rem;
          width: 100%;
          border-bottom: 1px solid transparent;
          border-image: linear-gradient(
            to right,
            rgba(15, 31, 83, 0),
            rgba(15, 31, 83, 1),
            rgba(15, 31, 83, 0)
          );
          border-image-slice: 10;
          position: relative;
          .microphone {
            background: url("../../../static/images/talkback.png");
            display: inline-block;
            width: 0.16rem;
            height: 0.2rem;
            background-repeat: no-repeat;
            background-size: 100% 100%;
            vertical-align: sub;
          }
          .el-icon-download {
            color: #3975fe;
            font-size: 0.2rem;
            position: absolute;
            top: 50%;
            margin-top: -0.1rem;
            right: 0.2rem;
            cursor: pointer;
          }
          > div {
            width: 1.4rem;
            height: 0.4rem;
            border: 1px solid #3975fe;
            border-radius: 5px;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            cursor: pointer;
            p {
              display: inline-block;
              margin-left: 0.1rem;
              line-height: 0.4rem;
              color: #3975fe;
              font-size: 0.16rem;
            }
          }
        }
        .download-box {
          height: 0.65rem;
          width: 100%;
          border-bottom: 1px solid transparent;
          border-image: linear-gradient(
            to right,
            rgba(15, 31, 83, 0),
            rgba(15, 31, 83, 1),
            rgba(15, 31, 83, 0)
          );
          border-image-slice: 10;
          position: relative;
          color: #fff;
        }
        .list-header {
          width: 100%;
          height: 0.35rem;
          border-bottom: 1px solid transparent;
          border-image: linear-gradient(
            to right,
            rgba(15, 31, 83, 0),
            rgba(15, 31, 83, 1),
            rgba(15, 31, 83, 0)
          );
          border-image-slice: 10;
          position: relative;
          p {
            display: inline-block;
            line-height: 0.35rem;
            color: #fff;
          }
          .parent-checkbox {
            position: absolute;
            top: 50%;
            left: 0.2rem;
            transform: translateY(-50%);
          }
        }
        ul {
          width: 100%;
          max-height: 6.6rem;
          overflow-y: auto;
          li {
            height: 0.55rem;
            overflow: hidden;
            width: 100%;
            border-bottom: 1px solid transparent;
            border-image: linear-gradient(
              to right,
              rgba(15, 31, 83, 0),
              rgba(15, 31, 83, 1),
              rgba(15, 31, 83, 0)
            );
            border-image-slice: 10;
            position: relative;
            text-align: left;
            .child-checkbox {
              position: absolute;
              top: 50%;
              left: 0.2rem;
              transform: translateY(-50%);
              /deep/.el-checkbox__input {
                position: absolute;
                top: 0.22rem;
                left: -0.1rem;
              }
              .el-checkbox__label p {
                font-size: 0.14rem;
                width: 2.7rem;
                text-overflow: ellipsis;
                white-space: nowrap;
                overflow-x: hidden;
              }
            }
            /deep/.el-checkbox__label {
              // margin-left: .45rem;
              display: inline-block;
              line-height: 0.55rem;
              color: #fff;
            }
            .record {
              color: #3975fe;
            }
            .wi-fi {
              background: url("../../../static/images/whiter-wi-fi.png");
              display: inline-block;
              width: 0.17rem;
              height: 0.2rem;
              background-repeat: no-repeat;
              background-size: 100% 100%;
              vertical-align: sub;
              position: absolute;
              top: 50%;
              right: 0.2rem;
              transform: translateY(-50%);
            }
            .online {
              background: url("../../../static/images/green-wi-fi.png");
              display: inline-block;
              width: 0.17rem;
              height: 0.2rem;
              background-repeat: no-repeat;
              background-size: 100% 100%;
              vertical-align: sub;
              position: absolute;
              top: 50%;
              right: 0.2rem;
              transform: translateY(-50%);
            }
          }
        }
        .introduce {
          color: #fff;
          font-size: 0.12rem;
          // height: 2.8rem;
          overflow-y: auto;
          text-align: left;
          padding: 0 6%;
          font-size: 0.16rem;
          p {
            display: inline-block;
            width: 2rem;
            vertical-align: text-top;
          }
          span {
            display: inline-block;
            width: 0.8rem;
          }
        }
        .steering-wrap {
          position: absolute;
          bottom: 0.3rem;
          left: 50%;
          transform: translateX(-50%) rotate(45deg);
          width: 2rem;
          height: 2rem;
          border-radius: 50%;
          overflow: hidden;
          border: 2px solid #142a6a;
          > div {
            width: 50%;
            height: 50%;
            float: left;
            position: relative;
            border: 1px solid #142a6a;
            cursor: pointer;
            transition: background 0.5s;
            i {
              position: absolute;
              font-size: 0.2rem;
              top: 50%;
              left: 50%;
              color: #3375fe;
            }
            &:hover {
              background: #0e1d48;
            }
          }
          .top-left {
            i {
              margin-top: -(sin(45) * 0.1rem);
              margin-left: -(sin(45) * 0.1rem);
              transform: rotate(-45deg);
            }
          }
          .top-right {
            i {
              margin-top: -(sin(45) * 0.1rem);
              margin-left: -(sin(45) * 0.1rem);
              transform: rotate(-45deg);
            }
          }
          .buttom-left {
            i {
              margin-top: -(sin(45) * 0.1rem);
              margin-left: -(sin(45) * 0.1rem);
              transform: rotate(-45deg);
            }
          }
          .buttom-right {
            i {
              margin-top: -(sin(45) * 0.1rem);
              margin-left: -(sin(45) * 0.1rem);
              transform: rotate(-45deg);
            }
          }
          .center {
            width: 35%;
            height: 35%;
            background: #020422;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%) rotate(-45deg);
            border-radius: 50%;
            border: 2px solid #142a6a;
            overflow: hidden;
            > div {
              width: 50%;
              height: 100%;
              display: inline-block;
              position: relative;
              transition: background 0.5s;
              &:first-child {
                border-right: 2px solid #142a6a;
              }
              &:hover {
                background: #0e1d48;
              }
            }
            i {
              font-size: 0.15rem;
              position: absolute;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
            }
          }
          .center:hover {
            background: #020422;
          }
        }
        .presetPoint {
          cursor: pointer;
          line-height: 0.55rem;
          max-height: 6.2rem;
          .name {
            color: #fff;
            font-size: 0.18rem;
            margin-left: 0.25rem;
          }
          .delete {
            color: #388810;
            float: right;
            font-size: 0.14rem;
            margin-right: 0.25rem;
            transition: color 0.5s;
            &:hover {
              color: rgb(170, 0, 0);
            }
          }
        }
        .insertPreset {
          position: absolute;
          color: #3375fe;
          bottom: 0.2rem;
          right: 0.2rem;
          font-size: 0.14rem;
          border: 1px solid #3375fe;
          border-radius: 0.05rem;
          display: block;
          padding: 0.05rem;
          transition: all 0.5s;
          cursor: pointer;
          &:hover {
            color: #fff;
            border: 1px solid #fff;
          }
        }
      }
      .talkback::-webkit-scrollbar {
        width: 0 !important;
      }
    }
    .video-bottom {
      border-top: 1px solid #142a6a;
      box-sizing: border-box;
      height: calc(100% - 8.5rem);
      padding: 0 0.16rem;
      > div {
        display: inline-block;
        height: 100%;
        width: 0.57rem;
        margin-right: 0.28rem;
        cursor: pointer;
        margin-top: -0.01rem;
        border-top: 1px solid transparent;
      }
      .video-4 {
        background: url("../../../static/images/video-4.png");
        background-repeat: no-repeat;
        background-position-y: center;
        background-size: 100%;
      }
      .video-9 {
        background: url("../../../static/images/video-9.png");
        background-repeat: no-repeat;
        background-position-y: center;
        background-size: 100%;
      }
      .video-16 {
        background: url("../../../static/images/video-16.png");
        background-repeat: no-repeat;
        background-position-y: center;
        background-size: 100%;
      }
      .video-image-active {
        border-top: 1px solid #3375fe;
      }
      .all-video-player {
        background: url("../../../static/images/allVideoPlayer.png");
        background-repeat: no-repeat;
        background-position-y: center;
        background-size: 100%;
      }
      .video-playe-wheel {
        background: url("../../../static/images/videoPlayeWheel.png");
        background-repeat: no-repeat;
        background-position-y: center;
        background-size: 100%;
        position: relative;
        .steering-wrap {
          position: absolute;
          top: -1.8rem;
          left: 50%;
          transform: translateX(-50%) rotate(45deg);
          width: 2rem;
          height: 2rem;
          border-radius: 50%;
          overflow: hidden;
          border: 2px solid #142a6a;
          box-shadow: 5px -2px 5px 0px black;
          > div {
            width: 50%;
            height: 50%;
            float: left;
            position: relative;
            border: 1px solid #142a6a;
            cursor: pointer;
            transition: background 0.5s;
            background: #020422;
            i {
              position: absolute;
              font-size: 0.2rem;
              top: 50%;
              left: 50%;
              color: #3375fe;
            }
            &:hover {
              background: #0e1d48;
            }
          }
          .top-left {
            i {
              margin-top: -(sin(45) * 0.1rem);
              margin-left: -(sin(45) * 0.1rem);
              transform: rotate(-45deg);
            }
          }
          .top-right {
            i {
              margin-top: -(sin(45) * 0.1rem);
              margin-left: -(sin(45) * 0.1rem);
              transform: rotate(-45deg);
            }
          }
          .buttom-left {
            i {
              margin-top: -(sin(45) * 0.1rem);
              margin-left: -(sin(45) * 0.1rem);
              transform: rotate(-45deg);
            }
          }
          .buttom-right {
            i {
              margin-top: -(sin(45) * 0.1rem);
              margin-left: -(sin(45) * 0.1rem);
              transform: rotate(-45deg);
            }
          }
          .center {
            width: 35%;
            height: 35%;
            background: #020422;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%) rotate(-45deg);
            border-radius: 50%;
            border: 2px solid #142a6a;
            overflow: hidden;
            > div {
              width: 50%;
              height: 100%;
              display: inline-block;
              position: relative;
              transition: background 0.5s;
              &:first-child {
                border-right: 2px solid #142a6a;
              }
              &:hover {
                background: #0e1d48;
              }
            }
            i {
              font-size: 0.15rem;
              position: absolute;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
            }
          }
          .center:hover {
            background: #020422;
          }
        }
      }
    }
  }
  .addPlace {
    color: #fff;
    font-size: 0.18erm;
    position: absolute;
    right: 0.6rem;
    top: 0.2rem;
    cursor: pointer;
    transition: color 0.5s;
    span {
      font-size: 0.14rem;
    }
    &:hover {
      color: #3375fe;
    }
  }
  /deep/.vsc-controller {
    display: none;
  }
  /deep/.el-dialog--center,
  /deep/.el-dialog {
    background: #020422;
    border: 1px solid #0f1f53;
    box-shadow: inset 0 0 0.07rem 0.02rem #0f1f53;
  }
  /deep/.el-dialog__title {
    font-size: 0.22rem;
    color: #fff;
  }
  /deep/.el-dialog__header {
    padding: 0.2rem 0.2rem 0;
  }
  /deep/.el-dialog p {
    color: #fff;
    font-size: 0.12rem;
    padding-left: 0.1rem;
  }
  .dialog-footer {
    div {
      width: 0.7rem;
      float: right;
      margin-right: 0.25rem;
      line-height: 0.3rem;
      font-size: 0.16rem;
      color: #fff;
      border: 1px solid #3975fe;
      text-align: center;
      border-radius: 0.05rem;
      cursor: pointer;
      background: #020422;
      transition: background 0.5s;
    }
    div:hover {
      background: #3975fe;
    }
  }
  .dialog-footer::after {
    content: "";
    display: block;
    clear: both;
  }
  .dialog-download-wrap {
    /deep/.el-dialog--center .el-dialog__body {
      padding: 0.25rem 0 0.3rem;
    }
    .dialog-download {
      width: 100%;
      height: 5rem;
      border-top: 1px solid #0f1f53;
      position: relative;
      .header {
        padding: 0 0.2rem;
        .el-input {
          width: 2rem;
          margin-right: 0.2rem;
          font-size: 0.14rem;
          /deep/.el-input__inner {
            background-color: #020422;
            border: 1px solid #0f1f53;
            border-radius: 0.05rem;
            color: #fff;
            height: 0.4rem;
            line-height: 0.4rem;
          }
        }
        /deep/.el-range-editor.el-input__inner {
          width: 3rem;
        }
        /deep/.el-date-editor .el-range-separator {
          padding: 0;
          color: #fff;
          font-style: 0.14rem;
          line-height: 0.4rem;
        }
        /deep/.el-input__inner {
          background-color: #020422;
          border: 1px solid #0f1f53;
          border-radius: 0.05rem;
          color: #fff;
          font-size: 0.14rem;
          height: 0.4rem;
          line-height: 0.4rem;
          .el-range-input {
            background-color: #020422;
            color: #fff;
            font-size: 0.14rem;
            line-height: 0.4rem;
          }
        }
        p {
          display: inline-block;
          font-size: 0.14rem;
          line-height: 0.7rem;
          margin-right: 0.2rem;
        }
        .button {
          float: right;
          color: #3975fe;
          width: 0.8rem;
          height: 0.35rem;
          border: 1px solid #3975fe;
          border-radius: 0.05rem;
          font-size: 0.16rem;
          line-height: 0.35rem;
          text-align: center;
          margin-top: 0.175rem;
          cursor: pointer;
          transition: 0.5s all;
          &:hover {
            color: #fff;
            border-color: transparent;
            background: #3975fe;
          }
        }
      }
      /deep/.el-table .cell {
        line-height: 0.23rem;
      }
      .botton {
        width: 1.2rem;
        line-height: 0.35rem;
        border: 1px solid #3975fe;
        font-size: 0.16rem;
        text-align: center;
        color: #3975fe;
        border-radius: 0.07rem;
        cursor: pointer;
        transition: 0.5s all;
        position: absolute;
        bottom: -0.12rem;
        left: calc(50% - 0.6rem);
        &:hover {
          border: 1px solid transparent;
          background: #3975fe;
          color: #fff;
        }
      }
      .el-pagination {
        display: inline-block;
        position: absolute;
        right: 0.2rem;
        bottom: -0.12rem;
        background: #020422;
        /deep/.btn-prev,
        /deep/.el-pager,
        /deep/.btn-next {
          background: #020422;
          li {
            background: #020422;
            font-size: 0.14rem;
            height: 0.28rem;
            line-height: 0.28rem;
          }
        }
        /deep/.el-icon {
          font-size: 0.14rem;
          height: 0.28rem;
          line-height: 0.28rem;
        }
        /deep/.el-pagination__total {
          font-size: 0.14rem;
          height: 0.28rem;
          line-height: 0.28rem;
        }
      }
    }
  }
}
body .dropdown {
  background: #020422;
  border: 1px solid #3975fe;
  color: #fff;
  li {
    line-height: 0.36rem;
    padding: 0 0.2rem;
  }
  li::hover {
    color: #3375fe;
  }
  /deep/.popper__arrow {
    border-bottom-color: #3975fe;
    &::after {
      border-bottom-color: #3975fe;
    }
  }
}
.el-table::before {
  background: #0f1f53;
}
.el-table {
  margin: auto;
}
/deep/.el-table--enable-row-hover .el-table__body tr:hover > td {
  background-color: #172d7c8a !important;
}
/deep/.el-table__empty-block {
  background: #020422;
}
</style>
