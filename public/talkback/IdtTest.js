function myBrowser() {
    var userAgent = navigator.userAgent; //ȡ���������userAgent�ַ���
    var isOpera = userAgent.indexOf("Opera") > -1;
    if (isOpera) {
        return "Opera"
    }; //�ж��Ƿ�Opera�����?
    if (userAgent.indexOf("Firefox") > -1) {
        return "FF";
    } //�ж��Ƿ�Firefox�����?
    if (userAgent.indexOf("Chrome") > -1) {
        return "Chrome";
    }
    if (userAgent.indexOf("Safari") > -1) {
        return "Safari";
    } //�ж��Ƿ�Safari�����?
    if (userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 && !isOpera) {
        return "IE";
    }; //�ж��Ƿ�IE�����?

    if (!!window.ActiveXObject || "ActiveXObject" in window) {
        return "IE";
    }
    return "Unknown";
}

var id_video_my, id_video_peer;

window.onload = function () {
    //�ж����ĸ������?,����ʹ�õĴ���
    // var strB = myBrowser();

    // if ("IE" == strB) {
    //     if (null != id_video_my_o.object) //OCX��ע��
    //     {
    //         id_video_my = id_video_my_o;
    //         id_video_peer = id_video_peer_o;
    //         document.getElementById("id_video_my_v").style.display = "none";
    //         document.getElementById("id_video_peer_v").style.display = "none";
    //         document.getElementById("id_video_my_down").style.display = "none";
    //         document.getElementById("id_video_peer_down").style.display = "none";
    //     } else //OCXδע��
    //     {
    //         id_video_my = null;
    //         id_video_peer = null;
    //         document.getElementById("id_video_my_v").style.display = "none";
    //         document.getElementById("id_video_peer_v").style.display = "none";
    //         document.getElementById("id_video_my_o").style.display = "none";
    //         document.getElementById("id_video_peer_o").style.display = "none";
    //     }
    // } else {
    //     id_video_my = id_video_my_v;
    //     id_video_peer = id_video_peer_v;
    //     document.getElementById("id_video_my_o").style.display = "none";
    //     document.getElementById("id_video_peer_o").style.display = "none";
    //     document.getElementById("id_video_my_down").style.display = "none";
    //     document.getElementById("id_video_peer_down").style.display = "none";
    // }

    // //�ж�URL��ַ,��дMC��ַ

    // var strSrvAddr = document.getElementById("id_srv_addr");
    // var strGpsSrvAddr = document.getElementById("id_gpssrv_addr");

    // if (-1 != window.location.href.indexOf('file:///')) //�����ļ�
    // {
    //     strSrvAddr.value = "ws://IPAddr:10004";
    //     strGpsSrvAddr.value = "ws://IPAddr:10005";
    // } else {
    //     if (-1 == window.location.href.indexOf('https')) {
    //         //��WS
    //         strSrvAddr.value = "ws://" + window.location.hostname + ":10004";
    //         strGpsSrvAddr.value = "ws://" + window.location.hostname + ":10005";
    //     } else {
    //         //��WSS
    //         strSrvAddr.value = "wss://" + window.location.hostname + ":" + window.location.port + "/mc_wss";
    //         strGpsSrvAddr.value = "wss://" + window.location.hostname + ":" + window.location.port + "/gs_wss";
    //     }
    // }

    // fn_Start()
    return 0;
}


var g_ShowHB = false;

//�Ƿ���ʾ����
function fn_ck_msgrx() {
    var cbk = document.getElementById('id_ck_msgrx');
    if (cbk.checked == false) {
        g_ShowHB = false;
    } else {
        g_ShowHB = true;
    }
}

//--------------------------------------------------------------------------------
//      �յ���Ϣ�Ĺ��Ӻ���,������
//  ����:
//      link:           ��·��
//      msg:            �յ�����Ϣ
//  ����:
//      0:              �ɹ�
//      -1:             ʧ��
//--------------------------------------------------------------------------------
function onRecvMsgHook(link, msg) {
    if (false == g_ShowHB && msg.MsgCode == IDT.MSG_HB)
        return;

    var strOld = document.getElementById("id_rxtx_msg").value;
    var strMsg = JSON.stringify(msg);
    // \\->\
    var strMsg1 = strMsg.replace(new RegExp("\\\\\\\\", "g"), "\\");
    document.getElementById("id_rxtx_msg").value = strOld + PUtility.PGetCurTime() + " " + link + ":<--Rx--" + strMsg1 + "\r\n";
    return 0;
}
//--------------------------------------------------------------------------------
//      ������Ϣ�Ĺ��Ӻ���,������
//  ����:
//      link:           ��·��
//      msg:            �յ�����Ϣ
//  ����:
//      0:              �ɹ�
//      -1:             ʧ��
//--------------------------------------------------------------------------------
function onSendMsgHook(link, msg) {
    if (false == g_ShowHB) {
        if (IDT.MSG_HB == msg.MsgCode)
            return;
        if (IDT.MSG_MM_STATUSSUBS == msg.MsgCode) {
            if (0 == msg.MsgBody.SN)
                return;
        }
    }

    var strOld = document.getElementById("id_rxtx_msg").value;
    var strMsg = JSON.stringify(msg);
    // \\->\
    var strMsg1 = strMsg.replace(new RegExp("\\\\\\\\", "g"), "\\");
    document.getElementById("id_rxtx_msg").value = strOld + PUtility.PGetCurTime() + " " + link + ":--Tx-->" + strMsg1 + "\r\n";
    return 0;
}
//--------------------------------------------------------------------------------
//      ״ָ̬ʾ
//  ����:
//      status:         ״̬
//      usCause:        ԭ��ֵ
//  ����:
//      0:              �ɹ�
//      -1:             ʧ��
//--------------------------------------------------------------------------------
function onStatusInd(status, usCause) {
    // PUtility.Log("IDTUser", PUtility.PGetCurTime(), "onStatusInd", status, usCause);
    // var statusCtrl = document.getElementById("id_status");
    // if (0 == status) //����
    // {
    //     statusCtrl.textContent = PUtility.PGetCurTime() + "  " + "���� " + IDT.GetCauseStr(usCause);
    // } else //����
    // {
    //     statusCtrl.textContent = PUtility.PGetCurTime() + "  " + "���� " + IDT.GetCauseStr(usCause);
    //     m_IdtApi.StatusSubs(IDT.GU_STATUSSUBS_STR_ALL, IDT.GU_STATUSSUBS_DETAIL1);

    //     //������֯�������û�����
    //     fn_UQueryAll();
    //     fn_GQueryAll();
    // }
    return 0;
}
//--------------------------------------------------------------------------------
//      ����Ϣָʾ
//  ����:
//      gInfo:          ��Jason����
//          Prio:       ���ȼ�,1~7,ԽСԽ��
//          Type:       GROUP_MEMBERTYPE_USER��,�û�������
//          UTType:     �ն�����,UT_TYPE_TAP��.�������?,���ֶ���Ч
//          Attr:       �ն�����,UT_ATTR_HS��,��ʾ��.������벻���ն�?,��Ч
//          Num:        ����
//          Name:       ����
//          AGNum:      ���������?,ͨ��������Ƶ��
//          ChanNum:    ����ͷͨ������,������벻�������?,��Ч
//          Status:     ��״̬,UT_STATUS_OFFLINE��
//          FGCount:    �������?
//          FGNum:      �������?
//  ����:
//      0:              �ɹ�
//      -1:             ʧ��
//--------------------------------------------------------------------------------
function onGInfoInd(gInfo) {
    PUtility.Log("IDTUser", PUtility.PGetCurTime(), "onGInfoInd", gInfo);

    var strGroup = '';
    var i;
    if (null != gInfo) {
        for (i = 0; i < gInfo.length; i++) {
            strGroup += gInfo[i].Num + '(' + gInfo[i].Name + ') ';
        }
    }
    // document.getElementById("id_my_group").textContent = strGroup;

    return 0;

    //������֯�������û�����
    fn_UQueryAll();
    fn_GQueryAll();
    return 0;
}
//--------------------------------------------------------------------------------
//      �յ���ʱ��Ϣָʾ
//  ����:
//      pucSn:          ���?
//      dwType:         ��ʱ��Ϣ����
//      pcFrom:         Դ����
//      pcFromName:     Դ����
//      pcTo:           Ŀ�ĺ���,#+����:��ʾ�������?
//      pcOriTo:        ԭʼĿ�ĺ���
//      pcTxt:          �ı�����
//      pcFileName:     �ļ���
//      pcSourceFileName:Դ�ļ���
//      pcTime:         ���͵�ʱ��
//  ����:
//      0:              �ɹ�
//      -1:             ʧ��
//--------------------------------------------------------------------------------
function onIMRecv(pucSn, dwType, pcFrom, pcFromName, pcTo, pcOriTo, pcTxt, pcFileName, pcSourceFileName, pcTime) {
    PUtility.Log("IDTUser", PUtility.PGetCurTime(), "onIMRecv", pucSn, dwType, pcFrom, pcFromName, pcTo, pcOriTo, pcTxt, pcFileName, pcSourceFileName, pcTime);
    return 0;
}
//--------------------------------------------------------------------------------
//      IM״ָ̬ʾ
//  ����:
//      dwSn:           ��Ϣ�����?
//      pucSn:          ϵͳ�������?
//      dwType:         ��ʱ��Ϣ����
//      ucStatus:       ״̬,PTE_CODE_TXCFM
//  ����:
//      0:              �ɹ�
//      -1:             ʧ��
//--------------------------------------------------------------------------------
function onIMStatusInd(dwSn, pucSn, dwType, ucStatus) {
    //PTE_CODE_TXCFM=2
    PUtility.Log("IDTUser", PUtility.PGetCurTime(), "onIMStatusInd", dwSn, pucSn, dwType, ucStatus);
    return 0;
}

//--------------------------------------------------------------------------------
//      ��/�û�OAM����ָʾ
//  ����:
//      dwOptCode:      ������
//                      OPT_USER_ADD        pucUNum,pucUName,ucUAttr��Ч
//                      OPT_USER_DEL        pucUNum��Ч
//                      OPT_USER_MODIFY     pucUNum,pucUName,ucUAttr��Ч
//                      OPT_G_ADD           pucGNum,pucGName��Ч
//                      OPT_G_DEL           pucGNum��Ч
//                      OPT_G_MODIFY        pucGNum,pucGName��Ч
//                      OPT_G_ADDUSER       pucGNum,pucUNum,pucUName,ucUAttr��Ч
//                      OPT_G_DELUSER       pucGNum,pucUNum��Ч
//                      OPT_G_MODIFYUSER    pucGNum,pucUNum,pucUName,ucUAttr��Ч
//      pucGNum:        �����?
//      pucGName:       ������
//      pucUNum:        �û�����
//      pucUName:       �û�����
//      ucUAttr:        �û�����
//  ����:
//      0:              �ɹ�
//      -1:             ʧ��
//--------------------------------------------------------------------------------
function onGUOamInd(dwOptCode, pucGNum, pucGName, pucUNum, pucUName, ucUAttr) {
    return 0;
}
//--------------------------------------------------------------------------------
//      ��/�û�״ָ̬ʾ
//  ����:
//      GMemberStatus   ��/�û�״̬Json����
//[{��}, {��}, {��}, {��}, {��}, {��}, {��}, {��}, {��}, {��}, {��}, {��}, {��}, {��}, {��}, {��}]
//{
//  Type: 2,                GROUP_MEMBERTYPE_USER(1)    GROUP_MEMBERTYPE_GROUP(2)
//  Num: "1115",            �ַ���
//  Status: 1,              UT_STATUS_OFFLINE(0)        UT_STATUS_ONLINE(1)
//  GpsReport: 0,           ��ʱ��ʹ��.�Ƿ������ϱ�GPS,0δ�ϱ�,1�����ϱ�
//  CallNum: 0,             ���и���
//      []                  ��������
//      CallType :%d,       SRV_TYPE_BASIC_CALL
//      CallStatus:%d,      GU_STATUSCALL_OALERT
//      CallId:%d,          CSAID���ڲ�ʹ�ã����Բ�����
//      PeerNum:%s,         �Զ˺���
//      PeerName\":\"%s\"}  �Զ�����
//  ����:
//      0:              �ɹ�
//      -1:             ʧ��
//--------------------------------------------------------------------------------
function onGUStatusInd(GMemberStatus) {
    PUtility.Log("IDTUser", PUtility.PGetCurTime(), "onGUStatusInd", GMemberStatus);
    return 0;
}

//--------------------------------------------------------------------------------
//      GPS����ָʾ,��������û���GPS��¼
//  ����:
//      GpsRecStr:      GPS��¼��Ϣ,Json��ʽ
//  Num:    "986001",
//  Status: 1   //��ʹ��
//  Count   1   //GpsInfo�������?
//  GpsInfo:
//  [
//      {Longitude:"113.943718", Latitude:"22.543962", Speed:"0.000000", Direction:"0.000000", Time:"2017-11-11 16:59:59"}
//  ]
//  ����:
//      0:              �ɹ�
//      -1:             ʧ��
//--------------------------------------------------------------------------------
function onGpsRecInd(GpsRecStr) {
    PUtility.Log("IDTUser", PUtility.PGetCurTime(), "onGpsRecInd", GpsRecStr);
    return 0;
}

//--------------------------------------------------------------------------------
//      GPS��ʷ����ָʾ
//  ����:
//      UsrNum:         �û�����
//      sn:             �������?
//      EndFlag:        ������־,0δ����,1����
//      GpsRecStr:      GPS��¼��Ϣ,Json��ʽ
//  Num:    "986001",
//  Status: 1   //��ʹ��
//  Count   1   //GpsInfo�������?
//  GpsInfo:
//  [
//      {Longitude:"113.943718", Latitude:"22.543962", Speed:"0.000000", Direction:"0.000000", Time:"2017-11-11 16:59:59"}
//  ]
//  ����:
//      0:              �ɹ�
//      -1:             ʧ��
//--------------------------------------------------------------------------------
function onGpsHisQueryInd(UsrNum, sn, EndFlag, GpsRecStr) {
    //986001,0,2017-11-11 00:00:00,2017-11-11 23:59:59
    PUtility.Log("IDTUser", PUtility.PGetCurTime(), "onGpsHisQueryInd", UsrNum, sn, EndFlag, GpsRecStr);
    return 0;
}

var m_CallId = -1,
    m_CallRef, m_ARx = 0,
    m_ATx = 0,
    m_VRx = 0,
    m_VTx = 0;
//--------------------------------------------------------------------------------
//      ������Ϣָʾ
//  ����:
//      event:          �¼�
//          IDT.CALL_EVENT_Rel:             event, UsrCtx, ID(IDT�ĺ���ID), ucClose(IDT.CLOSE_BYUSER), usCause(IDT.CAUSE_ZERO)
//          IDT.CALL_EVENT_PeerAnswer:      event, UsrCtx, PeerNum, PeerName, SrvType(�����뷢��ʱ��ͬ.�����뷢�����?(����),������������)
//          IDT.CALL_EVENT_In:              event, ID(��ʱ��IDT�ĺ���ID,�����û�������), pcPeerNum, pcPeerName, SrvType, bIsGCall, ARx, ATx, VRx, VTx
//          IDT.CALL_EVENT_MicInd:          event, UsrCtx, ind(0����,1����)
//          IDT.CALL_EVENT_RecvInfo:        event, UsrCtx, Info, InfoStr
//          IDT.CALL_EVENT_TalkingIDInd:    event, UsrCtx, TalkingNum, TalkingName
//          IDT.CALL_EVENT_ConfCtrlInd:     event, UsrCtx, Info{Info(IDT.SRV_INFO_MICREL), InfoStr}, UsrNum, UsrName
//          IDT.CALL_EVENT_ConfStatusRsp:   event, UsrCtx(��Ч), MsgBody
//  ����:
//      0:              �ɹ�
//      -1:             ʧ��
//--------------------------------------------------------------------------------
function onCallInd(event) {
    var params = arguments.length;

    switch (event) {
        case IDT.CALL_EVENT_Rel: //event, UsrCtx, ID(IDT�ĺ���ID), ucClose(IDT.CLOSE_BYUSER), usCause(IDT.CAUSE_ZERO)
            if (params < 6)
                return -1;
            PUtility.Log("IDTUser", PUtility.PGetCurTime(), "CALL_EVENT_Rel", event, arguments[1], arguments[2], arguments[3], IDT.GetCauseStr(arguments[4]));
            var calltime = '';
            // calltime += "~";
            // calltime += PUtility.PGetCurTime();
            // calltime += "  ";
            calltime += IDT.GetCloseStr(arguments[3]);
            calltime += ":";
            calltime += IDT.GetCauseStr(arguments[4]);
            calltime += ":";
            calltime += arguments[5];
            window.console.log(calltime);
            sessionStorage.setItem('message', calltime)

            // var callinfo = document.getElementById("id_call_info");
            // callinfo = '����ָʾ:';
            // var callinfo = document.getElementById("id_call_talkinfo");
            // callinfo = '������:';

            m_CallId = -1;
            break;

        case IDT.CALL_EVENT_PeerAnswer: //event, UsrCtx, PeerNum, PeerName, SrvType(�����뷢��ʱ��ͬ.�����뷢�����?(����),������������), UserMark, UserCallRef
            if (params < 5)
                return -1;
            m_CallRef = arguments[2];
            PUtility.Log("IDTUser", PUtility.PGetCurTime(), "CALL_EVENT_PeerAnswer", event, arguments[1], arguments[2], arguments[3], arguments[4], arguments[5], arguments[6]);
            //m_IdtApi.CallConfCtrlReq(m_CallId, null, IDT.SRV_INFO_AUTOMICON, 1);//0��̨�ϻ�Ȩ,1��̨�»�Ȩ.���ɷ���ֻ����?�»�Ȩ        
            break;

        case IDT.CALL_EVENT_In: //event, ID(��ʱ��IDT�ĺ���ID,�����û�������), pcPeerNum, pcPeerName, SrvType, bIsGCall, ARx, ATx, VRx, VTx, UserMark, UserCallRef
            if (params < 10)
                return -1;
            //��ʱUsrCtx��IDT��callid,ͬCallMakeOut�ķ���ֵ
            PUtility.Log("IDTUser", PUtility.PGetCurTime(), "CALL_EVENT_In", event, arguments[1], arguments[2], arguments[3], arguments[4],
                arguments[5], arguments[6], arguments[7], arguments[8], arguments[9], arguments[10], arguments[11]);
            var calltime = document.getElementById("id_call_time");
            calltime.textContent = arguments[2] + '(' + arguments[3] + ')�����?-ý������(' + arguments[6] + arguments[7] + arguments[8] + arguments[9] + ')';
            m_CallId = arguments[1];
            m_ARx = arguments[6];
            m_ATx = arguments[7];
            m_VRx = arguments[8];
            m_VTx = arguments[9];

            if (IDT.SRV_TYPE_CONF == arguments[4] && true == arguments[5]) //�����?
            {
                fn_answer();
                // var callinfo = document.getElementById("id_call_info");
                // callinfo.textContent = '����ָʾ:0';
            }
            break;

        case IDT.CALL_EVENT_MicInd: //event, UsrCtx, ind(0����,1����)
            if (params < 3)
                return -1;
            // var callinfo = document.getElementById("id_call_info");
            // callinfo.textContent = '����ָʾ:' + arguments[2];
            break;

        case IDT.CALL_EVENT_RecvInfo: //event, UsrCtx, Info, InfoStr
            if (params < 4)
                return -1;
            // var callinfo = document.getElementById("id_call_info");
            // callinfo.textContent = '��Ϣ��:' + arguments[2] + ':' + arguments[3];
            break;

        case IDT.CALL_EVENT_TalkingIDInd: //event, UsrCtx, TalkingNum, TalkingName
            if (params < 4)
                return -1;
            // var callinfo = document.getElementById("id_call_talkinfo");
            // callinfo.textContent = '������' + arguments[2] + ':' + arguments[3];
            break;

        case IDT.CALL_EVENT_ConfCtrlInd: //event, UsrCtx, Info{Info(IDT.SRV_INFO_MICREL), InfoStr}
            if (params < 3)
                return -1;
            PUtility.Log("IDTUser", PUtility.PGetCurTime(), "CALL_EVENT_ConfCtrlInd", event, arguments[1], arguments[2]);
            break;

        case IDT.CALL_EVENT_ConfStatusRsp: //event, UsrCtx(��Ч), MsgBody
            if (params < 3)
                return -1;
            PUtility.Log("IDTUser", PUtility.PGetCurTime(), "CALL_EVENT_ConfStatusRsp", event, arguments[1], arguments[2]);
            break;

        default:
            break;
    }
    return 0;
}


var m_IdtApi = null;
// ����
function fn_Start(id, psWord) {
    if (null == m_IdtApi) {
        // m_IdtApi = new CIdtApi();
        if(typeof CIdtApi!=="undefined") {
			m_IdtApi = new CIdtApi();
		}
		else {
			m_IdtApi = require('./talkback/IdtApiAll.js');
			if(m_IdtApi) {
				m_IdtApi = new m_IdtApi();
			}
		}
    }
    m_IdtApi.RUN_MODE = 0;

    //var strSrvUrl = "wss://124.160.11.21:8801/mc_wss";
    //var strGpsSrvUrl = "wss://124.160.11.21:8801/gs_wss";
    var strSrvUrl = "ws://124.160.11.21:10004";
    var strGpsSrvUrl = "ws://124.160.11.21:10005";
    var strUserId = id;
    var strPwd = psWord;
    var CallBack = {
        onRecvMsgHook: onRecvMsgHook, //�յ���Ϣ�Ĺ��Ӻ���,ֻ�������Դ�ӡ,����޸����?����,�������?
        onSendMsgHook: onSendMsgHook, //������Ϣ�Ĺ��Ӻ���,ֻ�������Դ�ӡ,����޸����?����,�������?
        onStatusInd: onStatusInd, //��¼״ָ̬ʾ
        onGInfoInd: onGInfoInd, //����Ϣָʾ,ָʾ�û�����Щ������
        onIMRecv: onIMRecv, //���Ž���ָʾ
        onIMStatusInd: onIMStatusInd, //����״ָ̬ʾ
        onGUOamInd: onGUOamInd, //�û�/��OAM����ָʾ
        onGUStatusInd: onGUStatusInd, //�û�/��״ָ̬ʾ
        onGpsRecInd: onGpsRecInd, //GPS����ָʾ
        onGpsHisQueryInd: onGpsHisQueryInd, //GPS��ʷ���ݲ�ѯ��Ӧ
        onCallInd: onCallInd //����ָʾ
    };

    var bIsIe = false;
    // if ("IE" == myBrowser()) {
    //     bIsIe = true;
    // }
    m_IdtApi.Start(strSrvUrl, strGpsSrvUrl, strUserId, strPwd, 32, 32, 1, 4096, CallBack, bIsIe);
}

// �˳�
function fn_Exit() {
    m_IdtApi.Exit();
    m_IdtApi = null;
}

//bRes:     �Ƿ�����ɹ�?,falseʧ��,true�ɹ�
//cause:    ����ԭ��ֵ,IDT.CAUSE_ZERO��
//strCause: �����ַ���
//MsgBody:  ����������Ϣ,Json����
//UserSn:   �û�����ʱ����SN
function fn_OamCallBack(bRes, cause, strCause, MsgBody, UserSn) {
    var xx = 0;

    //    switch (MsgBody.OpCode)
    //    {
    //    case IDT.OPT_R_QUERY://·�ɲ�ѯ
    //        //������
    //        if (1 == MsgBody.CommQuery.EndFlag)
    //        {
    //            break;
    //        }
    //        break;
    //    default:
    //        break;
    //    }

    return 0;
}

function fn_OamCallBack_UQueryAll(bRes, cause, strCause, MsgBody) {
    if (true == PUtility.isEmpty(MsgBody)) {
        return 0;
    }
    var i;
    for (i = 0; i < MsgBody.GNumU; i++) {
        m_IdtApi.GpsSubs(MsgBody.GMember[i].Num, IDT.GU_STATUSSUBS_DETAIL1);
        //m_IdtApi.GpsSubs(MsgBody.GMember[i].Num, IDT.GU_STATUSSUBS_QUERY_ONETIME);
    }

    if (MsgBody.GNumU < 1024) //��ѯ���?
        return 0;
    //if (MsgBody.QueryExt.Page * MsgBody.QueryExt.Count )

    var query = {
        GNum: MsgBody.GNum,
        QueryExt: {
            All: 1,
            Group: 0,
            User: 1,
            Order: 0,
            Page: MsgBody.QueryExt.Page + 1,
            Count: 1024,
            TotalCount: 0
        }
    };

    m_IdtApi.GQueryU(query, fn_OamCallBack_UQueryAll);
    return 0;
}

function fn_ReadGps() {
    var strTo = document.getElementById("id_msmgr_num").value;
    var strFrom = document.getElementById("id_my_num").value;
    var strText = '{"fromDesc":"';
    strText += strFrom;
    strText += '",fromNumber":"';
    strText += strFrom;
    strText += '","messageId":"2018-03-13","subPara":"{\\\"type\\\":0}","toDesc":"'; //0:��ѯ 1:��ѯ��Ӧ 2.���� 3������Ӧ
    strText += strTo;
    strText += '","toNumber":"';
    strText += strTo;
    strText += '","type":1}'; //0:����������?  1:��ʾ�ն�Gps�������?  2:��Ƶ��������  3.�û�ͷ������Ըı�? 4.��Ƶת�� 6.��ʾsos��Ϣ

    m_IdtApi.IMSend(300, IDT.IM_TYPE_CONF, strTo, strText, null, null);
}

function fn_SetGps() {
    var strTo = document.getElementById("id_msmgr_num").value;
    var strFrom = document.getElementById("id_my_num").value;
    var strText = '{"fromDesc":"';
    strText += strFrom;
    strText += '",fromNumber":"';
    strText += strFrom;
    strText += '","messageId":"2018-03-13","subPara":"{\\\"open\\\":true,\\\"type\\\":2}","toDesc":"'; //0:��ѯ 1:��ѯ��Ӧ 2.���� 3������Ӧ
    strText += strTo;
    strText += '","toNumber":"';
    strText += strTo;
    strText += '","type":1}'; //0:����������?  1:��ʾ�ն�Gps�������?  2:��Ƶ��������  3.�û�ͷ������Ըı�? 4.��Ƶת�� 6.��ʾsos��Ϣ

    m_IdtApi.IMSend(300, IDT.IM_TYPE_CONF, strTo, strText, null, null);
}

function fn_ReadVideoParam() {
    var strTo = document.getElementById("id_msmgr_num").value;
    var strFrom = document.getElementById("id_my_num").value;
    var strText = '{"fromDesc":"';
    strText += strFrom;
    strText += '",fromNumber":"';
    strText += strFrom;
    strText += '","messageId":"2018-03-13","subPara":"{\\\"type\\\":0}","toDesc":"'; //0:��ѯ 1:��ѯ��Ӧ 2.���� 3������Ӧ
    strText += strTo;
    strText += '","toNumber":"';
    strText += strTo;
    strText += '","type":2}'; //0:����������?  1:��ʾ�ն�Gps�������?  2:��Ƶ��������  3.�û�ͷ������Ըı�? 4.��Ƶת�� 6.��ʾsos��Ϣ

    m_IdtApi.IMSend(300, IDT.IM_TYPE_CONF, strTo, strText, null, null);
}

function fn_SetVideoParam() {
    var strTo = document.getElementById("id_msmgr_num").value;
    var strFrom = document.getElementById("id_my_num").value;
    var strText = '{"fromDesc":"';
    strText += strFrom;
    strText += '",fromNumber":"';
    strText += strFrom;
    strText += '","messageId":"2018-03-13","subPara":"{';
    strText += '\\\"type\\\":2,\\\"bitrate\\\":2200,\\\"framerate\\\":25,\\\"resolution\\\":\\\"1920*1080\\\",'; //0:��ѯ 1:��ѯ��Ӧ 2.���� 3������Ӧ
    strText += '\\\"videoPara\\\":{\\\"maxBitrate\\\":3000,\\\"maxFramerate\\\":30,\\\"minBitrate\\\":300,\\\"minFramerate\\\":5,\\\"resolutionList\\\":[\\\"320*240\\\",\\\"640*480\\\",\\\"1280*720\\\",\\\"1920*1080\\\",\\\"480*720\\\"]}';
    strText += '}","toDesc":"';
    strText += strTo;
    strText += '","toNumber":"';
    strText += strTo;
    strText += '","type":2}'; //0:����������?  1:��ʾ�ն�Gps�������?  2:��Ƶ��������  3.�û�ͷ������Ըı�? 4.��Ƶת�� 6.��ʾsos��Ϣ

    m_IdtApi.IMSend(300, IDT.IM_TYPE_CONF, strTo, strText, null, null);
}

function fn_TransVideo() {
    var strTo = document.getElementById("id_msmgr_num").value;
    var strFrom = document.getElementById("id_my_num").value;
    var strWatchDown = document.getElementById("id_watchdown_num").value;

    //���͸�strTo,��strTo�鿴strWatchDown����Ƶ
    var strText = '{"fromDesc":"';
    strText += strFrom;
    strText += '","fromNumber":"';
    strText += strFrom;
    strText += '","messageId":"2018-03-13","subPara":"{';
    strText += '\\\"toNum\\\":\\\"';
    strText += strWatchDown;
    strText += '\\\",\\\"toNumDesc\\\":\\\"';
    strText += strWatchDown;
    strText += '\\\",\\\"type\\\":2,\\\"userList\\\":[]'; //0:��ѯ 1:��ѯ��Ӧ 2.���� 3������Ӧ
    strText += '}","toDesc":"';
    strText += strTo;
    strText += '","toNumber":"';
    strText += strTo;
    strText += '","type":4}'; //0:����������?  1:��ʾ�ն�Gps�������?  2:��Ƶ��������  3.�û�ͷ������Ըı�? 4.��Ƶת�� 6.��ʾsos��Ϣ

    m_IdtApi.IMSend(300, IDT.IM_TYPE_CONF, strTo, strText, null, null);
}

function fn_ScreenVideo() {
    var strTo = document.getElementById("id_msmgr_num").value;
    var strFrom = document.getElementById("id_my_num").value;

    //���͸�strTo,��strTo�鿴strWatchDown����Ƶ
    var strText = '{"fromDesc":"';
    strText += strFrom;
    strText += '","fromNumber":"';
    strText += strFrom;
    strText += '","messageId":"2018-03-13","subPara":"{';
    strText += '\\\"messageId\\\":1533720661900,';
    strText += '\\\"type\\\":1}","toDesc":"';
    strText += strTo;
    strText += '","toNumber":"';
    strText += strTo;
    strText += '","type":7}';

    m_IdtApi.IMSend(300, IDT.IM_TYPE_CONF, strTo, strText, null, null);
}


//��ѯ��֯
function fn_OQuery() {
    var strNum = document.getElementById("id_org_num").value;

    m_IdtApi.OQuery(strNum, fn_OamCallBack);
}

//��ѯ�����û�
function fn_UQueryAll() {
    var strGNum = '0';
    var iGroup = 0;
    var iUser = 1;
    var iPage = 0;

    //      pucGNum:        �����?
    //      ucGroup:        �Ƿ���?������,0����ѯ,1��ѯ
    //      ucUser:         �Ƿ���?�����û�,0����ѯ,1��ѯ
    //      dwPage:         �ڼ�ҳ,��0��ʼ.Ĭ��ÿҳ1024���û�,�������?1024���û�,˵����ѯ����

    var query = {
        GNum: strGNum,
        QueryExt: {
            All: 1,
            Group: iGroup,
            User: iUser,
            Order: 0,
            Page: iPage,
            Count: 1024,
            TotalCount: 0
        }
    };

    m_IdtApi.GQueryU(query, fn_OamCallBack_UQueryAll);
}

//��ѯ�����������û�
function fn_UQueryAllZone() {
    var strGNum = document.getElementById("id_zone_num_query_all").value;
    var iGroup = 0;
    var iUser = 1;
    var iPage = 0;

    //      pucGNum:        �����?
    //      ucGroup:        �Ƿ���?������,0����ѯ,1��ѯ
    //      ucUser:         �Ƿ���?�����û�,0����ѯ,1��ѯ
    //      dwPage:         �ڼ�ҳ,��0��ʼ.Ĭ��ÿҳ1024���û�,�������?1024���û�,˵����ѯ����

    var query = {
        GNum: strGNum,
        QueryExt: {
            All: 1,
            Group: iGroup,
            User: iUser,
            Order: 0,
            Page: iPage,
            Count: 1024,
            TotalCount: 0
        }
    };

    m_IdtApi.GQueryU(query, fn_OamCallBack_UQueryAll);
}

//��ѯ�û�
function fn_UQuery() {
    var strNum = document.getElementById("id_user_num").value;

    m_IdtApi.UQuery(strNum, fn_OamCallBack);
}

//��ѯ������
function fn_GQueryAll() {
    var strGNum = '0';
    var iGroup = 1;
    var iUser = 0;
    var iPage = 0;

    //      pucGNum:        �����?
    //      ucGroup:        �Ƿ���?������,0����ѯ,1��ѯ
    //      ucUser:         �Ƿ���?�����û�,0����ѯ,1��ѯ
    //      dwPage:         �ڼ�ҳ,��0��ʼ.Ĭ��ÿҳ1024���û�,�������?1024���û�,˵����ѯ����

    var query = {
        GNum: strGNum,
        QueryExt: {
            All: 1,
            Group: iGroup,
            User: iUser,
            Order: 0,
            Page: iPage,
            Count: 1024,
            TotalCount: 0
        }
    };

    m_IdtApi.GQueryU(query, fn_OamCallBack);
}

//��ѯ��
function fn_GQuery() {
    var strGNum = document.getElementById("id_group_num").value;

    m_IdtApi.GQuery(strGNum, fn_OamCallBack);
}

//��ѯ�����û�
function fn_GQueryU() {
    var strGNum = document.getElementById("id_group_num").value;
    var iGroup = Number(document.getElementById("id_all_group").value);
    var iUser = Number(document.getElementById("id_all_user").value);
    var iPage = Number(document.getElementById("id_page_index").value);

    //      pucGNum:        �����?
    //      ucGroup:        �Ƿ���?������,0����ѯ,1��ѯ
    //      ucUser:         �Ƿ���?�����û�,0����ѯ,1��ѯ
    //      dwPage:         �ڼ�ҳ,��0��ʼ.Ĭ��ÿҳ1024���û�,�������?1024���û�,˵����ѯ����

    var query = {
        GNum: strGNum,
        QueryExt: {
            All: 1,
            Group: iGroup,
            User: iUser,
            Order: 0,
            Page: iPage,
            Count: 1024,
            TotalCount: 0
        }
    };

    m_IdtApi.GQueryU(query, fn_OamCallBack);
}

//��ѯ�û���������Ϣ
function fn_UQueryG() {
    var strUNum = document.getElementById("id_group_unum").value;
    m_IdtApi.UQueryG(strUNum, fn_OamCallBack);
}

function fn_gps_subs() {
    var info = document.getElementById("id_gps_param_subs").value.split(",");
    m_IdtApi.GpsSubs(info[0], IDT.GU_STATUSSUBS_DETAIL1);
}

function fn_gps_report() {
    //����,����,γ��,�ٶ�,����
    //ʱ��ȡ��ǰʱ��
    var info = document.getElementById("id_gps_param_report").value.split(",");

    var date = new Date();
    var seperator1 = "-";
    var seperator2 = ":";
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var str = date.getFullYear() + seperator1 + month + seperator1 + strDate +
        " " + date.getHours() + seperator2 + date.getMinutes() +
        seperator2 + date.getSeconds();

    m_IdtApi.GpsReport(info[0], info[1], info[2], info[3], info[4], str);
}

function fn_gps_hisquery() {
    //����,SN,��ʼʱ��,����ʱ��
    var info = document.getElementById("id_gps_param_his").value.split(",");
    m_IdtApi.GpsHisQuery(info[0], 0, info[1], info[2]);
}


//���Ͷ���
function fn_IMSend() {
    var strTo = document.getElementById("id_peer_num").value;
    var strTxt = document.getElementById("id_im_msg").value;
    var iType = Number(document.getElementById("id_im_type").value);

    var strFileName = null;
    var strSourceFileName = null;
    //m_IdtApi.IMSend(300, IDT.IM_TYPE_TXT, strTo, strTxt, strFileName, strSourceFileName);
    m_IdtApi.IMSend(300, iType, strTo, strTxt, strFileName, strSourceFileName);
}

var m_bAutoMic = false;

function fn_callout(id) {
    var strTo = id;
    var ARx = 1;
    var ATx = 1;
    var VRx = 0;
    var VTx = 0;
    id_video_my = document.getElementById('id_video_my_v')
    id_video_peer = document.getElementById('id_video_peer_v')
    m_CallId = m_IdtApi.CallMakeOut(100, id_video_my, id_video_peer, ARx, ATx, VRx, VTx, strTo, IDT.SRV_TYPE_BASIC_CALL, "", 1, 0, "UserMark12345");
    // var calltime = document.getElementById("id_call_time");
    // calltime = PUtility.PGetCurTime();
    m_bAutoMic = false;
    // var callinfo = document.getElementById("id_call_info");
    // callinfo.textContent = '����ָʾ:';
    // var callinfo = document.getElementById("id_call_talkinfo");
    // callinfo.textContent = '������:';
}

function fn_rel() {
    if (-1 == m_CallId)
        return;

    var usCause = 1;

    m_IdtApi.CallRel(m_CallId, 100, usCause);
    m_CallId = -1;

    // var calltime = document.getElementById("id_call_time");
    // calltime.textContent += "~";
    // calltime.textContent += PUtility.PGetCurTime();
    // calltime.textContent += "  ";
    // calltime.textContent += IDT.GetCloseStr(IDT.CLOSE_BYUSER);
    // calltime.textContent += ":";
    // calltime.textContent += IDT.GetCauseStr(usCause);

    // var callinfo = document.getElementById("id_call_info");
    // callinfo.textContent = '����ָʾ:';
    // var callinfo = document.getElementById("id_call_talkinfo");
    // callinfo.textContent = '������:';

    m_bAutoMic = false;
}

function fn_sendnum() {
    if (-1 == m_CallId)
        return;

    var strTo = document.getElementById("id_peer_num").value;

    m_IdtApi.CallSendInfo(m_CallId, IDT.SRV_INFO_NUM, strTo, null);
}

function fn_answer() {
    m_IdtApi.CallAnswer(m_CallId, 100, id_video_my, id_video_peer, m_ARx, m_ATx, m_VRx, m_VTx);

    var calltime = document.getElementById("id_call_time");
    calltime.textContent = PUtility.PGetCurTime();
}

function fn_watch_down() {
    var strTo = document.getElementById("id_peer_num").value;
    var ARx = Number(document.getElementById("id_a_rx").value);
    var VRx = Number(document.getElementById("id_v_rx").value);

    m_CallId = m_IdtApi.CallMakeOut(100, null, id_video_peer, ARx, 0, VRx, 0, strTo, IDT.SRV_TYPE_WATCH_DOWN, "", 1, 0);
    var calltime = document.getElementById("id_call_time");
    calltime.textContent = PUtility.PGetCurTime();

    var callinfo = document.getElementById("id_call_info");
    callinfo.textContent = '����ָʾ:';
    var callinfo = document.getElementById("id_call_talkinfo");
    callinfo.textContent = '������:';

    //m_IdtApi.CallSetPeerVolume(m_CallId, 1.0);
}


function fn_watch_up() {
    var strTo = document.getElementById("id_peer_num").value;
    var ATx = Number(document.getElementById("id_a_tx").value);
    var VTx = Number(document.getElementById("id_v_tx").value);

    m_CallId = m_IdtApi.CallMakeOut(100, id_video_my, id_video_peer, 0, ATx, 0, VTx, strTo, IDT.SRV_TYPE_WATCH_UP, "", 1, 0);
    var calltime = document.getElementById("id_call_time");
    calltime.textContent = PUtility.PGetCurTime();

    var callinfo = document.getElementById("id_call_info");
    callinfo.textContent = '����ָʾ:';
    var callinfo = document.getElementById("id_call_talkinfo");
    callinfo.textContent = '������:';
}

function fn_peer_volume() {
    var volume = document.getElementById("peer_volume").value;

    m_IdtApi.CallSetPeerVolume(m_CallId, volume);
}

function fn_gcallout() {
    var strTo = document.getElementById("id_conf_num").value;
    m_CallId = m_IdtApi.CallMakeOut(100, id_video_my, id_video_peer, 0, 1, 0, 0, strTo, IDT.SRV_TYPE_CONF, "", 1, 0);
    var calltime = document.getElementById("id_call_time");
    calltime.textContent = PUtility.PGetCurTime();
    m_bAutoMic = false;

    var callinfo = document.getElementById("id_call_info");
    callinfo.textContent = '����ָʾ:';
    var callinfo = document.getElementById("id_call_talkinfo");
    callinfo.textContent = '������:';
}

function fn_broadcast() {
    var strTo = document.getElementById("id_conf_num").value;
    m_CallId = m_IdtApi.CallMakeOut(100, id_video_my, id_video_peer, 0, 1, 0, 0, strTo, IDT.SRV_TYPE_CONF, "", 1, 0, "", 0);
    var calltime = document.getElementById("id_call_time");
    calltime.textContent = PUtility.PGetCurTime();
    m_bAutoMic = false;

    var callinfo = document.getElementById("id_call_info");
    callinfo.textContent = '����ָʾ:';
    var callinfo = document.getElementById("id_call_talkinfo");
    callinfo.textContent = '������:';
}

function fn_micwant() {
    m_IdtApi.CallMicCtrl(m_CallId, true);
}

function fn_micrel() {
    m_IdtApi.CallMicCtrl(m_CallId, false);
}

function fn_ccallout() {
    var strTo = document.getElementById("id_conf_num").value;
    var iCallOutType = Number(document.getElementById("id_ccallout_type").value);;
    m_CallId = m_IdtApi.CallMakeOut(100, id_video_my, id_video_peer, 1, 1, 1, 1, strTo, IDT.SRV_TYPE_CONF, "", iCallOutType, 0);
    var calltime = document.getElementById("id_call_time");
    calltime.textContent = PUtility.PGetCurTime();
    m_bAutoMic = false;

    var callinfo = document.getElementById("id_call_info");
    callinfo.textContent = '����ָʾ:';
    var callinfo = document.getElementById("id_call_talkinfo");
    callinfo.textContent = '������:';
}

function fn_ccall_url() {
    var strTo = document.getElementById("id_conf_num").value;
    var strFrom = document.getElementById("id_my_num").value;
    var strText = '{"fromDesc":';
    strText += '"' + strFrom + '","fromNumber":';
    strText += '"' + strFrom + '","subPara":"{\\\"accept\\\":false,\\\"content\\\":\\\"���鿪ʼ֪ͨ, �������\\\",\\\"desc\\\":\\\"����Ա���������?:\\\",\\\"meetId\\\":\\\"';
    strText += strTo;
    strText += '\\\",\\\"number\\\":\\\"';
    strText += strTo;
    strText += '\\\",\\\"time\\\":\\\"1970-01-01 08:00:00\\\",\\\"title\\\":\\\"\\\",\\\"type\\\":2}","toDesc":"","toNumber":"';
    strText += strTo;
    strText += '","type":0}';
    m_IdtApi.IMSend(300, IDT.IM_TYPE_CONF, strTo, strText, null, null);
}

function fn_ccall_add() {
    var strTo = document.getElementById("id_peer_num").value;
    m_IdtApi.CallUserCtrl(m_CallRef, strTo, 1, 1, 0, 1, 0);
}

function fn_ccall_del() {
    var strTo = document.getElementById("id_peer_num").value;
    m_IdtApi.CallUserCtrl(m_CallRef, strTo, 0, 0, 0, 0, 0);
}

function fn_ccall_dial() {
    var strTo = document.getElementById("id_conf_num").value;
    m_CallId = m_IdtApi.CallMakeOut(100, id_video_my, id_video_peer, 1, 1, 1, 1, strTo, IDT.SRV_TYPE_CONF_JOIN, "", 0, 0);
    var calltime = document.getElementById("id_call_time");
    calltime.textContent = PUtility.PGetCurTime();

    var callinfo = document.getElementById("id_call_info");
    callinfo.textContent = '����ָʾ:';
    var callinfo = document.getElementById("id_call_talkinfo");
    callinfo.textContent = '������:';
}

function fn_ccall_query() {
    //��ѯ�᳡״̬
    var strTo = document.getElementById("id_conf_num").value;
    m_IdtApi.CallConfStatusReq(strTo, 1234);
}

function fn_ccall_talkflag() {
    //���ɷ���
    if (m_bAutoMic) {
        m_IdtApi.CallConfCtrlReq(m_CallId, null, IDT.SRV_INFO_AUTOMICOFF, 1); //0��̨�ϻ�Ȩ,1��̨�»�Ȩ.���ɷ���ֻ����?�»�Ȩ
        m_bAutoMic = false;
    } else {
        m_IdtApi.CallConfCtrlReq(m_CallId, null, IDT.SRV_INFO_AUTOMICON, 1); //0��̨�ϻ�Ȩ,1��̨�»�Ȩ.���ɷ���ֻ����?�»�Ȩ
        m_bAutoMic = true;
    }
}

function fn_ccall_micgive0() {
    //̨�ϻ�Ȩ
    var strTo = document.getElementById("id_ccall_micnum").value;
    m_IdtApi.CallConfCtrlReq(m_CallId, strTo, IDT.SRV_INFO_MICGIVE, 0);
}

function fn_ccall_micgive1() {
    //̨�»�Ȩ
    var strTo = document.getElementById("id_ccall_micnum").value;
    m_IdtApi.CallConfCtrlReq(m_CallId, strTo, IDT.SRV_INFO_MICGIVE, 1);
}

function fn_ccall_mictake() {
    //�ջػ�Ȩ
    var strTo = document.getElementById("id_ccall_micnum").value;
    m_IdtApi.CallConfCtrlReq(m_CallId, strTo, IDT.SRV_INFO_MICTAKE, 0xff);
}

function fn_force_inj() {
    //ǿ��,ǿ��ֻ��ǿ����Ƶ
    var strTo = document.getElementById("id_force_num").value;
    m_CallId = m_IdtApi.CallMakeOut(100, id_video_my, id_video_peer, 1, 1, 0, 0, strTo, IDT.SRV_TYPE_FORCE_INJ, "", 0, 0);
    var calltime = document.getElementById("id_call_time");
    calltime.textContent = PUtility.PGetCurTime();

    var callinfo = document.getElementById("id_call_info");
    callinfo.textContent = '����ָʾ:';
    var callinfo = document.getElementById("id_call_talkinfo");
    callinfo.textContent = '������:';
}

function fn_force_rel() {
    //ǿ��
    var strTo = document.getElementById("id_force_num").value;
    m_IdtApi.ForceRel(strTo);
}

function fn_fullscreen() {
    var strB = myBrowser();
    if ("IE" == strB) {
        id_video_peer.RequestFullScreen();
    } else {
        PUtility.RequestFullScreen(id_video_peer);
    }
}

function fn_MicDetect_CallBack(status) {
    console.log("fn_MicDetect_CallBack:", status);
}


var m_MicDetect = null;

function fn_MicDetect() {
    if (null == m_MicDetect) {
        m_MicDetect = new MicDetect();
    }
    m_MicDetect.Run(-10.0, 2000, fn_MicDetect_CallBack);
}

var m_RecordRTC = null;

function stopRecordingCallback(audioURL) {
    var blob = m_RecordRTC.getBlob();
    var file = new File([blob], '12345.mp4', {
        type: 'audio/mp4'
    });
    invokeSaveAsDialog(file, '12345.mp4');
    m_RecordRTC = null;
}

function fn_startsave() {
    //var options = {
    //    recorderType: MediaStreamRecorder,
    //    mimeType: 'video/webm\;codecs=vp9'
    //};
    m_RecordRTC = RecordRTC(m_IdtApi.CallGetLocalStream(m_CallId), {
        type: 'audio'
    });
    m_RecordRTC.startRecording();
}

function fn_stopsave() {
    m_RecordRTC.stopRecording(stopRecordingCallback);
}

function fn_cam_up() {
    m_IdtApi.CallSendInfo(m_CallId, IDT.SRV_INFO_CAMCTRL, JSON.stringify({
        'CtrlCode': IDT.SRV_CAMCTRL_UP,
        'CtrlValue': Number(document.getElementById("id_cam_value").value)
    }), document.getElementById("id_peer_num").value);
}

function fn_cam_dowm() {
    m_IdtApi.CallSendInfo(m_CallId, IDT.SRV_INFO_CAMCTRL, JSON.stringify({
        'CtrlCode': IDT.SRV_CAMCTRL_DOWN,
        'CtrlValue': Number(document.getElementById("id_cam_value").value)
    }), document.getElementById("id_peer_num").value);
}

function fn_cam_left() {
    m_IdtApi.CallSendInfo(m_CallId, IDT.SRV_INFO_CAMCTRL, JSON.stringify({
        'CtrlCode': IDT.SRV_CAMCTRL_LEFT,
        'CtrlValue': Number(document.getElementById("id_cam_value").value)
    }), document.getElementById("id_peer_num").value);
}

function fn_cam_right() {
    m_IdtApi.CallSendInfo(m_CallId, IDT.SRV_INFO_CAMCTRL, JSON.stringify({
        'CtrlCode': IDT.SRV_CAMCTRL_RIGHT,
        'CtrlValue': Number(document.getElementById("id_cam_value").value)
    }), document.getElementById("id_peer_num").value);
}

function fn_cam_zoomwide() {
    m_IdtApi.CallSendInfo(m_CallId, IDT.SRV_INFO_CAMCTRL, JSON.stringify({
        'CtrlCode': IDT.SRV_CAMCTRL_ZOOMWIDE,
        'CtrlValue': Number(document.getElementById("id_cam_value").value)
    }), document.getElementById("id_peer_num").value);
}

function fn_cam_zoomtele() {
    m_IdtApi.CallSendInfo(m_CallId, IDT.SRV_INFO_CAMCTRL, JSON.stringify({
        'CtrlCode': IDT.SRV_CAMCTRL_ZOOMTELE,
        'CtrlValue': Number(document.getElementById("id_cam_value").value)
    }), document.getElementById("id_peer_num").value);
}

function fn_cam_focusnear() {
    m_IdtApi.CallSendInfo(m_CallId, IDT.SRV_INFO_CAMCTRL, JSON.stringify({
        'CtrlCode': IDT.SRV_CAMCTRL_FOCUSNEAR,
        'CtrlValue': Number(document.getElementById("id_cam_value").value)
    }), document.getElementById("id_peer_num").value);
}

function fn_cam_focusfar() {
    m_IdtApi.CallSendInfo(m_CallId, IDT.SRV_INFO_CAMCTRL, JSON.stringify({
        'CtrlCode': IDT.SRV_CAMCTRL_FOCUSFAR,
        'CtrlValue': Number(document.getElementById("id_cam_value").value)
    }), document.getElementById("id_peer_num").value);
}

function fn_cam_irisopen() {
    m_IdtApi.CallSendInfo(m_CallId, IDT.SRV_INFO_CAMCTRL, JSON.stringify({
        'CtrlCode': IDT.SRV_CAMCTRL_IRISOPEN,
        'CtrlValue': Number(document.getElementById("id_cam_value").value)
    }), document.getElementById("id_peer_num").value);
}

function fn_cam_irisclose() {
    m_IdtApi.CallSendInfo(m_CallId, IDT.SRV_INFO_CAMCTRL, JSON.stringify({
        'CtrlCode': IDT.SRV_CAMCTRL_IRISCLOSE,
        'CtrlValue': Number(document.getElementById("id_cam_value").value)
    }), document.getElementById("id_peer_num").value);
}

function fn_cam_autoscan() {
    m_IdtApi.CallSendInfo(m_CallId, IDT.SRV_INFO_CAMCTRL, JSON.stringify({
        'CtrlCode': IDT.SRV_CAMCTRL_AUTOSCAN,
        'CtrlValue': Number(document.getElementById("id_cam_value").value)
    }), document.getElementById("id_peer_num").value);
}

function fn_cam_criuse() {
    m_IdtApi.CallSendInfo(m_CallId, IDT.SRV_INFO_CAMCTRL, JSON.stringify({
        'CtrlCode': IDT.SRV_CAMCTRL_CRUISE,
        'CtrlValue': Number(document.getElementById("id_cam_value").value)
    }), document.getElementById("id_peer_num").value);
}

function fn_cam_infrared() {
    m_IdtApi.CallSendInfo(m_CallId, IDT.SRV_INFO_CAMCTRL, JSON.stringify({
        'CtrlCode': IDT.SRV_CAMCTRL_INFRARED,
        'CtrlValue': Number(document.getElementById("id_cam_value").value)
    }), document.getElementById("id_peer_num").value);
}

function fn_cam_rainstrip() {
    m_IdtApi.CallSendInfo(m_CallId, IDT.SRV_INFO_CAMCTRL, JSON.stringify({
        'CtrlCode': IDT.SRV_CAMCTRL_RAINSTRIP,
        'CtrlValue': Number(document.getElementById("id_cam_value").value)
    }), document.getElementById("id_peer_num").value);
}

function fn_cam_preset() {
    m_IdtApi.CallSendInfo(m_CallId, IDT.SRV_INFO_CAMCTRL, JSON.stringify({
        'CtrlCode': IDT.SRV_CAMCTRL_PRESET,
        'CtrlValue': Number(document.getElementById("id_cam_value").value)
    }), document.getElementById("id_peer_num").value);
}

function fn_cam_reboot() {
    m_IdtApi.CallSendInfo(m_CallId, IDT.SRV_INFO_CAMCTRL, JSON.stringify({
        'CtrlCode': IDT.SRV_CAMCTRL_REBOOT,
        'CtrlValue': Number(document.getElementById("id_cam_value").value)
    }), document.getElementById("id_peer_num").value);
}

function fn_cam_stop() {
    m_IdtApi.CallSendInfo(m_CallId, IDT.SRV_INFO_CAMCTRL, JSON.stringify({
        'CtrlCode': IDT.SRV_CAMCTRL_STOP,
        'CtrlValue': Number(document.getElementById("id_cam_value").value)
    }), document.getElementById("id_peer_num").value);
}