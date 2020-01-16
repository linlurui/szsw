var PUtility = {};
PUtility.str_utf8_length = function (a) {
  return unescape(encodeURIComponent(a)).length
};
PUtility.isFunction = function (a) {
  if (a !== undefined) {
    return (Object.prototype.toString.call(a) === "[object Function]") ? true : false
  } else {
    return false
  }
};
PUtility.isString = function (a) {
  if (a !== undefined) {
    return (Object.prototype.toString.call(a) === "[object String]") ? true : false
  } else {
    return false
  }
};
PUtility.isDecimal = function (a) {
  return !isNaN(a) && (parseFloat(a) === parseInt(a, 10))
};
PUtility.isEmpty = function (a) {
  if (a === null || a === "" || a === undefined || (Array.isArray(a) && a.length === 0) || (typeof (a) === "number" && isNaN(a))) {
    return true
  }
  return false
};
PUtility.hasMethods = function (c) {
  var b = 1,
    a;
  while ((a = arguments[b++])) {
    if (this.isFunction(c[a])) {
      return false
    }
  }
  return true
};
PUtility.newUUID = function () {
  var a = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (e) {
    var d = Math.random() * 16 | 0,
      b = e === "x" ? d : (d & 3 | 8);
    return b.toString(16)
  });
  return a
};
PUtility.calculateMD5 = function (n) {
  function w(b, a) {
    return (b << a) | (b >>> (32 - a))
  }

  function G(k, b) {
    var V, a, d, x, c;
    d = (k & 2147483648);
    x = (b & 2147483648);
    V = (k & 1073741824);
    a = (b & 1073741824);
    c = (k & 1073741823) + (b & 1073741823);
    if (V & a) {
      return (c ^ 2147483648 ^ d ^ x)
    }
    if (V | a) {
      if (c & 1073741824) {
        return (c ^ 3221225472 ^ d ^ x)
      } else {
        return (c ^ 1073741824 ^ d ^ x)
      }
    } else {
      return (c ^ d ^ x)
    }
  }

  function v(a, c, b) {
    return (a & c) | ((~a) & b)
  }

  function u(a, c, b) {
    return (a & b) | (c & (~b))
  }

  function t(a, c, b) {
    return (a ^ c ^ b)
  }

  function r(a, c, b) {
    return (c ^ (a | (~b)))
  }

  function D(W, V, aa, Z, k, X, Y) {
    W = G(W, G(G(v(V, aa, Z), k), Y));
    return G(w(W, X), V)
  }

  function o(W, V, aa, Z, k, X, Y) {
    W = G(W, G(G(u(V, aa, Z), k), Y));
    return G(w(W, X), V)
  }

  function R(W, V, aa, Z, k, X, Y) {
    W = G(W, G(G(t(V, aa, Z), k), Y));
    return G(w(W, X), V)
  }

  function C(W, V, aa, Z, k, X, Y) {
    W = G(W, G(G(r(V, aa, Z), k), Y));
    return G(w(W, X), V)
  }

  function e(x) {
    var k = x.length;
    var d = k + 8;
    var b = (d - (d % 64)) / 64;
    var W = (b + 1) * 16;
    var Y = new Array(W - 1);
    var a = 0;
    var V = 0;
    while (V < k) {
      var c = (V - (V % 4)) / 4;
      a = (V % 4) * 8;
      Y[c] = (Y[c] | (x.charCodeAt(V) << a));
      V++
    }
    var X = (V - (V % 4)) / 4;
    a = (V % 4) * 8;
    Y[X] = Y[X] | (128 << a);
    Y[W - 2] = k << 3;
    Y[W - 1] = k >>> 29;
    return Y
  }

  function p(d) {
    var a = "",
      b = "",
      k, c;
    for (c = 0; c <= 3; c++) {
      k = (d >>> (c * 8)) & 255;
      b = "0" + k.toString(16);
      a = a + b.substr(b.length - 2, 2)
    }
    return a
  }

  function q(b) {
    b = b.replace(/\r\n/g, "\n");
    var a = "";
    for (var k = 0; k < b.length; k++) {
      var d = b.charCodeAt(k);
      if (d < 128) {
        a += String.fromCharCode(d)
      } else {
        if ((d > 127) && (d < 2048)) {
          a += String.fromCharCode((d >> 6) | 192);
          a += String.fromCharCode((d & 63) | 128)
        } else {
          a += String.fromCharCode((d >> 12) | 224);
          a += String.fromCharCode(((d >> 6) & 63) | 128);
          a += String.fromCharCode((d & 63) | 128)
        }
      }
    }
    return a
  }
  var E = [];
  var K, g, F, s, f, U, T, S, Q;
  var N = 7,
    L = 12,
    I = 17,
    H = 22;
  var B = 5,
    A = 9,
    z = 14,
    y = 20;
  var m = 4,
    l = 11,
    j = 16,
    i = 23;
  var P = 6,
    O = 10,
    M = 15,
    J = 21;
  n = q(n);
  E = e(n);
  U = 1732584193;
  T = 4023233417;
  S = 2562383102;
  Q = 271733878;
  for (K = 0; K < E.length; K += 16) {
    g = U;
    F = T;
    s = S;
    f = Q;
    U = D(U, T, S, Q, E[K + 0], N, 3614090360);
    Q = D(Q, U, T, S, E[K + 1], L, 3905402710);
    S = D(S, Q, U, T, E[K + 2], I, 606105819);
    T = D(T, S, Q, U, E[K + 3], H, 3250441966);
    U = D(U, T, S, Q, E[K + 4], N, 4118548399);
    Q = D(Q, U, T, S, E[K + 5], L, 1200080426);
    S = D(S, Q, U, T, E[K + 6], I, 2821735955);
    T = D(T, S, Q, U, E[K + 7], H, 4249261313);
    U = D(U, T, S, Q, E[K + 8], N, 1770035416);
    Q = D(Q, U, T, S, E[K + 9], L, 2336552879);
    S = D(S, Q, U, T, E[K + 10], I, 4294925233);
    T = D(T, S, Q, U, E[K + 11], H, 2304563134);
    U = D(U, T, S, Q, E[K + 12], N, 1804603682);
    Q = D(Q, U, T, S, E[K + 13], L, 4254626195);
    S = D(S, Q, U, T, E[K + 14], I, 2792965006);
    T = D(T, S, Q, U, E[K + 15], H, 1236535329);
    U = o(U, T, S, Q, E[K + 1], B, 4129170786);
    Q = o(Q, U, T, S, E[K + 6], A, 3225465664);
    S = o(S, Q, U, T, E[K + 11], z, 643717713);
    T = o(T, S, Q, U, E[K + 0], y, 3921069994);
    U = o(U, T, S, Q, E[K + 5], B, 3593408605);
    Q = o(Q, U, T, S, E[K + 10], A, 38016083);
    S = o(S, Q, U, T, E[K + 15], z, 3634488961);
    T = o(T, S, Q, U, E[K + 4], y, 3889429448);
    U = o(U, T, S, Q, E[K + 9], B, 568446438);
    Q = o(Q, U, T, S, E[K + 14], A, 3275163606);
    S = o(S, Q, U, T, E[K + 3], z, 4107603335);
    T = o(T, S, Q, U, E[K + 8], y, 1163531501);
    U = o(U, T, S, Q, E[K + 13], B, 2850285829);
    Q = o(Q, U, T, S, E[K + 2], A, 4243563512);
    S = o(S, Q, U, T, E[K + 7], z, 1735328473);
    T = o(T, S, Q, U, E[K + 12], y, 2368359562);
    U = R(U, T, S, Q, E[K + 5], m, 4294588738);
    Q = R(Q, U, T, S, E[K + 8], l, 2272392833);
    S = R(S, Q, U, T, E[K + 11], j, 1839030562);
    T = R(T, S, Q, U, E[K + 14], i, 4259657740);
    U = R(U, T, S, Q, E[K + 1], m, 2763975236);
    Q = R(Q, U, T, S, E[K + 4], l, 1272893353);
    S = R(S, Q, U, T, E[K + 7], j, 4139469664);
    T = R(T, S, Q, U, E[K + 10], i, 3200236656);
    U = R(U, T, S, Q, E[K + 13], m, 681279174);
    Q = R(Q, U, T, S, E[K + 0], l, 3936430074);
    S = R(S, Q, U, T, E[K + 3], j, 3572445317);
    T = R(T, S, Q, U, E[K + 6], i, 76029189);
    U = R(U, T, S, Q, E[K + 9], m, 3654602809);
    Q = R(Q, U, T, S, E[K + 12], l, 3873151461);
    S = R(S, Q, U, T, E[K + 15], j, 530742520);
    T = R(T, S, Q, U, E[K + 2], i, 3299628645);
    U = C(U, T, S, Q, E[K + 0], P, 4096336452);
    Q = C(Q, U, T, S, E[K + 7], O, 1126891415);
    S = C(S, Q, U, T, E[K + 14], M, 2878612391);
    T = C(T, S, Q, U, E[K + 5], J, 4237533241);
    U = C(U, T, S, Q, E[K + 12], P, 1700485571);
    Q = C(Q, U, T, S, E[K + 3], O, 2399980690);
    S = C(S, Q, U, T, E[K + 10], M, 4293915773);
    T = C(T, S, Q, U, E[K + 1], J, 2240044497);
    U = C(U, T, S, Q, E[K + 8], P, 1873313359);
    Q = C(Q, U, T, S, E[K + 15], O, 4264355552);
    S = C(S, Q, U, T, E[K + 6], M, 2734768916);
    T = C(T, S, Q, U, E[K + 13], J, 1309151649);
    U = C(U, T, S, Q, E[K + 4], P, 4149444226);
    Q = C(Q, U, T, S, E[K + 11], O, 3174756917);
    S = C(S, Q, U, T, E[K + 2], M, 718787259);
    T = C(T, S, Q, U, E[K + 9], J, 3951481745);
    U = G(U, g);
    T = G(T, F);
    S = G(S, s);
    Q = G(Q, f)
  }
  var h = p(U) + p(T) + p(S) + p(Q);
  return h.toLowerCase()
};
PUtility.AuthMD5_Calc = function (d, i, j, c, e, a, f) {
  var h = PUtility.calculateMD5(d + ":" + i + ":" + j);
  var g = PUtility.calculateMD5(c + ":" + f);
  var b = PUtility.calculateMD5(h + ":" + a + ":" + g);
  return b
};
PUtility.PGetCurTime = function () {
  var c = new Date();
  var b = "-";
  var a = ":";
  var f = c.getMonth() + 1;
  var e = c.getDate();
  if (f >= 1 && f <= 9) {
    f = "0" + f
  }
  if (e >= 0 && e <= 9) {
    e = "0" + e
  }
  var d = c.getFullYear() + b + f + b + e + " " + c.getHours() + a + c.getMinutes() + a + c.getSeconds() + a + c.getMilliseconds();
  return d
};
PUtility.Log1 = function () {
  if (null == m_IDT_INST) {
    return
  }
  if (m_IDT_INST.RUN_MODE < m_IDT_INST.RUN_MODE_DEBUG_2) {
    return
  }
  PUtility.m_OrigLog.apply(console, arguments)
};
PUtility.Log2 = function () {
  try {
    if (null == m_IDT_INST) {
      return
    }
    if (m_IDT_INST.RUN_MODE < m_IDT_INST.RUN_MODE_DEBUG_2) {
      return
    }
    if (null == console) {
      return
    }
    if (null == console.log) {
      return
    }
    console.log.apply(console, arguments)
  } catch (a) {}
};
PUtility.IsValid = function (a) {
  return true
};
PUtility.RequestFullScreen = function (a) {
  var c = a.requestFullScreen || a.webkitRequestFullScreen || a.mozRequestFullScreen || a.msRequestFullScreen;
  if (c) {
    c.call(a)
  } else {
    if (typeof window.ActiveXObject !== "undefined") {
      var b = new ActiveXObject("WScript.Shell");
      if (b !== null) {
        b.SendKeys("{F11}")
      }
    }
  }
};
PUtility.ExitFull = function () {
  var b = document.exitFullscreen || document.mozCancelFullScreen || document.webkitExitFullscreen || document.webkitExitFullscreen;
  if (b) {
    b.call(document)
  } else {
    if (typeof window.ActiveXObject !== "undefined") {
      var a = new ActiveXObject("WScript.Shell");
      if (a !== null) {
        a.SendKeys("{F11}")
      }
    }
  }
};
PUtility.GetBrowserName = function () {
  var b = navigator.userAgent;
  var a = b.indexOf("Opera") > -1;
  if (a) {
    return "Opera"
  }
  if (b.indexOf("Firefox") > -1) {
    return "FF"
  }
  if (b.indexOf("Chrome") > -1) {
    return "Chrome"
  }
  if (b.indexOf("Safari") > -1) {
    return "Safari"
  }
  if (b.indexOf("compatible") > -1 && b.indexOf("MSIE") > -1 && !a) {
    return "IE"
  }
  if (!!window.ActiveXObject || "ActiveXObject" in window) {
    return "IE"
  }
  return "Unknown"
};
PUtility.m_OrigLog = null;
if ("IE" != PUtility.GetBrowserName()) {
  PUtility.m_OrigLog = console.log
}
"use strict";
(function (b, a) {
  if (typeof define === "function" && define.amd) {
    define([], a)
  } else {
    b.CWsLink = a()
    // if (typeof module !== "undefined" && module.exports) {
    //   module.exports = a()
    // } else {
    //   b.CWsLink = a()
    // }
  }
})(this, function () {
  function a() {
    var b = this;
    b.ModuleName = null;
    b.bInit = false;
    b.strPeerUrl = null;
    b.bNeedReg = false;
    b.strUserId = null;
    b.strUserPwd = null;
    b.onRecvMsg = null;
    b.onStatus = null;
    b.m_bFirstStart = true;
    b.Status = 0;
    b.Link = null;
    b.strUserNum = null;
    b.CONNECT_TIMER_LEN = 5000;
    b.TimerConnect = null;
    b.LOGIN_TIMER_LEN = 10000;
    b.TimerLogin = null;
    b.HB_TIMER_LEN = 5000;
    b.TimerHB = null;
    b.iHBCount = 0;
    b.strAuthRsp = null;
    b.Init = function () {
      PUtility.Log(b.ModuleName, PUtility.PGetCurTime(), "Init");
      b.bInit = false;
      b.strPeerUrl = null;
      b.bNeedReg = false;
      b.strUserId = null;
      b.strUserPwd = null;
      b.onRecvMsg = null;
      b.onSendMsg = null;
      b.onStatus = null;
      b.m_bFirstStart = true;
      b.Status = 0;
      b.Link = null;
      b.strUserNum = null;
      b.CONNECT_TIMER_LEN = 5000;
      b.TimerConnect = null;
      b.LOGIN_TIMER_LEN = 10000;
      b.TimerLogin = null;
      b.HB_TIMER_LEN = 5000;
      b.TimerHB = null;
      b.iHBCount = 0;
      b.strAuthRsp = null;
      return 0
    };
    b.ClearRun = function () {
      if (null != b.TimerConnect) {
        clearTimeout(b.TimerConnect);
        b.TimerConnect = null
      }
      if (null != b.TimerLogin) {
        clearTimeout(b.TimerLogin);
        b.TimerLogin = null
      }
      if (null != b.TimerHB) {
        clearTimeout(b.TimerHB);
        b.TimerHB = null
      }
      if (null != b.Link) {
        b.Link.close();
        b.Link = null
      }
      return 0
    };
    b.ConnectReq = function () {
      b.ClearRun();
      b.SetStatus(1, IDT.CAUSE_ZERO);
      b.Link = new WebSocket(b.strPeerUrl);
      b.Link.binaryType = "blob";
      b.Link.onopen = function (c) {
        b.onWsOpen(c)
      };
      b.Link.onclose = function (c) {
        b.onWsClose(c)
      };
      b.Link.onmessage = function (c) {
        b.onWsMessage(c)
      };
      b.Link.onerror = function (c) {
        b.onWsError(c)
      };
      b.TimerConnect = setTimeout(b.TmConnect, b.CONNECT_TIMER_LEN);
      if (true == b.bNeedReg) {
        b.TimerLogin = setTimeout(b.TmLogin, b.LOGIN_TIMER_LEN)
      }
      return 0
    };
    b.SendJsonInner = function (d) {
      if (1 != b.Link.readyState) {
        return -1
      }
      if (null == d.SrcFsm) {
        d.SrcFsm = 4294967295
      }
      if (null == d.DstFsm) {
        d.DstFsm = 4294967295
      }
      var c = JSON.stringify(d);
      b.Link.send(c);
      if (b.onSendMsg && (m_IDT_INST.RUN_MODE > m_IDT_INST.RUN_MODE_RELEASE)) {
        b.onSendMsg(b.ModuleName, d)
      }
      return 0
    };
    b.SendJson = function (c) {
      if (3 != b.Status) {
        return -1
      }
      return b.SendJsonInner(c)
    };
    b.SetStatus = function (d, e) {
      var c = b.Status;
      b.Status = d;
      if (null != b.onStatus) {
        if (b.m_bFirstStart) {
          if (3 == d) {
            b.onStatus(1, e);
            b.m_bFirstStart = false;
            PUtility.Log(b.ModuleName, PUtility.PGetCurTime(), "onStatus", 1)
          } else {
            if (0 == d) {
              b.onStatus(0, e);
              b.m_bFirstStart = false;
              PUtility.Log(b.ModuleName, PUtility.PGetCurTime(), "onStatus", 0)
            }
          }
        } else {
          if (3 != c && 3 == d) {
            b.onStatus(1, e);
            PUtility.Log(b.ModuleName, PUtility.PGetCurTime(), "onStatus", 1)
          } else {
            if (3 == c && 0 == d) {
              b.onStatus(0, e);
              PUtility.Log(b.ModuleName, PUtility.PGetCurTime(), "onStatus", 0)
            }
          }
        }
      }
      return 0
    };
    b.onWsOpen = function (c) {
      if (null == b.bInit) {
        return 0
      }
      if (null != b.TimerConnect) {
        clearTimeout(b.TimerConnect);
        b.TimerConnect = null
      }
      b.SetStatus(2, IDT.CAUSE_ZERO);
      if (true == b.bNeedReg) {
        b.SendJsonInner({
          MsgCode: IDT.MSG_MM_REGREQ,
          MsgBody: {
            UsrNum: b.strUserNum,
            RegType: 1,
            AuthAlg: "MD5",
            AuthRealm: "",
            AuthNonce: "",
            AuthRsp: "",
            ConCurrent: 0
          }
        });
        if (null == b.TimerLogin) {
          b.TimerLogin = setTimeout(b.TmLogin, b.LOGIN_TIMER_LEN)
        }
      } else {
        if (null != b.onStatus) {
          b.SetStatus(3, IDT.CAUSE_ZERO)
        }
      }
      b.TimerHB = setTimeout(b.TmHB, b.HB_TIMER_LEN);
      return 0
    };
    b.onWsClose = function (c) {
      if (null == b.bInit) {
        return 0
      }
      return 0
    };
    b.onWsMessage = function (c) {
      if (null == b.bInit) {
        return 0
      }
      var d = {};
      b.iHBCount = 0;
      var l = c.data.replace(new RegExp("\r\n", "g"), "<br/>");
      var k = l.replace(new RegExp("\n", "g"), "");
      var i = k.replace(new RegExp("\\\\", "g"), "\\\\");
      var h = i.replace(new RegExp('\\\\\\\\"', "g"), '"');
      var g = h.replace(new RegExp('":"{"', "g"), '":{"');
      var f = g.replace(new RegExp('}","', "g"), '},"');
      try {
        d = JSON.parse(f)
      } catch (j) {
        PUtility.Log(b.ModuleName, PUtility.PGetCurTime(), "ErrorMsg:", c.data);
        PUtility.Log(b.ModuleName, PUtility.PGetCurTime(), "ErrorMsg(newStr6):", f);
        return -1
      }
      if (null != b.onRecvMsg) {
        b.onRecvMsg(d)
      }
      switch (d.MsgCode) {
        case IDT.MSG_MM_REGRSP:
          PUtility.Log(b.ModuleName, PUtility.PGetCurTime(), IDT.MSG_MM_REGRSP, IDT.GetCauseStr(d.MsgBody.Result));
          switch (d.MsgBody.Result) {
            case 25:
              b.strAuthRsp = PUtility.AuthMD5_Calc(d.MsgBody.UsrNum, d.MsgBody.AuthRealm, b.strUserPwd, "REGISTER", d.MsgBody.AuthAlg, d.MsgBody.AuthNonce, "0.0.0.0");
              b.SendJsonInner({
                MsgCode: IDT.MSG_MM_REGREQ,
                MsgBody: {
                  UsrNum: d.MsgBody.UsrNum,
                  RegType: d.MsgBody.RegType,
                  AuthAlg: d.MsgBody.AuthAlg,
                  AuthRealm: d.MsgBody.AuthRealm,
                  AuthNonce: d.MsgBody.AuthNonce,
                  AuthRsp: b.strAuthRsp,
                  ConCurrent: 0
                }
              });
              break;
            case 0:
              b.SetStatus(3, d.MsgBody.Result);
              PUtility.Log(b.ModuleName, PUtility.PGetCurTime(), "Stop TimerLogin");
              clearTimeout(b.TimerLogin);
              b.TimerLogin = null;
              d.MsgBody.AuthRsp = b.strAuthRsp;
              break;
            default:
              b.SetStatus(0, d.MsgBody.Result);
              b.ClearRun();
              break
          }
          break;
        default:
          break
      }
      return 0
    };
    b.onWsError = function (c) {
      if (null == b.bInit) {
        return 0
      }
      return 0
    };
    b.TmConnect = function () {
      if (null == b.bInit) {
        return 0
      }
      b.TimerConnect = null;
      b.SetStatus(0, IDT.CAUSE_ZERO);
      b.ConnectReq()
    };
    b.TmLogin = function () {
      if (null == b.bInit) {
        return 0
      }
      b.TimerConnect = null;
      b.SetStatus(0, IDT.CAUSE_TIMER_EXPIRY);
      b.ConnectReq()
    };
    b.TmHB = function () {
      if (null == b.bInit) {
        return 0
      }
      b.iHBCount++;
      if (b.iHBCount >= 3) {
        b.TimerConnect = null;
        b.SetStatus(0, IDT.CAUSE_TIMER_EXPIRY);
        b.ConnectReq()
      } else {
        b.SendJsonInner({
          MsgCode: IDT.MSG_HB
        });
        b.TimerHB = setTimeout(b.TmHB, b.HB_TIMER_LEN)
      }
    };
    b.Start = function (j, i, f, d, e, c, g, h) {
      b.ModuleName = j;
      PUtility.Log(b.ModuleName, PUtility.PGetCurTime(), "Start");
      if (true == b.bInit) {
        if (b.strPeerUrl == i && b.strUserId == d && b.strUserPwd == e) {
          return 0
        }
        b.Exit()
      }
      b.Init();
      b.strPeerUrl = i;
      b.bNeedReg = f;
      b.strUserId = d;
      b.strUserPwd = e;
      b.onStatus = c;
      b.onRecvMsg = g;
      b.onSendMsg = h;
      b.strUserNum = d;
      b.ConnectReq();
      b.bInit = true;
      return 0
    };
    b.Exit = function () {
      PUtility.Log(b.ModuleName, PUtility.PGetCurTime(), "Exit");
      b.ClearRun();
      b.bInit = null;
      b.strPeerUrl = null;
      b.bNeedReg = null;
      b.strUserId = null;
      b.strUserPwd = null;
      b.onRecvMsg = null;
      b.onSendMsg = null;
      b.onStatus = null;
      b.m_bFirstStart = null;
      b.Status = null;
      b.Link = null;
      b.strUserNum = null;
      b.CONNECT_TIMER_LEN = null;
      b.TimerConnect = null;
      b.LOGIN_TIMER_LEN = null;
      b.TimerLogin = null;
      b.HB_TIMER_LEN = null;
      b.TimerHB = null;
      b.iHBCount = null;
      b.strAuthRsp = null;
      return 0
    }
  }
  return a
});
"use strict";
(function (b, a) {
  if (typeof define === "function" && define.amd) {
    define([], a)
  } else {
    b.TransFsm = a()
    // if (typeof module !== "undefined" && module.exports) {
    //   module.exports = a()
    // } else {
    //   b.TransFsm = a()
    // }
  }
})(this, function () {
  function a() {
    var b = this;
    b.uiMyId = null;
    b.bInit = false;
    b.InvokeTime = null;
    b.TIMER_LEN = 10000;
    b.Timer = null;
    b.UserSn = null;
    b.Msg = null;
    b.pfCallBack = null;
    b.Init = function () {
      PUtility.Log("TransFsm[", b.uiMyId, "]", PUtility.PGetCurTime(), "Init");
      b.ClearRun();
      return 0
    };
    b.ClearRun = function () {
      PUtility.Log("TransFsm[", b.uiMyId, "]", PUtility.PGetCurTime(), "ClearRun");
      b.InvokeTime = null;
      b.pfCallBack = null;
      if (null != b.Timer) {
        clearTimeout(b.Timer);
        b.Timer = null
      }
      b.UserSn = null;
      b.Msg = null;
      b.bInit = false;
      return 0
    };
    b.TmExp = function () {
      PUtility.Log("TransFsm[", b.uiMyId, "]", PUtility.PGetCurTime(), "TmExp");
      if (null == b.bInit) {
        return 0
      }
      b.Timer = null;
      if (null != b.pfCallBack) {
        b.pfCallBack(false, IDT.CAUSE_TIMER_EXPIRY, null, null, b.UserSn)
      }
      b.ClearRun()
    };
    b.Start = function (c) {
      PUtility.Log("TransFsm[", b.uiMyId, "]", PUtility.PGetCurTime(), "Start");
      b.bInit = true;
      b.pfCallBack = c;
      b.Timer = setTimeout(b.TmExp, b.TIMER_LEN);
      return 0
    };
    b.StartEx = function (e, c, d) {
      PUtility.Log("TransFsm[", b.uiMyId, "]", PUtility.PGetCurTime(), "Start");
      b.bInit = true;
      b.pfCallBack = e;
      b.UserSn = c;
      b.Msg = d;
      b.Timer = setTimeout(b.TmExp, b.TIMER_LEN);
      return 0
    };
    b.RestartTimer = function () {
      if (null != b.Timer) {
        clearTimeout(b.Timer);
        b.Timer = null
      }
      b.Timer = setTimeout(b.TmExp, b.TIMER_LEN);
      return 0
    }
  }
  return a
});
(function (b, a) {
  if (typeof define === "function" && define.amd) {
    define([], a)
  } else {
    b.FsmMgr = a()
    // if (typeof module !== "undefined" && module.exports) {
    //   module.exports = a()
    // } else {
    //   b.FsmMgr = a()
    // }
  }
})(this, function () {
  function a() {
    var b = this;
    b.ModuleName = null;
    b.bInit = false;
    b.iMaxFsm = 0;
    b.Fsm = [];
    b.Init = function () {
      PUtility.Log(b.ModuleName, PUtility.PGetCurTime(), "Init");
      b.bInit = true;
      return 0
    };
    b.ClearRun = function () {
      PUtility.Log(b.ModuleName, PUtility.PGetCurTime(), "ClearRun");
      var c;
      for (c = 0; c < b.iMaxFsm; c++) {
        if (null != b.Fsm[c]) {
          if (true == b.Fsm[c].bInit) {
            b.Fsm[c].ClearRun()
          }
        }
      }
      return 0
    };
    b.Start = function (f, e, d) {
      b.ModuleName = f;
      PUtility.Log(b.ModuleName, PUtility.PGetCurTime(), "Start");
      if (true == b.bInit) {
        if (b.iMaxFsm == e) {
          return 0
        }
        b.Exit()
      }
      b.Init();
      b.iMaxFsm = e;
      var c;
      for (c = 0; c < e; c++) {
        b.Fsm[c] = new d();
        b.Fsm[c].uiMyId = c
      }
      b.bInit = true;
      return 0
    };
    b.Exit = function () {
      PUtility.Log(b.ModuleName, PUtility.PGetCurTime(), "Exit");
      b.ClearRun();
      var c;
      for (c = 0; c < b.iMaxFsm; c++) {
        if (null != b.Fsm[c]) {
          b.Fsm[c] = null
        }
      }
      b.iMaxFsm = null;
      b.bInit = null;
      return 0
    };
    b.Alloc = function () {
      var c;
      for (c = 0; c < b.iMaxFsm; c++) {
        if (null != b.Fsm[c]) {
          if (false == b.Fsm[c].bInit) {
            b.Fsm[c].bInit = true;
            PUtility.Log(b.ModuleName, PUtility.PGetCurTime(), "Alloc=", c);
            return c
          }
        }
      }
      PUtility.Log(b.ModuleName, PUtility.PGetCurTime(), "Alloc=-1");
      return -1
    };
    b.Remove = function (c) {
      var d;
      for (d = c; d < b.iMaxFsm; d++) {
        if (d + 1 >= b.iMaxFsm) {
          b.Fsm[d].ClearRun();
          break
        }
        if (false == b.Fsm[d].bInit) {
          b.Fsm[d].ClearRun();
          break
        }
        b.Fsm[d] = b.Fsm[d + 1]
      }
      PUtility.Log(b.ModuleName, PUtility.PGetCurTime(), "Remove=", c);
      return 0
    }
  }
  return a
});
(function (b, a) {
  if (typeof define === "function" && define.amd) {
    define([], a)
  } else {
    b.SubsFsm = a()
    // if (typeof module !== "undefined" && module.exports) {
    //   module.exports = a()
    // } else {
    //   b.SubsFsm = a()
    // }
  }
})(this, function () {
  function a() {
    var b = this;
    b.uiMyId = null;
    b.bInit = false;
    b.Num = null;
    b.Level = null;
    b.First = true;
    b.ClearRun = function () {
      PUtility.Log("SubsFsm[", b.uiMyId, "]", PUtility.PGetCurTime(), "ClearRun");
      b.Num = null;
      b.Level = null;
      b.bInit = false;
      b.First = true;
      return 0
    };
    b.Start = function (c, d) {
      PUtility.Log("SubsFsm[", b.uiMyId, "]", PUtility.PGetCurTime(), "Start", c, d);
      b.Num = c;
      b.Level = d;
      b.bInit = true;
      b.First = true;
      return 0
    }
  }
  return a
});
"use strict";
(function (b, a) {
  if (typeof define === "function" && define.amd) {
    define([], a)
  } else {
    b.CCFsm = a()
    // if (typeof module !== "undefined" && module.exports) {
    //   module.exports = a()
    // } else {
    //   b.CCFsm = a()
    // }
  }
})(this, function () {
  function a() {
    var b = this;
    b.FSMID_ERROR = 4294967295;
    b.CC_IDLE = 0;
    b.CC_WAIT_SETUPACK = 1;
    b.CC_WAIT_CONN = 2;
    b.CC_WAIT_USER_CONN = 3;
    b.CC_WAIT_CONNACK = 4;
    b.CC_RUNNING = 5;
    b.CPTM_CC_SETUPACK_LEN = 6000;
    b.CPTM_CC_CONN_LEN = 90000;
    b.CPTM_CC_ANSWER_LEN = 90000;
    b.CPTM_CC_CONNACK_LEN = 6000;
    b.CPTM_CC_HB_LEN = 5000;
    b.CPTM_CC_PRESS_LEN = 1000;
    b.uiMyId = b.FSMID_ERROR;
    b.bInit = false;
    b.UserCtx = null;
    b.PeerConn = null;
    b.bPeerConnAnswer = false;
    b.MySdp = null;
    b.PeerSdp = null;
    b.MgSdp = null;
    b.MediaASdp = null;
    b.uiPeerFsmId = b.FSMID_ERROR;
    b.uiPrio = 7;
    b.strMyNum = null;
    b.strPeerNum = null;
    b.strOrigCalledNum = null;
    b.strDispNum = null;
    b.strstDispName = null;
    b.SrvType = null;
    b.bConnected = false;
    b.ucARx = 0;
    b.ucATx = 0;
    b.ucVRx = 0;
    b.ucVTx = 0;
    b.idLocalV = null;
    b.idPeerV = null;
    b.SetPeerSdp = false;
    b.createAnswerFlag = false;
    b.LocalStream = null;
    b.tmp_ucARx = null;
    b.tmp_ucATx = null;
    b.tmp_ucVRx = null;
    b.tmp_ucVTx = null;
    b.tmp_idLocalV = null;
    b.tmp_idPeerV = null;
    b.tmp_SrvType = null;
    b.tmp_bSetVolume = false;
    b.tmp_strPwd = null;
    b.tmp_ucCallOut = 0;
    b.tmp_ucDelG = 0;
    b.iHBCount = 0;
    b.TimerHB = null;
    b.bIsGCall = false;
    b.bUserNotify = false;
    b.bUserWantMic = false;
    b.ucLastMicReq = 0;
    b.ucLastMic = 0;
    b.strTalkingNum = null;
    b.strTalkingName = null;
    b.TimerPress = null;
    b.bPressUserWant = false;
    b.State = 0;
    b.TimerState = null;
    b.ucUserMark = null;
    b.ucAutoMic = 1;
    b.dwMediaAFsmId = b.FSMID_ERROR;
    b.iMediaAHBCount = 0;
    b.Init = function () {
      PUtility.Log("CCFsm[", b.uiMyId, "]", PUtility.PGetCurTime(), "Init");
      b.ClearRun();
      return 0
    };
    b.ClearRun = function () {
      PUtility.Log("CCFsm[", b.uiMyId, "]", PUtility.PGetCurTime(), "ClearRun");
      if (null != b.TimerState) {
        PUtility.Log("CCFsm[", b.uiMyId, "]", PUtility.PGetCurTime(), "Stop TimerState");
        clearTimeout(b.TimerState);
        b.TimerState = null
      }
      if (null != b.TimerPress) {
        PUtility.Log("CCFsm[", b.uiMyId, "]", PUtility.PGetCurTime(), "Stop TimerPress");
        clearTimeout(b.TimerPress);
        b.TimerPress = null
      }
      if (null != b.TimerHB) {
        PUtility.Log("CCFsm[", b.uiMyId, "]", PUtility.PGetCurTime(), "Stop TimerHB");
        clearTimeout(b.TimerHB);
        b.TimerHB = null
      }
      if (null != b.idLocalV) {
        PUtility.Log("CCFsm[", b.uiMyId, "]", PUtility.PGetCurTime(), "idLocalV.srcObject=null");
        if (true == m_IDT_INST.bIsIe) {
          b.idLocalV.closeUserMedia()
        } else {
          b.idLocalV.srcObject = null
        }
        b.idLocalV = null
      }
      if (null != b.idPeerV) {
        PUtility.Log("CCFsm[", b.uiMyId, "]", PUtility.PGetCurTime(), "idPeerV.srcObject=null");
        if (true == m_IDT_INST.bIsIe) {
          b.idPeerV.closeUserMedia()
        } else {
          b.idPeerV.srcObject = null
        }
        b.idPeerV = null
      }
      if (b.PeerConn) {
        PUtility.Log("CCFsm[", b.uiMyId, "]", PUtility.PGetCurTime(), "Release PeerConn");
        b.PeerConn.close();
        b.PeerConn = null
      }
      if (b.LocalStream) {
        try {
          b.LocalStream.getAudioTracks()[0].stop()
        } catch (c) {}
        try {
          b.LocalStream.getVideoTracks()[0].stop()
        } catch (c) {}
        b.LocalStream = null
      }
      b.bInit = false;
      b.UserCtx = null;
      b.PeerConn = null;
      b.bPeerConnAnswer = false;
      b.MySdp = null;
      b.PeerSdp = null;
      b.MgSdp = null;
      b.MediaASdp = null;
      b.uiPeerFsmId = b.FSMID_ERROR;
      b.uiPrio = 7;
      b.strMyNum = null;
      b.strPeerNum = null;
      b.strOrigCalledNum = null;
      b.strDispNum = null;
      b.strstDispName = null;
      b.SrvType = null;
      b.bConnected = false;
      b.ucARx = 0;
      b.ucATx = 0;
      b.ucVRx = 0;
      b.ucVTx = 0;
      b.idLocalV = null;
      b.idPeerV = null;
      b.SetPeerSdp = false;
      b.createAnswerFlag = false;
      b.LocalStream = null;
      b.tmp_ucARx = null;
      b.tmp_ucATx = null;
      b.tmp_ucVRx = null;
      b.tmp_ucVTx = null;
      b.tmp_idLocalV = null;
      b.tmp_idPeerV = null;
      b.tmp_SrvType = null;
      b.tmp_bSetVolume = false;
      b.tmp_PeerSdp = null;
      b.tmp_strPwd = null;
      b.tmp_ucCallOut = 0;
      b.tmp_ucDelG = 0;
      b.iHBCount = 0;
      b.TimerHB = null;
      b.bIsGCall = false;
      b.bUserNotify = false;
      b.bUserWantMic = false;
      b.ucLastMicReq = 0;
      b.ucLastMic = 0;
      b.strTalkingNum = null;
      b.strTalkingName = null;
      b.TimerPress = null;
      b.bPressUserWant = false;
      b.State = 0;
      b.TimerState = null;
      b.ucUserMark = null;
      b.ucAutoMic = 1;
      b.dwMediaAFsmId = b.FSMID_ERROR;
      b.iMediaAHBCount = 0;
      return 0
    };
    b.Rel = function (d, g, f) {
      PUtility.Log("CCFsm[", b.uiMyId, "]", PUtility.PGetCurTime(), "Rel", IDT.GetCloseStr(d), ":", IDT.GetCauseStr(g));
      if (false == b.bInit) {
        return 0
      }
      var e = 0,
        c = 0;
      switch (d) {
        case IDT.CLOSE_BYPEER:
          c = 1;
          break;
        case IDT.CLOSE_BYUSER:
          e = 1;
          break;
        case IDT.CLOSE_BYINNER:
          e = 1;
          c = 1;
          break;
        default:
          break
      }
      if (e) {
        m_IDT_INST.LinkSendJson(m_IDT_INST.McLink, {
          MsgCode: IDT.MSG_CC_REL,
          SrcFsm: b.uiMyId,
          DstFsm: b.uiPeerFsmId,
          MsgBody: {
            Cause: g
          }
        })
      }
      if (c) {
        if (null != m_IDT_INST.CallBack.onCallInd) {
          m_IDT_INST.CallBack.onCallInd(IDT.CALL_EVENT_Rel, b.UserCtx, b.uiMyId, d, g, f)
        }
      }
      m_IDT_INST.LinkSendJson(m_IDT_INST.MediaALink, {
        MsgCode: IDT.MSG_MA_REL,
        SrcFsm: b.uiMyId,
        DstFsm: b.dwMediaAFsmId,
        MsgBody: {
          Cause: g
        }
      });
      b.ClearRun();
      return 0
    };
    b.IsMediaA = function () {
      if (1 != m_IDT_INST.MediaALink.Link.readyState) {
        return false
      }
      if (IDT.SRV_TYPE_WATCH_DOWN != b.SrvType) {
        return false
      }
      return true
    };
    b.onCreateOfferSuccessSendMsg_IE = function () {
      var c;
      if (b.CC_WAIT_SETUPACK == b.State) {
        c = {
          MsgCode: IDT.MSG_CC_SETUP,
          SrcFsm: b.uiMyId,
          DstFsm: b.FSMID_ERROR,
          MsgBody: {
            MyNum: b.strMyNum,
            PeerNum: b.strPeerNum,
            OrigCalledNum: b.strOrigCalledNum,
            SrvType: b.SrvType,
            MySdp: {
              ARx: b.ucARx,
              ATx: b.ucATx,
              VRx: b.ucVRx,
              VTx: b.ucVTx,
              SdpStrType: b.MySdp.type,
              SdpStr: b.MySdp.sdp
            },
            CallConf: {
              Pwd: b.tmp_strPwd,
              CallOut: b.tmp_ucCallOut,
              DelG: b.tmp_ucDelG
            },
            UserMark: b.ucUserMark
          }
        };
        if (IDT.SRV_TYPE_CONF == b.SrvType) {
          if (0 == b.ucARx) {
            c.MsgBody.CallConf.MicNum1 = 1;
            c.MsgBody.CallConf.Audio1 = 1;
            c.MsgBody.CallConf.VideoTx1 = 0;
            c.MsgBody.CallConf.VideoRx1 = 0;
            c.MsgBody.CallConf.MicNum2 = 0;
            c.MsgBody.CallConf.Audio2 = 0;
            c.MsgBody.CallConf.VideoTx2 = 0;
            c.MsgBody.CallConf.VideoRx2 = 0;
            c.MsgBody.CallConf.AutoMic = 1;
            b.bIsGCall = true
          } else {
            c.MsgBody.CallConf.MicNum1 = 1;
            c.MsgBody.CallConf.Audio1 = 1;
            c.MsgBody.CallConf.VideoTx1 = 1;
            c.MsgBody.CallConf.VideoRx1 = 1;
            c.MsgBody.CallConf.MicNum2 = 16;
            c.MsgBody.CallConf.Audio2 = 1;
            c.MsgBody.CallConf.VideoTx2 = 1;
            c.MsgBody.CallConf.VideoRx2 = 0;
            c.MsgBody.CallConf.AutoMic = 0;
            b.bIsGCall = false
          }
        } else {
          c.MsgBody.CallConf.MicNum1 = 0;
          c.MsgBody.CallConf.Audio1 = 0;
          c.MsgBody.CallConf.VideoTx1 = 0;
          c.MsgBody.CallConf.VideoRx1 = 0;
          c.MsgBody.CallConf.MicNum2 = 0;
          c.MsgBody.CallConf.Audio2 = 0;
          c.MsgBody.CallConf.VideoTx2 = 0;
          c.MsgBody.CallConf.VideoRx2 = 0;
          c.MsgBody.CallConf.AutoMic = 0;
          b.bIsGCall = false
        }
      } else {
        c = {
          MsgCode: IDT.MSG_CC_CONN,
          SrcFsm: b.uiMyId,
          DstFsm: b.uiPeerFsmId,
          MsgBody: {
            MySdp: {
              ARx: b.ucARx,
              ATx: b.ucATx,
              VRx: b.ucVRx,
              VTx: b.ucVTx,
              SdpStrType: b.MySdp.type,
              SdpStr: b.MySdp.sdp
            }
          }
        }
      }
      m_IDT_INST.LinkSendJson(m_IDT_INST.McLink, c)
    };
    b.onCreateAnswerSuccessSendMsg = function () {
      var c;
      if (b.CC_WAIT_SETUPACK == b.State) {
        if (PUtility.isEmpty(b.MySdp)) {
          c = {
            MsgCode: IDT.MSG_CC_SETUP,
            SrcFsm: b.uiMyId,
            DstFsm: b.FSMID_ERROR,
            MsgBody: {
              MyNum: b.strMyNum,
              PeerNum: b.strPeerNum,
              OrigCalledNum: b.strOrigCalledNum,
              SrvType: b.SrvType,
              MySdp: {
                ARx: b.ucARx,
                ATx: b.ucATx,
                VRx: b.ucVRx,
                VTx: b.ucVTx,
                SdpStrType: "answer",
                SdpStr: ""
              },
              CallConf: {
                Pwd: b.tmp_strPwd,
                CallOut: b.tmp_ucCallOut,
                DelG: b.tmp_ucDelG
              },
              UserMark: b.ucUserMark
            }
          }
        } else {
          c = {
            MsgCode: IDT.MSG_CC_SETUP,
            SrcFsm: b.uiMyId,
            DstFsm: b.FSMID_ERROR,
            MsgBody: {
              MyNum: b.strMyNum,
              PeerNum: b.strPeerNum,
              OrigCalledNum: b.strOrigCalledNum,
              SrvType: b.SrvType,
              MySdp: {
                ARx: b.ucARx,
                ATx: b.ucATx,
                VRx: b.ucVRx,
                VTx: b.ucVTx,
                SdpStrType: b.MySdp.type,
                SdpStr: b.MySdp.sdp
              },
              CallConf: {
                Pwd: b.tmp_strPwd,
                CallOut: b.tmp_ucCallOut,
                DelG: b.tmp_ucDelG
              },
              UserMark: b.ucUserMark
            }
          }
        }
        if (IDT.SRV_TYPE_CONF == b.SrvType) {
          if (0 == b.ucARx) {
            c.MsgBody.CallConf.MicNum1 = 1;
            c.MsgBody.CallConf.Audio1 = 1;
            c.MsgBody.CallConf.VideoTx1 = 0;
            c.MsgBody.CallConf.VideoRx1 = 0;
            c.MsgBody.CallConf.MicNum2 = 0;
            c.MsgBody.CallConf.Audio2 = 0;
            c.MsgBody.CallConf.VideoTx2 = 0;
            c.MsgBody.CallConf.VideoRx2 = 0;
            if (PUtility.isEmpty(b.ucAutoMic)) {
              c.MsgBody.CallConf.AutoMic = 1
            } else {
              c.MsgBody.CallConf.AutoMic = b.ucAutoMic
            }
            b.bIsGCall = true
          } else {
            c.MsgBody.CallConf.MicNum1 = 1;
            c.MsgBody.CallConf.Audio1 = 1;
            c.MsgBody.CallConf.VideoTx1 = 1;
            c.MsgBody.CallConf.VideoRx1 = 1;
            c.MsgBody.CallConf.MicNum2 = 16;
            c.MsgBody.CallConf.Audio2 = 1;
            c.MsgBody.CallConf.VideoTx2 = 1;
            c.MsgBody.CallConf.VideoRx2 = 0;
            if (PUtility.isEmpty(b.ucAutoMic)) {
              c.MsgBody.CallConf.AutoMic = 0
            } else {
              c.MsgBody.CallConf.AutoMic = b.ucAutoMic
            }
            b.bIsGCall = false
          }
        } else {
          c.MsgBody.CallConf.MicNum1 = 0;
          c.MsgBody.CallConf.Audio1 = 0;
          c.MsgBody.CallConf.VideoTx1 = 0;
          c.MsgBody.CallConf.VideoRx1 = 0;
          c.MsgBody.CallConf.MicNum2 = 0;
          c.MsgBody.CallConf.Audio2 = 0;
          c.MsgBody.CallConf.VideoTx2 = 0;
          c.MsgBody.CallConf.VideoRx2 = 0;
          c.MsgBody.CallConf.AutoMic = 0;
          b.bIsGCall = false
        }
      } else {
        if (b.CC_WAIT_CONN == b.State) {
          c = {
            MsgCode: IDT.MSG_CC_INFO,
            SrcFsm: b.uiMyId,
            DstFsm: b.uiPeerFsmId,
            MsgBody: {
              UsrNum: b.strMyNum,
              Info: {
                Info: IDT.SRV_INFO_SDP,
                InfoStr: ""
              },
              MySdp: {
                ARx: b.ucARx,
                ATx: b.ucATx,
                VRx: b.ucVRx,
                VTx: b.ucVTx,
                SdpStrType: b.MySdp.type,
                SdpStr: b.MySdp.sdp
              }
            }
          }
        } else {
          if (b.CC_WAIT_CONNACK == b.State || b.CC_WAIT_USER_CONN == b.State) {
            c = {
              MsgCode: IDT.MSG_CC_CONN,
              SrcFsm: b.uiMyId,
              DstFsm: b.uiPeerFsmId,
              MsgBody: {
                MySdp: {
                  ARx: b.ucARx,
                  ATx: b.ucATx,
                  VRx: b.ucVRx,
                  VTx: b.ucVTx,
                  SdpStrType: b.MySdp.type,
                  SdpStr: b.MySdp.sdp
                }
              }
            }
          }
        }
      }
      if (PUtility.isEmpty(c)) {
        return
      }
      m_IDT_INST.LinkSendJson(m_IDT_INST.McLink, c)
    };
    b.SetMedia = function (c, g, f, i, e, d, h) {
      b.tmp_ucARx = c;
      b.tmp_ucATx = g;
      b.tmp_ucVRx = f;
      b.tmp_ucVTx = i;
      b.tmp_idLocalV = e;
      b.tmp_idPeerV = d;
      b.tmp_SrvType = h;
      if (true == m_IDT_INST.bIsIe) {
        return b.SetMedia_IE(c, g, f, i, e, d, h)
      }
      if (true == b.IsMediaA()) {
        return b.SetMedia_MediaA(c, g, f, i, e, d, h)
      }
      return b.SetMedia_WebRTCProc(c, g, f, i, e, d, h)
    };
    b.SdpFilter = function (h, g, k, c) {
      if (0 == g) {
        return true
      }
      if (-1 != h.indexOf("a=extmap:")) {
        return false
      }
      var f = new Array();
      f[0] = {
        str: "a=rtpmap:",
        len: 9
      };
      f[1] = {
        str: "a=rtcp-fb:",
        len: 10
      };
      f[2] = {
        str: "a=fmtp:",
        len: 7
      };
      var e, d = -1;
      for (e = 0; e < f.length; e++) {
        if (-1 != h.indexOf(f[e].str)) {
          d = e;
          break
        }
      }
      if (-1 == d) {
        f = null;
        return true
      }
      var j = parseInt(h.substring(f[d].len));
      switch (g) {
        case 1:
          if (j == 0 || j == k) {
            f = null;
            return true
          }
          break;
        case 2:
          if (j == c) {
            f = null;
            return true
          }
          break;
        default:
          f = null;
          return true
      }
      f = null;
      return false
    };
    b.FormatSdp = function (g, h, q, t, f, p, l) {
      var o = 126;
      var c = 100;
      if (h || q) {
        o = -1
      }
      if (t || f) {
        c = -1
      }
      var m = g.split("\r\n");
      if (m.length <= 1) {
        return ""
      }
      var j;
      var n;
      for (j = 0; j < m.length - 1; j++) {
        if (-1 == o) {
          if (-1 == m[j].indexOf("telephone-event/8000")) {
            continue
          }
          o = parseInt(m[j].substring(9))
        }
        if (-1 == c) {
          if (-1 == m[j].indexOf("profile-level-id=42e01f")) {
            continue
          }
          c = parseInt(m[j].substring(7))
        }
        if (-1 != o && -1 != c) {
          break
        }
      }
      var e = 0;
      var k, r, s;
      var d = "";
      for (j = 0; j < m.length - 1; j++) {
        if (-1 != m[j].indexOf("m=audio")) {
          e = 1;
          d += "m=audio 9 UDP/TLS/RTP/SAVPF 0 ";
          d += o;
          d += "\r\n";
          continue
        }
        if (-1 != m[j].indexOf("m=video")) {
          e = 2;
          d += "m=video 9 UDP/TLS/RTP/SAVPF ";
          d += c;
          d += "\r\n";
          continue
        }
        if (false == b.SdpFilter(m[j], e, o, c)) {
          continue
        }
        if (-1 == m[j].indexOf("a=sendrecv")) {
          d += m[j];
          d += "\r\n";
          continue
        }
        switch (e) {
          case 1:
            if (IDT.SRV_TYPE_CONF == p || IDT.SRV_TYPE_CONF_JOIN == p) {
              d += "a=sendrecv\r\n"
            } else {
              if (1 == h && 1 == q) {
                d += "a=sendrecv\r\n"
              } else {
                if (1 == h && 0 == q) {
                  d += "a=recvonly\r\n"
                } else {
                  if (0 == h && 1 == q) {
                    d += "a=sendonly\r\n"
                  }
                }
              }
            }
            break;
          case 2:
            if (IDT.SRV_TYPE_CONF == p || IDT.SRV_TYPE_CONF_JOIN == p) {
              if (false == l) {
                d += "a=sendrecv\r\n"
              }
            } else {
              if (1 == t && 1 == f) {
                d += "a=sendrecv\r\n"
              } else {
                if (1 == t && 0 == f) {
                  d += "a=recvonly\r\n"
                } else {
                  if (0 == t && 1 == f) {
                    d += "a=sendonly\r\n"
                  }
                }
              }
            }
            break;
          default:
            break
        }
      }
      return d
    };
    b.SdpGetMyAttrFromPeer = function (d, c) {
      c.ARx = 0;
      c.ATx = 0;
      c.VRx = 0;
      c.VTx = 0;
      if (1 == d.ARx) {
        c.ATx = 1
      }
      if (1 == d.ATx) {
        c.ARx = 1
      }
      if (1 == d.VRx) {
        c.VTx = 1
      }
      if (1 == d.VTx) {
        c.VRx = 1
      }
      return 0
    };
    b.CallMakeOut = function (m, r, n, f, k, q, e, g, d, j, c, i, l, h, p) {
      PUtility.Log("CCFsm[", b.uiMyId, "]", PUtility.PGetCurTime(), "CallMakeOut", g, d, j, f, k, q, e, m, c, i, l, r, n);
      b.UserCtx = m;
      b.PeerConn = null;
      b.MySdp = null;
      b.PeerSdp = null;
      b.uiPeerFsmId = b.FSMID_ERROR;
      b.uiPrio = null;
      b.strMyNum = g;
      b.strPeerNum = d.split("*")[0];
      b.strOrigCalledNum = d;
      b.strDispNum = null;
      b.strstDispName = null;
      b.SrvType = j;
      b.bConnected = false;
      b.ucUserMark = h;
      b.ucAutoMic = p;
      b.tmp_strPwd = c;
      b.tmp_ucCallOut = i;
      b.tmp_ucDelG = l;
      b.iHBCount = 0;
      b.TimerHB = null;
      b.bIsGCall = null;
      b.bUserNotify = null;
      b.bUserWantMic = null;
      b.ucLastMicReq = null;
      b.ucLastMic = null;
      b.strTalkingNum = null;
      b.strTalkingName = null;
      b.TimerPress = null;
      b.bPressUserWant = null;
      switch (j) {
        case IDT.SRV_TYPE_CONF:
          b.bUserNotify = true;
          b.bUserWantMic = true;
          b.bPressUserWant = true;
          b.ucLastMicReq = IDT.SRV_INFO_MICREQ;
          if (0 == f) {
            b.bIsGCall = true
          } else {
            b.bIsGCall = false
          }
          break;
        case IDT.SRV_TYPE_CONF_JOIN:
          b.bUserNotify = true;
          b.bUserWantMic = false;
          b.bPressUserWant = false;
          b.ucLastMicReq = IDT.SRV_INFO_MICNONE;
          b.bIsGCall = false;
          break;
        default:
          b.bUserNotify = false;
          b.bUserWantMic = false;
          b.bPressUserWant = false;
          b.ucLastMicReq = IDT.SRV_INFO_MICNONE;
          b.bIsGCall = false;
          break
      }
      b.TimerState = setTimeout(b.TmSetupAck, b.CPTM_CC_SETUPACK_LEN);
      b.State = b.CC_WAIT_SETUPACK;
      if (true == m_IDT_INST.bIsIe) {
        b.SetMedia(f, k, q, e, r, n, b.SrvType);
        return b.uiMyId
      }
      var o = {
        iceServers: [{
          urls: m_IDT_INST.strStunServer
        }]
      };
      PUtility.Log(" ", PUtility.PGetCurTime(), "self.PeerConn = new RTCPeerConnection(servers)");
      b.PeerConn = new RTCPeerConnection(o);
      b.PeerConn.onicecandidate = function (s) {
        b.onIceCandidate(b, s)
      };
      b.PeerConn.oniceconnectionstatechange = function (s) {
        b.onIceStateChange(b, s)
      };
      b.PeerConn.ontrack = function (s) {
        b.onTrack(b, s)
      };
      if (true == PUtility.isEmpty(m_IDT_INST.AudioInList)) {
        k = 0
      }
      if (true == PUtility.isEmpty(m_IDT_INST.VideoInList)) {
        e = 0
      }
      b.ucARx = f;
      b.ucATx = k;
      b.ucVRx = q;
      b.ucVTx = e;
      b.idLocalV = r;
      b.idPeerV = n;
      b.onCreateAnswerSuccessSendMsg();
      return b.uiMyId
    };
    b.RecvSetupAckProc = function (c) {
      PUtility.Log("CCFsm[", b.uiMyId, "]", PUtility.PGetCurTime(), "RecvSetupAckProc:", c.SrcFsm);
      if (b.State != b.CC_WAIT_SETUPACK) {
        return -1
      }
      b.State = b.CC_WAIT_CONN;
      b.uiPeerFsmId = c.SrcFsm;
      clearTimeout(b.TimerState);
      b.TimerState = null;
      if (b.SRV_TYPE_CONF == b.SrvType && b.bIsGCall) {
        b.TimerState = setTimeout(b.TmConn, b.CCTM_CS_MICREL_LEN)
      } else {
        b.TimerState = setTimeout(b.TmConn, b.CPTM_CC_CONN_LEN)
      }
      b.TimerHB = setTimeout(b.TmHB, b.CPTM_CC_HB_LEN);
      b.iHBCount = 0;
      return 0
    };
    b.SetMgSdpFunc = function (e) {
      var d = {};
      b.SdpGetMyAttrFromPeer(e, d);
      b.ucARx = d.ARx;
      b.ucATx = d.ATx;
      b.ucVRx = d.VRx;
      b.ucVTx = d.VTx;
      var g = new RegExp("<br/>", "g");
      var c = e.SdpStr;
      var i = c.replace(g, "\r\n");
      var f = new RegExp("a=setup:passive", "g");
      var h = i.replace(f, "a=setup:actpass");
      b.MgSdp = {
        type: "offer",
        sdp: h
      };
      b.PeerSdp = b.MgSdp;
      if (true == b.IsMediaA()) {
        return 0
      }
      if (true == b.SetPeerSdp) {
        return 0
      }
      PUtility.Log("CCFsm[", b.uiMyId, "]", PUtility.PGetCurTime(), "SetMgSdpFunc:", b.PeerSdp.sdp);
      if (true == m_IDT_INST.bIsIe) {
        if (null != b.idPeerV) {
          b.idPeerV.setRemoteDescription(b.PeerSdp)
        }
      } else {
        b.PeerConn.setRemoteDescription(b.PeerSdp).then(b.onSetRemoteSuccess, b.onSetRemoteError)
      }
      b.SetPeerSdp = true;
      return 0
    };
    b.RecvAlertProc = function (c) {
      PUtility.Log("CCFsm[", b.uiMyId, "]", PUtility.PGetCurTime(), "RecvAlertProc: ", c);
      b.SetMgSdpFunc(c.MsgBody.MySdp);
      b.SetMedia(b.ucARx, b.ucATx, b.ucVRx, b.ucVTx, b.idLocalV, b.idPeerV, b.SrvType);
      return 0
    };
    b.RecvConnProc = function (c) {
      if (!(b.CC_WAIT_CONN == b.State || b.CC_RUNNING == b.State)) {
        return -1
      }
      b.uiPeerFsmId = c.SrcFsm;
      b.uiPrio = c.MsgBody.Prio;
      b.stDispNum = c.MsgBody.TrueNum;
      b.stDispName = c.MsgBody.TrueName;
      b.SrvType = c.MsgBody.SrvType;
      switch (b.SrvType) {
        case IDT.SRV_TYPE_CONF_JOIN:
          b.SrvType = IDT.SRV_TYPE_CONF;
          break;
        default:
          break
      }
      m_IDT_INST.LinkSendJson(m_IDT_INST.McLink, {
        MsgCode: IDT.MSG_CC_CONNACK,
        SrcFsm: b.uiMyId,
        DstFsm: b.uiPeerFsmId,
        MsgBody: {}
      });
      clearTimeout(b.TimerState);
      b.TimerState = null;
      b.State = b.CC_RUNNING;
      b.bConnected = true;
      b.SetMgSdpFunc(c.MsgBody.MySdp);
      b.SetMedia(b.ucARx, b.ucATx, b.ucVRx, b.ucVTx, b.idLocalV, b.idPeerV, b.SrvType);
      if (m_IDT_INST.CallBack.onCallInd) {
        m_IDT_INST.CallBack.onCallInd(IDT.CALL_EVENT_PeerAnswer, b.UserCtx, b.stDispNum, b.stDispName, b.SrvType, c.MsgBody.UserMark, c.MsgBody.UserCallRef)
      }
      if (IDT.SRV_TYPE_CONF == b.SrvType || IDT.SRV_TYPE_CONF_JOIN == b.SrvType) {
        b.MicInd(false)
      }
      return 0
    };
    b.RecvSetupProc = function (d) {
      b.uiPeerFsmId = d.SrcFsm;
      b.uiPrio = d.MsgBody.Prio;
      b.strPeerNum = d.MsgBody.MyNum;
      b.strMyNum = d.MsgBody.PeerNum;
      b.strDispNum = d.MsgBody.TrueNum;
      b.strDispName = d.MsgBody.TrueName;
      b.SrvType = d.MsgBody.SrvType;
      b.tmp_PeerSdp = d.MsgBody.MySdp;
      if (IDT.SRV_TYPE_NONE == b.SrvType) {
        b.SrvType = IDT.SRV_TYPE_BASIC_CALL
      }
      switch (b.SrvType) {
        case IDT.SRV_TYPE_CONF:
        case IDT.SRV_TYPE_CONF_JOIN:
          b.SrvType = IDT.SRV_TYPE_CONF;
          if (null != d.MsgBody.OrigCalledName) {
            b.strDispName = d.MsgBody.OrigCalledName
          }
          break;
        default:
          break
      }
      m_IDT_INST.LinkSendJson(m_IDT_INST.McLink, {
        MsgCode: IDT.MSG_CC_SETUPACK,
        SrcFsm: b.uiMyId,
        DstFsm: b.uiPeerFsmId,
        MsgBody: {}
      });
      m_IDT_INST.LinkSendJson(m_IDT_INST.McLink, {
        MsgCode: IDT.MSG_CC_ALERT,
        SrcFsm: b.uiMyId,
        DstFsm: b.uiPeerFsmId,
        MsgBody: {}
      });
      var c = {};
      b.SdpGetMyAttrFromPeer(d.MsgBody.MySdp, c);
      if (IDT.SRV_TYPE_CONF == b.SrvType || IDT.SRV_TYPE_CONF_JOIN == b.SrvType) {
        if (c.VRx || c.VTx) {
          b.bIsGCall = false
        } else {
          b.bIsGCall = true
        }
      } else {
        b.bIsGCall = false
      }
      b.State = b.CC_WAIT_USER_CONN;
      b.TimerState = setTimeout(b.TmAnswer, b.CPTM_CC_ANSWER_LEN);
      b.TimerHB = setTimeout(b.TmHB, b.CPTM_CC_HB_LEN);
      b.iHBCount = 0;
      if (m_IDT_INST.CallBack.onCallInd) {
        m_IDT_INST.CallBack.onCallInd(IDT.CALL_EVENT_In, b.uiMyId, d.MsgBody.TrueNum, d.MsgBody.TrueName, b.SrvType, b.bIsGCall, c.ARx, c.ATx, c.VRx, c.VTx, d.MsgBody.UserMark, d.MsgBody.UserCallRef)
      }
      return 0
    };
    b.UserAnswer = function (f, e, d, c, h, g, i) {
      b.UserCtx = f;
      b.idPeerV = d;
      if (true == m_IDT_INST.bIsIe) {
        b.ucARx = c;
        b.ucATx = h;
        b.ucVRx = g;
        b.ucVTx = i;
        b.idLocalV = e;
        b.idPeerV = d;
        b.SetMedia(c, h, g, i, e, d, b.SrvType);
        clearTimeout(b.TimerState);
        b.TimerState = null;
        b.State = b.CC_WAIT_CONNACK;
        b.TimerState = setTimeout(b.TmConnAck, b.CPTM_CC_CONNACK_LEN);
        return 0
      }
      var j = {
        iceServers: [{
          urls: m_IDT_INST.strStunServer
        }]
      };
      PUtility.Log(" ", PUtility.PGetCurTime(), "self.PeerConn = new RTCPeerConnection(servers)");
      b.PeerConn = new RTCPeerConnection(j);
      b.PeerConn.onicecandidate = function (k) {
        b.onIceCandidate(b, k)
      };
      b.PeerConn.oniceconnectionstatechange = function (k) {
        b.onIceStateChange(b, k)
      };
      b.PeerConn.ontrack = function (k) {
        b.onTrack(b, k)
      };
      if (true == PUtility.isEmpty(m_IDT_INST.AudioInList)) {
        h = 0
      }
      if (true == PUtility.isEmpty(m_IDT_INST.VideoInList)) {
        i = 0
      }
      b.SetMgSdpFunc(b.tmp_PeerSdp);
      b.SetMedia(c, h, g, i, e, d, b.SrvType);
      clearTimeout(b.TimerState);
      b.TimerState = null;
      b.State = b.CC_WAIT_CONNACK;
      b.TimerState = setTimeout(b.TmConnAck, b.CPTM_CC_CONNACK_LEN);
      return 0
    };
    b.RecvConnAckProc = function (c) {
      if (b.State != b.CC_WAIT_CONNACK) {
        return 0
      }
      clearTimeout(b.TimerState);
      b.TimerState = null;
      b.State = b.CC_RUNNING;
      b.bConnected = true;
      return 0
    };
    b.RecvRelProc = function (c) {
      if (false == b.bInit) {
        return 0
      }
      b.Rel(IDT.CLOSE_BYPEER, c.MsgBody.Cause, c.MsgBody.CauseStr);
      return 0
    };
    b.RecvInfoProc = function (d, g) {
      m_IDT_INST.LinkSendJson(g, {
        MsgCode: IDT.MSG_CC_INFOACK,
        SrcFsm: b.uiMyId,
        DstFsm: d.SrcFsm,
      });
      var f;
      switch (d.MsgBody.Info.Info) {
        case IDT.SRV_INFO_ICECAND:
          if (true == b.IsMediaA()) {
            if (g != m_IDT_INST.MediaALink) {
              return 0
            }
          } else {
            if (g != m_IDT_INST.McLink) {
              return 0
            }
          }
          var e = new RegExp("<br/>", "g");
          var c = d.MsgBody.Info.InfoStr;
          var h = c.replace(e, '"');
          f = JSON.parse(h);
          PUtility.Log("CCFsm[", b.uiMyId, "]", PUtility.PGetCurTime(), "RecvInfoProc-ICECAND: ", f);
          if (true == m_IDT_INST.bIsIe) {
            if (null != b.idPeerV) {
              b.idPeerV.addIceCandidate(h)
            }
          } else {
            b.PeerConn.addIceCandidate(f).then(function () {
              b.onAddIcePeerCandidateSuccess(f)
            }, function (i) {
              b.onAddIcePeerCandidateError(f, i)
            })
          }
          break;
        case IDT.SRV_INFO_SDP:
          if (true == b.IsMediaA()) {
            m_IDT_INST.LinkSendJson(m_IDT_INST.MediaALink, {
              MsgCode: IDT.MSG_CC_INFO,
              SrcFsm: b.uiMyId,
              DstFsm: b.dwMediaAFsmId,
              MsgBody: {
                Info: d.MsgBody.Info,
                MySdp: d.MsgBody.MySdp
              }
            })
          }
          b.SetMgSdpFunc(d.MsgBody.MySdp);
          break;
        case IDT.SRV_INFO_MICINFO:
          if (b.strTalkingNum != d.MsgBody.UsrNum) {
            b.strTalkingNum = d.MsgBody.UsrNum;
            b.strTalkingName = d.MsgBody.UsrName;
            if (null == b.strTalkingNum) {
              b.strTalkingNum = ""
            }
            if (null == b.strTalkingName) {
              b.strTalkingName = ""
            }
            if (m_IDT_INST.CallBack.onCallInd) {
              m_IDT_INST.CallBack.onCallInd(IDT.CALL_EVENT_TalkingIDInd, b.UserCtx, b.strTalkingNum, b.strTalkingName)
            }
          }
          break;
        case IDT.SRV_INFO_MICREQ:
        case IDT.SRV_INFO_MICREL:
          if (m_IDT_INST.CallBack.onCallInd) {
            m_IDT_INST.CallBack.onCallInd(IDT.CALL_EVENT_ConfCtrlInd, b.UserCtx, d.MsgBody.Info.Info, d.MsgBody.UsrNum, d.MsgBody.UsrName)
          }
          break;
        case IDT.SRV_INFO_TALKONRSP:
          break;
        default:
          if (m_IDT_INST.CallBack.onCallInd) {
            m_IDT_INST.CallBack.onCallInd(IDT.CALL_EVENT_RecvInfo, b.UserCtx, d.MsgBody.Info.Info, d.MsgBody.Info.InfoStr)
          }
          break
      }
      return 0
    };
    b.RecvInfoAckProc = function (c) {
      return 0
    };
    b.RecvModifyProc = function (c) {
      b.SetMgSdpFunc(c.MsgBody.MySdp);
      m_IDT_INST.LinkSendJson(m_IDT_INST.McLink, {
        MsgCode: IDT.MSG_CC_MODIFYACK,
        SrcFsm: b.uiMyId,
        DstFsm: b.uiPeerFsmId,
        MsgBody: {
          OpSn: c.MsgBody.OpSn,
          MySdp: {
            ARx: b.ucARx,
            ATx: b.ucATx,
            VRx: b.ucVRx,
            VTx: b.ucVTx,
            SdpStrType: b.MySdp.type,
            SdpStr: b.MySdp.sdp
          }
        }
      });
      b.MicInd(false);
      if (IDT.SRV_TYPE_CONF == b.SrvType || IDT.SRV_TYPE_CONF_JOIN == b.SrvType) {
        if (b.ucVRx || b.ucVTx) {
          b.bIsGCall = false
        } else {
          b.bIsGCall = true
        }
      } else {
        b.bIsGCall = false
      }
      return 0
    };
    b.RecvModifyAckProc = function (c) {
      return 0
    };
    b.UserSendInfo = function (c, d) {
      return m_IDT_INST.LinkSendJson(m_IDT_INST.McLink, {
        MsgCode: IDT.MSG_CC_INFO,
        SrcFsm: b.uiMyId,
        DstFsm: b.uiPeerFsmId,
        MsgBody: {
          UsrNum: b.strMyNum,
          Info: {
            Info: c,
            InfoStr: d
          }
        }
      })
    };
    b.CallMicCtrl = function (c) {
      if (false == b.bInit) {
        return 0
      }
      if (null != b.TimerPress) {
        b.bPressUserWant = c;
        PUtility.Log("CCFsm[", b.uiMyId, "]", PUtility.PGetCurTime(), "bUserWantMic:", b.bUserWantMic, "bPressUserWant:", b.bPressUserWant);
        return 0
      }
      b.bUserNotify = true;
      b.bUserWantMic = c;
      b.bPressUserWant = c;
      b.ucLastMic = b.ucATx;
      b.MicCtrl();
      b.MicInd(true);
      b.PressTimer = setTimeout(b.TmPress, b.CPTM_CC_PRESS_LEN)
    };
    b.MicInd = function (d) {
      if (false == b.bUserNotify) {
        return 0
      }
      if (false == b.bConnected) {
        return 0
      }
      var c = false;
      if (d) {
        if (b.ucLastMic == b.ucATx) {
          c = true
        }
      } else {
        if (2 == b.ucLastMic || b.ucLastMic != b.ucATx) {
          c = true
        }
      }
      if (c && m_IDT_INST.CallBack.onCallInd) {
        m_IDT_INST.CallBack.onCallInd(IDT.CALL_EVENT_MicInd, b.UserCtx, b.ucATx)
      }
      b.ucLastMic = b.ucATx;
      return 0
    };
    b.MicCtrl = function () {
      if (false == b.bUserNotify) {
        return 0
      }
      if (false == b.bConnected) {
        return 0
      }
      if (b.bUserWantMic) {
        if (0 == b.ucATx || IDT.SRV_INFO_MICREL == b.ucLastMicReq) {
          PUtility.Log("CCFsm[", b.uiMyId, "]", PUtility.PGetCurTime(), "Send MicReq");
          b.UserSendInfo(IDT.SRV_INFO_MICREQ, "");
          b.ucLastMicReq = IDT.SRV_INFO_MICREQ
        }
      } else {
        if (b.ucATx || IDT.SRV_INFO_MICREQ == b.ucLastMicReq) {
          PUtility.Log("CCFsm[", b.uiMyId, "]", PUtility.PGetCurTime(), "Send MicRel");
          b.UserSendInfo(IDT.SRV_INFO_MICREL, "");
          b.ucLastMicReq = IDT.SRV_INFO_MICREL
        }
      }
      return 0
    };
    b.ProcPeerMsg = function (c, d) {
      if (false == b.bInit) {
        return -1
      }
      b.iHBCount = 0;
      switch (c.MsgCode) {
        case IDT.MSG_CC_SETUP:
          b.RecvSetupProc(c);
          break;
        case IDT.MSG_CC_SETUPACK:
          b.RecvSetupAckProc(c);
          break;
        case IDT.MSG_CC_ALERT:
          b.RecvAlertProc(c);
          break;
        case IDT.MSG_CC_CONN:
          b.RecvConnProc(c);
          break;
        case IDT.MSG_CC_CONNACK:
          b.RecvConnAckProc(c);
          break;
        case IDT.MSG_CC_INFO:
          b.RecvInfoProc(c, d);
          break;
        case IDT.MSG_CC_INFOACK:
          b.RecvInfoAckProc(c);
          break;
        case IDT.MSG_CC_MODIFY:
          b.RecvModifyProc(c);
          break;
        case IDT.MSG_CC_MODIFYACK:
          b.RecvModifyAckProc(c);
          break;
        case IDT.MSG_CC_REL:
          b.RecvRelProc(c);
          break;
        case IDT.MSG_CC_RLC:
          b.RecvRlcProc(c);
          break;
        case IDT.MSG_MA_OPENRSP:
          b.RecvMaOpenRsp(c);
          break;
        case IDT.MSG_MA_REL:
          break;
        default:
          break
      }
      return 0
    };
    b.TmHB = function () {
      if (null == b.bInit) {
        return 0
      }
      b.iHBCount++;
      if (b.iHBCount >= 3) {
        PUtility.Log("CCFsm[", b.uiMyId, "]", PUtility.PGetCurTime(), "TmHB_Disc");
        b.Rel(IDT.CLOSE_BYINNER, IDT.CAUSE_EXPIRE_IDT + IDT.CPTM_CC_HB * 256 + IDT.CAUSE_TIMER_EXPIRY, null)
      } else {
        m_IDT_INST.LinkSendJson(m_IDT_INST.McLink, {
          MsgCode: IDT.MSG_HB,
          SrcFsm: b.uiMyId,
          DstFsm: b.uiPeerFsmId
        });
        m_IDT_INST.LinkSendJson(m_IDT_INST.MediaALink, {
          MsgCode: IDT.MSG_HB,
          SrcFsm: b.uiMyId,
          DstFsm: b.dwMediaAFsmId
        });
        b.TimerHB = setTimeout(b.TmHB, b.CPTM_CC_HB_LEN)
      }
    };
    b.TmSetupAck = function () {
      PUtility.Log("CCFsm[", b.uiMyId, "]", PUtility.PGetCurTime(), "TmSetupAck");
      b.Rel(IDT.CLOSE_BYINNER, IDT.CAUSE_EXPIRE_IDT + IDT.CPTM_CC_SETUPACK * 256 + IDT.CAUSE_TIMER_EXPIRY, null)
    };
    b.TmConn = function () {
      PUtility.Log("CCFsm[", b.uiMyId, "]", PUtility.PGetCurTime(), "TmConn");
      b.Rel(IDT.CLOSE_BYINNER, IDT.CAUSE_EXPIRE_IDT + IDT.CPTM_CC_CONN * 256 + IDT.CAUSE_TIMER_EXPIRY, null)
    };
    b.TmAnswer = function () {
      PUtility.Log("CCFsm[", b.uiMyId, "]", PUtility.PGetCurTime(), "TmAnswer");
      b.Rel(IDT.CLOSE_BYINNER, IDT.CAUSE_EXPIRE_IDT + IDT.CPTM_CC_ANSWER * 256 + IDT.CAUSE_TIMER_EXPIRY, null)
    };
    b.TmConnAck = function () {
      PUtility.Log("CCFsm[", b.uiMyId, "]", PUtility.PGetCurTime(), "TmConnAck");
      b.Rel(IDT.CLOSE_BYINNER, IDT.CAUSE_EXPIRE_IDT + IDT.CPTM_CC_CONNACK * 256 + IDT.CAUSE_TIMER_EXPIRY, null)
    };
    b.TmPress = function () {
      PUtility.Log("CCFsm[", b.uiMyId, "]", PUtility.PGetCurTime(), "TmPress", b.bPressUserWant);
      b.bUserNotify = true;
      b.bUserWantMic = b.bPressUserWant;
      b.ucLastMic = b.ucATx;
      b.MicCtrl();
      b.MicInd(true);
      if (null != b.TimerPress) {
        clearTimeout(b.TimerPress);
        b.TimerPress = null
      }
    };
    b.SetMedia_IE = function (f, i, k, d, l, j, h) {
      if (true == b.createAnswerFlag) {
        return 0
      }
      b.ucARx = f;
      b.ucATx = i;
      b.ucVRx = k;
      b.ucVTx = d;
      b.idLocalV = l;
      b.idPeerV = j;
      var e = {
        type: "offer",
        sdp: ""
      };
      b.MySdp = e;
      if (null != b.idLocalV) {
        var g = {
          ATx: i,
          VTx: d
        };
        var c = JSON.stringify(g);
        b.idLocalV.getUserMedia(c)
      }
      if (null != b.idPeerV) {
        var g = {
          ARx: f,
          ATx: i,
          VRx: k,
          VTx: d
        };
        var c = JSON.stringify(g);
        b.MySdp.sdp = b.idPeerV.CreateOffer(c)
      }
      b.onCreateOfferSuccessSendMsg_IE();
      if (IDT.SRV_TYPE_WATCH_DOWN == h) {
        if (false == b.tmp_bSetVolume) {
          b.idPeerV.setPeerVolume(0);
          b.tmp_bSetVolume = true
        }
      }
      b.createAnswerFlag = true;
      return 0
    };
    b.SetMedia_WebRTPFunc = function (g, k, n, d, o, m, j) {
      if (true == b.createAnswerFlag) {
        return 0
      }
      b.ucARx = g;
      b.ucATx = k;
      b.ucVRx = n;
      b.ucVTx = d;
      b.idLocalV = o;
      b.idPeerV = m;
      if (IDT.SRV_TYPE_WATCH_DOWN == j) {
        if (null != b.idPeerV) {
          if (false == b.tmp_bSetVolume) {
            try {
              b.idPeerV.volume = 0
            } catch (i) {}
            b.tmp_bSetVolume = true
          }
        }
      } else {
        if (null != b.idPeerV) {
          try {
            b.idPeerV.volume = 1
          } catch (i) {}
          b.tmp_bSetVolume = true
        }
      }
      var l;
      if (null == b.LocalStream) {
        l = m_IDT_INST.LocalStream
      } else {
        l = b.LocalStream
      }
      if (1 == b.ucVTx) {
        b.idLocalV.srcObject = l
      }
      if ((g || k) && (null != b.PeerConn) && false == PUtility.isEmpty(l)) {
        var c;
        c = l.getAudioTracks();
        if (false == PUtility.isEmpty(c)) {
          PUtility.Log(" ", PUtility.PGetCurTime(), "Added Audio stream to LocalConn");
          b.PeerConn.addTrack(c[0])
        }
      }
      if ((n || d) && (null != b.PeerConn) && false == PUtility.isEmpty(l)) {
        if (IDT.SRV_TYPE_WATCH_DOWN != j) {
          var h;
          h = l.getVideoTracks();
          if (false == PUtility.isEmpty(h)) {
            const f = {
              width: {
                min: 640,
                ideal: 1280
              },
              height: {
                min: 480,
                ideal: 720
              },
            };
            h[0].applyConstraints(f);
            PUtility.Log(" ", PUtility.PGetCurTime(), "Added Video stream to LocalConn");
            b.PeerConn.addTrack(h[0])
          }
        }
      }
      PUtility.Log(" ", PUtility.PGetCurTime(), "self.PeerConn.createAnswer()");
      b.PeerConn.createAnswer().then(b.onCreateAnswerSuccess, b.onCreateAnswerError);
      b.createAnswerFlag = true;
      return 0
    };
    b.GotStream = function (c) {
      PUtility.Log("CCFsm[", b.uiMyId, "]", PUtility.PGetCurTime(), "GotStream");
      b.LocalStream = c;
      b.SetMedia_WebRTPFunc(b.tmp_ucARx, b.tmp_ucATx, b.tmp_ucVRx, b.tmp_ucVTx, b.tmp_idLocalV, b.tmp_idPeerV, b.tmp_SrvType)
    };
    b.SetMedia_WebRTCProc = function (e, h, k, c, l, i, g) {
      if (null != b.LocalStream) {
        return b.SetMedia_WebRTPFunc(e, h, k, c, l, i, g)
      }
      var d, m;
      if (1 == e || 1 == h) {
        d = true
      } else {
        d = false
      }
      if (IDT.SRV_TYPE_WATCH_DOWN == g) {
        if (1 != h) {
          d = false
        }
      }
      if (1 == k || 1 == c) {
        m = true
      } else {
        m = false
      }
      if (IDT.SRV_TYPE_WATCH_DOWN == g) {
        if (1 != c) {
          m = false
        }
      }
      if (PUtility.isEmpty(m_IDT_INST.AudioInList)) {
        d = false
      }
      if (PUtility.isEmpty(m_IDT_INST.VideoInList)) {
        m = false
      }
      var f = {},
        j = {};
      if (true == d) {
        f.deviceId = {
          exact: m_IDT_INST.AudioInList[0].deviceId
        };
        if (true == m) {
          j.deviceId = {
            exact: m_IDT_INST.VideoInList[0].deviceId
          };
          navigator.mediaDevices.getUserMedia({
            audio: f,
            video: j
          }).then(b.GotStream)
        } else {
          navigator.mediaDevices.getUserMedia({
            audio: f,
            video: false
          }).then(b.GotStream)
        }
      } else {
        if (true == m) {
          j.deviceId = {
            exact: m_IDT_INST.VideoInList[0].deviceId
          };
          navigator.mediaDevices.getUserMedia({
            audio: false,
            video: j
          }).then(b.GotStream)
        } else {
          b.SetMedia_WebRTPFunc(b.tmp_ucARx, b.tmp_ucATx, b.tmp_ucVRx, b.tmp_ucVTx, b.tmp_idLocalV, b.tmp_idPeerV, b.tmp_SrvType)
        }
      }
    };
    b.onCreateAnswerError = function (c) {
      PUtility.Log("CCFsm[", b.uiMyId, "]", PUtility.PGetCurTime(), "onCreateAnswerError", c)
    };
    b.onSetLocalSuccess = function (c) {
      PUtility.Log("CCFsm[", b.uiMyId, "]", PUtility.PGetCurTime(), "onSetLocalSuccess:", c)
    };
    b.onSetLocalError = function (c) {
      PUtility.Log("CCFsm[", b.uiMyId, "]", PUtility.PGetCurTime(), "onSetLocalError", c)
    };
    b.onSetRemoteSuccess = function () {
      PUtility.Log("CCFsm[", b.uiMyId, "]", PUtility.PGetCurTime(), "onSetRemoteSuccess:")
    };
    b.onSetRemoteError = function (c) {
      PUtility.Log("CCFsm[", b.uiMyId, "]", PUtility.PGetCurTime(), "onSetRemoteError", c)
    };
    b.onIceStateChange = function (d, c) {
      if (null == b.PeerConn) {
        PUtility.Log("CCFsm[", b.uiMyId, "]", PUtility.PGetCurTime(), "onIceLocalStateChange:", c)
      } else {
        PUtility.Log("CCFsm[", b.uiMyId, "]", PUtility.PGetCurTime(), "onIceLocalStateChange:", c, b.PeerConn.iceConnectionState)
      }
    };
    b.onAddIcePeerCandidateSuccess = function (c) {
      PUtility.Log("CCFsm[", b.uiMyId, "]", PUtility.PGetCurTime(), "onAddIcePeerCandidateSuccess:", c)
    };
    b.onAddIcePeerCandidateError = function (d, c) {
      PUtility.Log("CCFsm[", b.uiMyId, "]", PUtility.PGetCurTime(), "onAddIcePeerCandidateError:", d, c)
    };
    b.onIceCandidate = function (e, d) {
      PUtility.Log("CCFsm[", b.uiMyId, "]", PUtility.PGetCurTime(), "onIceCandidate:", d);
      if (null == d.candidate) {
        return
      }
      return;
      var c = JSON.stringify(d.candidate);
      b.UserSendInfo(IDT.SRV_INFO_ICECAND, c)
    };
    b.onCreateAnswerSuccess = function (c) {
      PUtility.Log("CCFsm[", b.uiMyId, "]", PUtility.PGetCurTime(), "onCreateAnswerSuccess:", c);
      PUtility.Log("CCFsm[", b.uiMyId, "]", PUtility.PGetCurTime(), "onCreateAnswerSuccess-sdp:", c.sdp);
      c.sdp = b.FormatSdp(c.sdp, b.ucARx, b.ucATx, b.ucVRx, b.ucVTx, b.SrvType, b.bIsGCall);
      PUtility.Log(" ", PUtility.PGetCurTime(), "self.PeerConn.setLocalDescription", c.sdp);
      b.PeerConn.setLocalDescription(c).then(function () {
        b.onSetLocalSuccess(c)
      }, b.onSetLocalError);
      b.MySdp = c;
      b.onCreateAnswerSuccessSendMsg();
      return
    };
    b.onTrack = function (d, c) {
      PUtility.Log("CCFsm[", b.uiMyId, "]", PUtility.PGetCurTime(), "onTrack:", c);
      if (IDT.SRV_TYPE_CONF == b.SrvType || IDT.SRV_TYPE_CONF_JOIN == b.SrvType) {
        if (b.idPeerV.srcObject !== c.streams[0]) {
          b.idPeerV.srcObject = c.streams[0];
          PUtility.Log(PUtility.PGetCurTime(), "onTrack:", b.idPeerV)
        }
      } else {
        if (1 == b.ucARx || 1 == b.ucVRx) {
          if (b.idPeerV.srcObject !== c.streams[0]) {
            b.idPeerV.srcObject = c.streams[0];
            PUtility.Log(PUtility.PGetCurTime(), "onTrack:", b.idPeerV)
          }
        }
      }
    };
    b.SetMedia_MediaA = function (c, g, f, i, e, d, h) {
      if (true == b.createAnswerFlag) {
        return 0
      }
      msg = {
        MsgCode: IDT.MSG_MA_OPENREQ,
        SrcFsm: b.uiMyId,
        DstFsm: b.FSMID_ERROR,
        MsgBody: {
          MyNum: b.strMyNum,
          PeerNum: b.strPeerNum,
          PeerSdp: {
            ARx: b.ucATx,
            ATx: b.ucARx,
            VRx: b.ucVTx,
            VTx: b.ucVRx,
            SdpStrType: b.MgSdp.type,
            SdpStr: b.MgSdp.sdp
          }
        }
      };
      m_IDT_INST.LinkSendJson(m_IDT_INST.MediaALink, msg);
      return 0
    };
    b.SetMediaASdpFunc = function (e) {
      var d = {};
      b.SdpGetMyAttrFromPeer(e, d);
      b.ucARx = d.ARx;
      b.ucATx = d.ATx;
      b.ucVRx = d.VRx;
      b.ucVTx = d.VTx;
      var g = new RegExp("<br/>", "g");
      var c = e.SdpStr;
      var i = c.replace(g, "\r\n");
      var f = new RegExp("a=setup:passive", "g");
      var h = i.replace(f, "a=setup:actpass");
      b.MediaASdp = {
        type: "offer",
        sdp: h
      };
      b.PeerSdp = b.MediaASdp;
      if (false == b.IsMediaA()) {
        return 0
      }
      if (true == b.SetPeerSdp) {
        return 0
      }
      PUtility.Log("CCFsm[", b.uiMyId, "]", PUtility.PGetCurTime(), "SetMediaASdpFunc:", b.PeerSdp.sdp);
      b.PeerConn.setRemoteDescription(b.PeerSdp).then(b.onSetRemoteSuccess, b.onSetRemoteError);
      b.SetPeerSdp = true;
      return 0
    };
    b.RecvMaOpenRsp = function (c) {
      if (false == b.bInit) {
        return 0
      }
      b.dwMediaAFsmId = c.SrcFsm;
      b.SetMediaASdpFunc(c.MsgBody.MySdp);
      b.SetMedia_WebRTCProc(b.ucARx, b.ucATx, b.ucVRx, b.ucVTx, b.idLocalV, b.idPeerV, b.SrvType);
      msg = {
        MsgCode: IDT.MSG_CC_INFO,
        SrcFsm: b.uiMyId,
        DstFsm: b.uiPeerFsmId,
        MsgBody: {
          UsrNum: b.strMyNum,
          Info: {
            Info: IDT.SRV_INFO_SDP,
            InfoStr: ""
          },
          MySdp: {
            ARx: b.ucARx,
            ATx: b.ucATx,
            VRx: b.ucVRx,
            VTx: b.ucVTx,
            SdpStrType: c.MsgBody.PeerSdp.SdpStrType,
            SdpStr: c.MsgBody.PeerSdp.SdpStr
          }
        }
      };
      m_IDT_INST.LinkSendJson(m_IDT_INST.McLink, msg);
      return 0
    }
  }
  return a
});
"use strict";
var m_IDT_INST = null;
(function (b, a) {
  if (typeof define === "function" && define.amd) {
    define([], a)
  } else {
    b.CIdtApi = a()
    // if (typeof module !== "undefined" && module.exports) {
    //   module.exports = a()
    // } else {
    //   b.CIdtApi = a()
    // }
  }
})(this, function () {
  function a() {
    var b = this;
    b.RUN_MODE = 1;
    b.RUN_MODE_RELEASE = 0;
    b.RUN_MODE_DEBUG_1 = 1;
    b.RUN_MODE_DEBUG_2 = 2;
    b.bInit = false;
    b.bIsIe = null;
    b.strSrvUrl = null;
    b.strUserId = null;
    b.strUserPwd = null;
    b.bWss = null;
    b.strUserNum = null;
    b.strUserName = null;
    b.McLink = null;
    b.strGpsSrvUrl = null;
    b.strStunServer = null;
    b.GsLink = null;
    b.strGpsServer = null;
    b.strFtpServer = null;
    b.strFtpUser = null;
    b.strFtpPwd = null;
    b.strTaskInfo = null;
    b.MyOrg = null;
    b.UsrType = null;
    b.UsrAttr = null;
    b.Token = null;
    b.CallBack = null;
    b.TransMgr = null;
    b.CC = null;
    b.LocalStream = null;
    b.GUSubsTable = null;
    b.GpsSubsTable = null;
    b.ScanTimer = null;
    b.GUScanPos = null;
    b.GpsScanPos = null;
    b.AudioInList = [];
    b.AudioOutList = [];
    b.VideoInList = [];
    b.MediaALink = null;
    b.GotStream = function (c) {
      PUtility.Log("IdtApi", PUtility.PGetCurTime(), "Got local stream");
      b.LocalStream = c
    };
    b.gotDevices = function (g) {
      var d = 0;
      var c = [],
        f = [],
        e = [];
      for (d = 0; d < g.length; d++) {
        if (g[d].kind === "audioinput") {
          b.AudioInList.push(g[d])
        } else {
          if (g[d].kind === "audiooutput") {
            b.AudioOutList.push(g[d])
          } else {
            if (g[d].kind === "videoinput") {
              b.VideoInList.push(g[d])
            }
          }
        }
      }
    };
    b.Start = function (g, e, f, d, j, h, k, c, l, i) {
      if (true == b.bInit) {
        if (b.strSrvUrl == g && b.strUserId == f && b.strUserPwd == d && 3 == b.McLink.Status) {
          return 0
        }
        b.Exit()
      }
      m_IDT_INST = b;
      if (b.RUN_MODE_DEBUG_2 == b.RUN_MODE) {
        if (i) {
          PUtility.Log = PUtility.Log2
        } else {
          PUtility.Log = console.log
        }
      } else {
        PUtility.Log = PUtility.Log1
      }
      b.strSrvUrl = g;
      b.strGpsSrvUrl = e;
      b.strUserId = f;
      b.strUserPwd = d;
      b.CallBack = l;
      b.bIsIe = i;
      if (-1 == b.strSrvUrl.indexOf("wss")) {
        b.bWss = false
      } else {
        b.bWss = true
      }
      b.strStunServer = b.strSrvUrl.split("//")[1];
      b.strStunServer = b.strStunServer.split(":")[0];
      b.strStunServer = "stun:" + b.strStunServer + ":10101";
      b.McLink = new CWsLink();
      b.McLink.Start("McLink", g, true, f, d, b.CallBack.onStatusInd, b.onWsLinkMcMessage, b.CallBack.onSendMsgHook);
      b.TransMgr = new FsmMgr();
      b.TransMgr.Start("TransMgr", j, TransFsm);
      b.CC = new FsmMgr();
      b.CC.Start("CCMgr", h, CCFsm);
      b.GUSubsTable = new FsmMgr();
      b.GUSubsTable.Start("StatusSubsMgr", k, SubsFsm);
      b.GpsSubsTable = new FsmMgr();
      b.GpsSubsTable.Start("GpsSubsMgr", c, SubsFsm);
      b.ScanTimer = setTimeout(b.TmScan, 1000);
      b.GUScanPos = 0;
      b.GpsScanPos = 0;
      if (null == b.GsLink && "" != b.strGpsSrvUrl) {
        b.GsLink = new CWsLink();
        b.GsLink.Start("GsLink", b.strGpsSrvUrl, false, null, null, b.onWsLinkGpsStatus, b.onWsLinkGsMessage, b.CallBack.onSendMsgHook)
      }
      b.MediaALink = new CWsLink();
      b.MediaALink.Start("MediaALink", "ws://127.0.0.1:59872", false, null, null, b.onMediaALinkStatus, b.onMediaALinkMessage, b.CallBack.onSendMsgHook);
      b.bInit = true;
      if (false == b.bIsIe) {
        if (false == PUtility.isEmpty(navigator.mediaDevices)) {
          navigator.mediaDevices.enumerateDevices().then(b.gotDevices);
          if (false == b.bWss) {
            navigator.mediaDevices.getUserMedia({
              audio: true,
              video: true
            }).then(b.GotStream)
          }
        }
      }
      return 0
    };
    b.Exit = function () {
      if (false == b.bInit) {
        return 0
      }
      b.McLink.Exit();
      b.McLink = null;
      if (null != b.CallBack.onStatusInd) {
        b.CallBack.onStatusInd(0, IDT.CAUSE_ZERO)
      }
      if (null != b.GsLink) {
        b.GsLink.Exit();
        b.GsLink = null
      }
      if (null != b.MediaALink) {
        b.MediaALink.Exit();
        b.MediaALink = null
      }
      b.CC.Exit();
      try {
        b.LocalStream.getAudioTracks()[0].stop()
      } catch (c) {}
      try {
        b.LocalStream.getVideoTracks()[0].stop()
      } catch (c) {}
      if (null != b.ScanTimer) {
        PUtility.Log("IdtApi", PUtility.PGetCurTime(), "Stop ScanTimer");
        clearTimeout(b.ScanTimer);
        b.ScanTimer = null
      }
      b.GUSubsTable.Exit();
      b.GpsSubsTable.Exit();
      b.bIsIe = null;
      b.strSrvUrl = null;
      b.strUserId = null;
      b.strUserPwd = null;
      b.bWss = null;
      b.strUserNum = null;
      b.strUserName = null;
      b.McLink = null;
      b.strGpsSrvUrl = null;
      b.strStunServer = null;
      b.GsLink = null;
      b.strGpsServer = null;
      b.strFtpServer = null;
      b.strFtpUser = null;
      b.strFtpPwd = null;
      b.strTaskInfo = null;
      b.MyOrg = null;
      b.UsrType = null;
      b.UsrAttr = null;
      b.Token = null;
      b.CallBack = null;
      b.TransMgr = null;
      b.CC = null;
      b.LocalStream = null;
      b.GUSubsTable = null;
      b.GpsSubsTable = null;
      b.ScanTimer = null;
      b.GUScanPos = null;
      b.GpsScanPos = null;
      b.LocalStream = null;
      b.GUSubsTable = null;
      b.GpsSubsTable = null;
      b.GUScanPos = null;
      b.GpsScanPos = null;
      b.AudioInList.splice(0, b.AudioInList.length);
      b.AudioOutList.splice(0, b.AudioOutList.length);
      b.VideoInList.splice(0, b.VideoInList.length);
      b.MediaALink = null;
      m_IDT_INST = null;
      b.bInit = null;
      return 0
    };
    b.LinkSendJson = function (c, d) {
      if (PUtility.isEmpty(c)) {
        return -1
      }
      return c.SendJson(d)
    };
    b.ClearAllStatusSubs = function (e, g) {
      var d, f;
      var c = "[";
      for (d = 0, f = 0; d < e.iMaxFsm; d++) {
        if (null == e.Fsm[d]) {
          break
        }
        if (true != e.Fsm[d].bInit) {
          break
        }
        if (0 == f) {
          c += ('{"Num":"' + e.Fsm[d].Num + '","Level":' + IDT.GU_STATUSSUBS_NONE + "}")
        } else {
          c += (',{"Num":"' + e.Fsm[d].Num + '","Level":' + IDT.GU_STATUSSUBS_NONE + "}")
        }
        e.Fsm[d].ClearRun();
        f++
      }
      c += "]";
      if (f <= 0) {
        return 0
      }
      var h = JSON.parse(c);
      if (null == g) {
        return -1
      }
      b.LinkSendJson(g, {
        MsgCode: IDT.MSG_MM_STATUSSUBS,
        MsgBody: {
          UsrNum: b.strUserNum,
          SN: 1,
          StatusSubs: h
        }
      });
      return 0
    };
    b.SendStatusSubsOne = function (e, c, f, d) {
      if (null == c || "" == c) {
        return -1
      }
      if (null == e) {
        return -1
      }
      if (1 == d) {
        xxx = 0
      }
      b.LinkSendJson(e, {
        MsgCode: IDT.MSG_MM_STATUSSUBS,
        MsgBody: {
          UsrNum: b.strUserNum,
          SN: d,
          StatusSubs: [{
            Num: c,
            Level: f
          }]
        }
      });
      return 0
    };
    b.SendStatusSubs = function (m, g, c, n, d) {
      if (null == m || null == g || c < 0 || n > g.iMaxFsm || n < c || n - c > IDT.GU_STATUSSUBS_MAXNUM) {
        return -1
      }
      var e = {};
      e.MsgCode = IDT.MSG_MM_STATUSSUBS;
      e.MsgBody = {};
      e.MsgBody.UsrNum = b.strUserNum;
      e.MsgBody.SN = d;
      e.MsgBody.StatusSubs = [];
      var o = {};
      o.MsgCode = IDT.MSG_MM_STATUSSUBS;
      o.MsgBody = {};
      o.MsgBody.UsrNum = b.strUserNum;
      o.MsgBody.SN = 1;
      o.MsgBody.StatusSubs = [];
      var l, h, f;
      for (l = c, h = 0, f = 0; l < n; l++) {
        if (false == g.Fsm[l].bInit) {
          break
        }
        if (true == g.Fsm[l].First) {
          o.MsgBody.StatusSubs[f] = {};
          o.MsgBody.StatusSubs[f].Num = g.Fsm[l].Num;
          o.MsgBody.StatusSubs[f].Level = g.Fsm[l].Level;
          f++;
          g.Fsm[l].First = false;
          continue
        }
        e.MsgBody.StatusSubs[h] = {};
        e.MsgBody.StatusSubs[h].Num = g.Fsm[l].Num;
        e.MsgBody.StatusSubs[h].Level = g.Fsm[l].Level;
        h++
      }
      if (null == m) {
        return -1
      }
      if (f > 0) {
        b.LinkSendJson(m, o)
      }
      if (h > 0) {
        b.LinkSendJson(m, e)
      }
      return 0
    };
    b.TableSubs = function (e, h, g, d, j, c) {
      PUtility.Log("IdtApi", PUtility.PGetCurTime(), e, d, j);
      if (null == d || "" == d) {
        return -1
      }
      if (null == j || j < IDT.GU_STATUSSUBS_NONE || j > IDT.GU_STATUSQUERY_MAX) {
        return -1
      }
      if (d == IDT.GU_STATUSSUBS_STR_CLEARALL) {
        b.ClearAllStatusSubs(h, g);
        return 0
      }
      if (d == IDT.GU_STATUSSUBS_STR_ALL) {
        b.ClearAllStatusSubs(h, g)
      }
      var f;
      for (f = 0; f < h.iMaxFsm; f++) {
        if (false == h.Fsm[f].bInit) {
          break
        }
        if (d == h.Fsm[f].Num) {
          h.Fsm[f].Level = j;
          if (IDT.GU_STATUSSUBS_NONE == j) {
            h.Remove(f)
          }
          b.SendStatusSubsOne(g, d, j, 1);
          return 0
        }
      }
      if (f >= h.iMaxFsm) {
        return -1
      }
      if (IDT.GU_STATUSSUBS_NONE == j) {
        return 0
      }
      h.Fsm[f].bInit = true;
      h.Fsm[f].Num = d;
      h.Fsm[f].Level = j;
      PUtility.Log(h.ModuleName, PUtility.PGetCurTime(), "Alloc=", f);
      if (true == c) {
        b.SendStatusSubsOne(g, d, j, 1);
        h.Fsm[f].First = false
      }
      return 0
    };
    b.StatusSubs = function (c, d) {
      return b.TableSubs("StatusSubs", b.GUSubsTable, b.McLink, c, d, true)
    };
    b.GpsSubs = function (c, d) {
      if (IDT.GU_STATUSSUBS_STR_ALL == c || IDT.GU_STATUSSUBS_STR_GROUP == c) {
        return -1
      }
      if (d == IDT.GU_STATUSSUBS_QUERY_ONETIME) {
        return b.SendStatusSubsOne(b.GsLink, c, d, 0)
      } else {
        return b.TableSubs("GpsSubs", b.GpsSubsTable, b.GsLink, c, d, false)
      }
    };
    b.GpsReport = function (c, e, h, d, g, f) {
      if (null == c) {
        c = b.strUserNum
      }
      b.LinkSendJson(b.GsLink, {
        MsgCode: IDT.MSG_MM_GPSREPORT,
        MsgBody: {
          GpsRecStr: {
            Num: c,
            Status: 1,
            Count: 1,
            GpsInfo: [{
              Longitude: e,
              Latitude: h,
              Speed: d,
              Direction: g,
              Time: f
            }]
          }
        }
      });
      return 0
    };
    b.GpsHisQuery = function (d, f, e, c) {
      b.LinkSendJson(b.GsLink, {
        MsgCode: IDT.MSG_MM_GPSHISQUERYREQ,
        MsgBody: {
          InvokeNum: b.strUserNum,
          UsrNum: d,
          SN: f,
          GpsQueryExt: {
            EndFlag: 0,
            Page: 0,
            Count: IDT.GPS_REC_MAX,
            StartTime: e,
            EndTime: c
          }
        }
      });
      return 0
    };
    b.TmScan = function () {
      b.ScanTimer = setTimeout(b.TmScan, 1000);
      var e, d = 0,
        c = 0,
        f = Math.floor(b.GpsSubsTable.iMaxFsm / 20);
      d = b.GpsScanPos * f;
      if (((b.GpsScanPos + 1) * f) >= b.GpsSubsTable.iMaxFsm) {
        c = b.GpsSubsTable.iMaxFsm
      } else {
        c = (b.GpsScanPos + 1) * f
      }
      for (e = d; e < c; e += IDT.GU_STATUSSUBS_MAXNUM) {
        if (e + IDT.GU_STATUSSUBS_MAXNUM < c) {
          if (0 != b.SendStatusSubs(b.GsLink, b.GpsSubsTable, e, e + IDT.GU_STATUSSUBS_MAXNUM, 0)) {
            break
          }
        } else {
          if (0 != b.SendStatusSubs(b.GsLink, b.GpsSubsTable, e, c, 0)) {
            break
          }
        }
      }
      if ((b.GpsScanPos * f) >= b.GpsSubsTable.iMaxFsm) {
        b.GpsScanPos = 0
      } else {
        b.GpsScanPos++
      }
      b.GUScanPos++;
      if (b.GUScanPos >= 20) {
        b.GUScanPos = 0;
        b.SendStatusSubs(b.McLink, b.GUSubsTable, 0, b.GUSubsTable.iMaxFsm, 0)
      }
      return 0
    };
    b.OamPreProc = function (d) {
      if (null == d) {
        return -1
      }
      if (false == b.bInit || 3 != b.McLink.Status) {
        d(false, IDT.CAUSE_LINK_DISC, null);
        return -1
      }
      var c = b.TransMgr.Alloc();
      if (c < 0) {
        d(false, IDT.CAUSE_TEMPORARY_FAILURE, null);
        return -1
      }
      b.TransMgr.Fsm[c].Start(d);
      return c
    };
    b.OamPreExProc = function (f, c, e) {
      if (null == f) {
        return -1
      }
      if (false == b.bInit || 3 != b.McLink.Status) {
        f(false, IDT.CAUSE_LINK_DISC, null, null, c);
        return -1
      }
      var d = b.TransMgr.Alloc();
      if (d < 0) {
        f(false, IDT.CAUSE_TEMPORARY_FAILURE, null, null, c);
        return -1
      }
      b.TransMgr.Fsm[d].StartEx(f, c, e);
      return d
    };
    b.OQuery = function (e, d) {
      var c = b.OamPreProc(d);
      if (c < 0) {
        return -1
      }
      b.LinkSendJson(b.McLink, {
        MsgCode: IDT.MSG_OAM_REQ,
        MsgBody: {
          OpCode: IDT.OPT_O_QUERY,
          InvokeNum: b.strUserNum,
          OpSN: c,
          OrgListMgr: [{
            Num: e,
            Name: "",
            Type: 0,
            Desc: "",
            UserNum: 0,
            DsNum: 0,
            GNum: 0,
            EUNum: 0,
            DS0Num: "",
            DS0Pwd: "",
            DSName: "",
            DsIcon: "",
            AppName: "",
            AppIcon: "",
            USegStart: "",
            USegEnd: "",
            GSegStart: "",
            GSegEnd: "",
            DSSegStart: "",
            DSSegEnd: "",
            StartTime: "",
            EndTime: ""
          }]
        }
      });
      return 0
    };
    b.UQuery = function (e, d) {
      var c = b.OamPreProc(d);
      if (c < 0) {
        return -1
      }
      b.LinkSendJson(b.McLink, {
        MsgCode: IDT.MSG_OAM_REQ,
        MsgBody: {
          OpCode: IDT.OPT_USER_QUERY,
          InvokeNum: b.strUserNum,
          OpSN: c,
          UsrNum: e
        }
      });
      return 0
    };
    b.GQuery = function (e, d) {
      var c = b.OamPreProc(d);
      if (c < 0) {
        return -1
      }
      b.LinkSendJson(b.McLink, {
        MsgCode: IDT.MSG_OAM_REQ,
        MsgBody: {
          OpCode: IDT.OPT_G_QUERY,
          InvokeNum: b.strUserNum,
          OpSN: c,
          GNum: e,
          QueryExt: {
            All: 0,
            Group: 0,
            User: 0,
            Order: 0,
            Page: 0,
            Count: 0,
            TotalCount: 0
          }
        }
      });
      return 0
    };
    b.GQueryU = function (e, d) {
      var c = b.OamPreProc(d);
      if (c < 0) {
        return -1
      }
      e.OpCode = IDT.OPT_G_QUERYUSER;
      e.InvokeNum = b.strUserNum;
      e.OpSN = c;
      b.LinkSendJson(b.McLink, {
        MsgCode: IDT.MSG_OAM_REQ,
        MsgBody: e
      });
      return 0
    };
    b.UQueryG = function (c, e) {
      var d = b.OamPreProc(e);
      if (d < 0) {
        return -1
      }
      b.LinkSendJson(b.McLink, {
        MsgCode: IDT.MSG_OAM_REQ,
        MsgBody: {
          OpCode: IDT.OPT_U_QUERYGROUP,
          InvokeNum: b.strUserNum,
          OpSN: d,
          UsrNum: c
        }
      });
      return 0
    };
    b.IMSend = function (e, c, h, f, d, g) {
      b.LinkSendJson(b.McLink, {
        MsgCode: IDT.MSG_MM_PASSTHROUGH,
        MsgBody: {
          MyNum: b.strUserNum,
          PeerNum: h,
          ImInfo: {
            Code: IDT.PTE_CODE_TXREQ,
            Type: c,
            UtSn: e,
            From: b.strUserNum,
            To: "",
            OriTo: h,
            Txt: f,
            FileName: d,
            SourceFileName: g
          }
        }
      });
      return 0
    };
    b.CallCheckFsm = function (c) {
      if (null == c || c < 0 || c >= b.CC.iMaxFsm) {
        return -1
      }
      if (false == b.CC.Fsm[c].m_bInit) {
        return -1
      }
      return 0
    };
    b.CallMakeOut = function (n, r, o, f, l, q, d, e, k, c, j, m, h, p) {
      var g;
      g = b.CC.Alloc();
      if (g < 0) {
        PUtility.Log("IdtApi", PUtility.PGetCurTime(), "CallMakeOut", -1);
        return -1
      }
      g = b.CC.Fsm[g].CallMakeOut(n, r, o, f, l, q, d, b.strUserNum, e, k, c, j, m, h, p);
      if (g < 0) {
        PUtility.Log("IdtApi", PUtility.PGetCurTime(), "CallMakeOut", -1)
      } else {
        PUtility.Log("IdtApi", PUtility.PGetCurTime(), "CallMakeOut", g)
      }
      return g
    };
    b.CallAnswer = function (c, j, f, e, d, h, g, i) {
      if (0 != b.CallCheckFsm(c)) {
        return -1
      }
      b.CC.Fsm[c].UserAnswer(j, f, e, d, h, g, i);
      return 0
    };
    b.CallRel = function (c, e, d) {
      if (0 != b.CallCheckFsm(c)) {
        return -1
      }
      b.CC.Fsm[c].Rel(IDT.CLOSE_BYUSER, d);
      return 0
    };
    b.CallSetPeerVolume = function (c, d) {
      if (0 != b.CallCheckFsm(c)) {
        return -1
      }
      try {
        if (null != b.CC.Fsm[c].idPeerV) {
          if (true == m_IDT_INST.bIsIe) {
            b.CC.Fsm[c].idPeerV.setPeerVolume(d)
          } else {
            b.CC.Fsm[c].idPeerV.volume = d
          }
          b.CC.Fsm[c].tmp_bSetVolume = true
        } else {
          if (null != b.CC.Fsm[c].tmp_idPeerV) {
            if (true == m_IDT_INST.bIsIe) {
              b.CC.Fsm[c].tmp_idPeerV.setPeerVolume(d)
            } else {
              b.CC.Fsm[c].tmp_idPeerV.volume = d
            }
            b.CC.Fsm[c].tmp_bSetVolume = true
          } else {
            return -1
          }
        }
      } catch (f) {
        PUtility.Log("IdtApi", PUtility.PGetCurTime(), f);
        return -1
      }
      return 0
    };
    b.CallSetMyVolume = function (c, d) {
      if (0 != b.CallCheckFsm(c)) {
        return -1
      }
      if (null == b.CC.Fsm[c].idLocalV) {
        return -1
      }
      try {
        if (true == m_IDT_INST.bIsIe) {} else {
          b.CC.Fsm[c].idLocalV.volume = d
        }
      } catch (f) {
        PUtility.Log("IdtApi", PUtility.PGetCurTime(), f);
        return -1
      }
      return 0
    };
    b.CallSendNum = function (c, d) {
      if (0 != b.CallCheckFsm(c)) {
        return -1
      }
      return 0
    };
    b.CallMicCtrl = function (c, d) {
      if (0 != b.CallCheckFsm(c)) {
        return -1
      }
      b.CC.Fsm[c].CallMicCtrl(d)
    };
    b.CallUserCtrl = function (g, i, d, c, f, e, h) {
      return b.LinkSendJson(b.McLink, {
        MsgCode: IDT.MSG_CC_USERCTRL,
        MsgBody: {
          CallUserCtrl: {
            CallRef: g,
            Num: i,
            Op: d,
            AudioRecv: c,
            AudioSend: f,
            VideoRecv: e,
            VideoSend: h
          }
        }
      })
    };
    b.CallConfStatusReq = function (d, c) {
      return b.LinkSendJson(b.McLink, {
        MsgCode: IDT.MSG_CC_CONFSTATUSREQ,
        MsgBody: {
          MyNum: d,
          OpSN: c
        }
      })
    };
    b.CallConfCtrlReq = function (c, f, g, e) {
      if (0 != b.CallCheckFsm(c)) {
        return -1
      }
      var d = e * 256 + g;
      return b.LinkSendJson(b.McLink, {
        MsgCode: IDT.MSG_CC_INFO,
        SrcFsm: b.CC.Fsm[c].uiMyId,
        DstFsm: b.CC.Fsm[c].uiPeerFsmId,
        MsgBody: {
          UsrNum: f,
          Info: {
            Info: d,
            InfoStr: f
          }
        }
      })
    };
    b.CallSendInfo = function (c, d, f, e) {
      if (0 == b.CallCheckFsm(c)) {
        return b.LinkSendJson(b.McLink, {
          MsgCode: IDT.MSG_CC_INFO,
          SrcFsm: b.CC.Fsm[c].uiMyId,
          DstFsm: b.CC.Fsm[c].uiPeerFsmId,
          MsgBody: {
            Info: {
              Info: d,
              InfoStr: f
            }
          }
        })
      } else {
        if (null == e || "" == e) {
          return -1
        }
        return b.LinkSendJson(b.McLink, {
          MsgCode: IDT.MSG_CC_INFO,
          MsgBody: {
            Info: {
              Info: d,
              InfoStr: f
            },
            PeerNum: e
          }
        })
      }
    };
    b.CallGetLocalStream = function (c) {
      if (0 == b.CallCheckFsm(c)) {
        return b.CC.Fsm[c].LocalStream
      } else {
        return null
      }
    };
    b.ForceRel = function (c) {
      return b.LinkSendJson(b.McLink, {
        MsgCode: IDT.MSG_CC_INFO,
        MsgBody: {
          MyNum: b.strUserNum,
          PeerNum: c,
          SrvType: IDT.SRV_TYPE_FORCE_REL
        }
      })
    };
    b.onWsLinkGpsStatus = function (c, e) {
      PUtility.Log("IdtApi", PUtility.PGetCurTime(), "onWsLinkGpsStatus", c, e);
      b.GpsScanPos = 0;
      if (IDT.UT_STATUS_ONLINE != c) {
        return 0
      }
      var d;
      for (d = 0; d < b.GpsSubsTable.iMaxFsm; d++) {
        if (false == b.GpsSubsTable.Fsm[d].bInit) {
          break
        }
        b.SendStatusSubsOne(b.GsLink, b.GpsSubsTable.Fsm[d].Num, b.GpsSubsTable.Fsm[d].Level, 1)
      }
      return 0
    };
    b.onWsLinkGsMessage = function (d) {
      var c;
      if (b.CallBack.onRecvMsgHook && (b.RUN_MODE > b.RUN_MODE_RELEASE)) {
        b.CallBack.onRecvMsgHook("GsLink", d)
      }
      switch (d.MsgCode) {
        case IDT.MSG_MM_GPSRECIND:
          if (null != b.CallBack.onGpsRecInd) {
            b.CallBack.onGpsRecInd(d.MsgBody.GpsRecStr)
          }
          break;
        case IDT.MSG_MM_GPSHISQUERYRSP:
          if (b.CallBack.onGpsHisQueryInd) {
            b.CallBack.onGpsHisQueryInd(d.MsgBody.UsrNum, d.MsgBody.SN, d.MsgBody.GpsQueryExt.EndFlag, d.MsgBody.GpsRecStr)
          }
          if (1 == d.MsgBody.GpsQueryExt.EndFlag) {
            break
          }
          b.LinkSendJson(b.GsLink, {
            MsgCode: IDT.MSG_MM_GPSHISQUERYREQ,
            MsgBody: {
              UsrNum: d.MsgBody.UsrNum,
              SN: d.MsgBody.SN,
              GpsQueryExt: d.MsgBody.GpsQueryExt
            }
          });
          break;
        default:
          break
      }
      return 0
    };
    b.onMediaALinkStatus = function (c, d) {
      PUtility.Log("IdtApi", PUtility.PGetCurTime(), "onMediaALinkStatus", c, d);
      return 0
    };
    b.onMediaALinkMessage = function (d) {
      var c;
      if (b.CallBack.onRecvMsgHook && (b.RUN_MODE > b.RUN_MODE_RELEASE)) {
        b.CallBack.onRecvMsgHook("MediaALink", d)
      }
      c = d.DstFsm;
      if (null == c || c < 0 || c >= b.CC.iMaxFsm) {
        return -1
      }
      b.CC.Fsm[c].ProcPeerMsg(d, b.MediaALink);
      return 0
    };
    b.onWsLinkMcMessage = function (d) {
      var c, e;
      if (b.CallBack.onRecvMsgHook && (b.RUN_MODE > b.RUN_MODE_RELEASE)) {
        b.CallBack.onRecvMsgHook("McLink", d)
      }
      switch (d.MsgCode) {
        case IDT.MSG_MM_REGRSP:
          if (0 != d.MsgBody.Result) {
            break
          }
          b.strUserNum = d.MsgBody.UsrNum;
          if (0 != b.GpsSubsTable.iMaxFsm) {
            if (true == b.bWss) {
              e = "wss://" + d.MsgBody.GpsServerInfoWss + "//gs_wss"
            } else {
              e = "ws://" + d.MsgBody.GpsServerInfo
            }
            if (null == b.strGpsSrvUrl || "" == b.strGpsSrvUrl) {
              if (false == PUtility.isEmpty(d.MsgBody.GpsServerInfoWss)) {
                b.strGpsSrvUrl = e;
                if (null != b.GsLink) {
                  b.GsLink.Exit();
                  b.GsLink = null
                }
                b.GsLink = new CWsLink();
                b.GsLink.Start("GsLink", b.strGpsSrvUrl, false, null, null, b.onWsLinkGpsStatus, b.onWsLinkGsMessage, b.CallBack.onSendMsgHook)
              }
            } else {
              if (null == b.GsLink) {
                b.GsLink = new CWsLink();
                b.GsLink.Start("GsLink", b.strGpsSrvUrl, false, null, null, b.onWsLinkGpsStatus, b.onWsLinkGsMessage, b.CallBack.onSendMsgHook)
              }
            }
          }
          if (null != d.MsgBody.FtpServerInfo) {
            b.strFtpServer = d.MsgBody.FtpServerInfo.IPAddr;
            b.strFtpUser = d.MsgBody.FtpServerInfo.Name;
            b.strFtpPwd = d.MsgBody.FtpServerInfo.Pwd
          }
          if (null != d.MsgBody.GpsServerInfo) {
            b.strGpsServer = d.MsgBody.GpsServerInfo
          }
          if (null != d.MsgBody.TaskServerInfo) {
            b.strTaskInfo = d.MsgBody.TaskServerInfo
          }
          if (null != d.MsgBody.OrgList) {
            b.MyOrg = d.MsgBody.OrgList[0]
          }
          if (null != d.MsgBody.UserType) {
            b.UsrType = d.MsgBody.UserType
          }
          if (null != d.MsgBody.UserAttr) {
            b.UsrAttr = d.MsgBody.UserAttr
          }
          if (null != d.MsgBody.UsrName) {
            b.strUserName = d.MsgBody.UsrName
          }
          if (null != d.MsgBody.UsrNum) {
            b.strUserNum = d.MsgBody.UsrNum
          } else {
            b.strUserNum = b.strUserId
          }
          b.Token = b.McLink.strAuthRsp;
          if (b.CallBack.onGInfoInd) {
            b.CallBack.onGInfoInd(d.MsgBody.UsrGInfo)
          }
          break;
        case IDT.MSG_MM_STATUSNOTIFY:
          if (b.CallBack.onGUStatusInd) {
            b.CallBack.onGUStatusInd(d.MsgBody.GMemberStatus)
          }
          if (0 == d.MsgBody.SN || null == d.MsgBody.UsrNum || null == d.MsgBody.StatusSubs) {
            break
          }
          if (IDT.GU_STATUSSUBS_NONE == d.MsgBody.StatusSubs[0].Level) {
            break
          }
          for (c = 0; c < b.GUSubsTable.iMaxFsm; c++) {
            if (false == b.GUSubsTable.Fsm[c].m_bInit) {
              break
            }
            if (d.MsgBody.StatusSubs[0].Num == b.GUSubsTable.Fsm[c].Num) {
              b.SendStatusSubsOne(b.McLink, b.GUSubsTable.Fsm[c].Num, b.GUSubsTable.Fsm[c].Level, d.MsgBody.SN);
              break
            }
          }
          break;
        case IDT.MSG_MM_PASSTHROUGH:
          switch (d.MsgBody.ImInfo.Code) {
            case IDT.PTE_CODE_TXREQ:
              b.LinkSendJson(b.McLink, {
                MsgCode: IDT.MSG_MM_PASSTHROUGH,
                MsgBody: {
                  MyNum: d.MsgBody.PeerNum,
                  PeerNum: d.MsgBody.MyNum,
                  ImInfo: {
                    Code: IDT.PTE_CODE_TXCFM,
                    Type: d.MsgBody.ImInfo.Type,
                    UtSn: d.MsgBody.ImInfo.UtSn,
                    Sn: d.MsgBody.ImInfo.Sn
                  }
                }
              });
              if (b.CallBack.onIMRecv) {
                b.CallBack.onIMRecv(d.MsgBody.ImInfo.Sn, d.MsgBody.ImInfo.Type, d.MsgBody.ImInfo.From, d.MsgBody.TrueName, d.MsgBody.ImInfo.To, d.MsgBody.ImInfo.OriTo, d.MsgBody.ImInfo.Txt, d.MsgBody.ImInfo.FileName, d.MsgBody.ImInfo.SourceFileName, d.MsgBody.ImInfo.Time)
              }
              break;
            case IDT.PTE_CODE_TXCFM:
              if (b.CallBack.onIMStatusInd) {
                b.CallBack.onIMStatusInd(d.MsgBody.ImInfo.UtSn, d.MsgBody.ImInfo.Sn, d.MsgBody.ImInfo.Type, d.MsgBody.ImInfo.Code);
                break
              }
              break;
            case IDT.PTE_CODE_USRREAD:
              b.LinkSendJson(b.McLink, {
                MsgCode: IDT.MSG_MM_PASSTHROUGH,
                MsgBody: {
                  MyNum: d.MsgBody.PeerNum,
                  PeerNum: d.MsgBody.MyNum,
                  ImInfo: {
                    Code: IDT.PTE_CODE_USRREADCFM,
                    Type: d.MsgBody.ImInfo.Type,
                    UtSn: d.MsgBody.ImInfo.UtSn,
                    Sn: d.MsgBody.ImInfo.Sn
                  }
                }
              });
              break;
            default:
              break
          }
          break;
        case IDT.MSG_OAM_RSP:
          c = d.MsgBody.OpSN;
          if (c < 0 || c > b.TransMgr.iMaxFsm) {
            break
          }
          if (true != b.TransMgr.Fsm[c].bInit) {
            break
          }
          if (null != b.TransMgr.Fsm[c].pfCallBack) {
            switch (d.MsgBody.OpCode) {
              case IDT.OPT_O_QUERY:
                if (0 == d.MsgBody.Cause) {
                  b.TransMgr.Fsm[c].pfCallBack(true, d.MsgBody.Cause, null, d.MsgBody, b.TransMgr.Fsm[c].UserSn)
                } else {
                  b.TransMgr.Fsm[c].pfCallBack(false, d.MsgBody.Cause, null, d.MsgBody, b.TransMgr.Fsm[c].UserSn)
                }
                break;
              case IDT.OPT_USER_QUERY:
              case IDT.OPT_G_QUERY:
              case IDT.OPT_G_QUERYUSER:
              case IDT.OPT_U_QUERYGROUP:
                if (0 == d.MsgBody.Cause) {
                  b.TransMgr.Fsm[c].pfCallBack(true, d.MsgBody.Cause, null, d.MsgBody, b.TransMgr.Fsm[c].UserSn)
                } else {
                  b.TransMgr.Fsm[c].pfCallBack(false, d.MsgBody.Cause, null, d.MsgBody, b.TransMgr.Fsm[c].UserSn)
                }
                break;
              case IDT.OPT_R_QUERY:
                if (0 == d.MsgBody.Cause) {
                  b.TransMgr.Fsm[c].pfCallBack(true, d.MsgBody.Cause, null, d.MsgBody, b.TransMgr.Fsm[c].UserSn);
                  if (1 == d.MsgBody.CommQuery.EndFlag) {
                    break
                  }
                  b.TransMgr.Fsm[c].RestartTimer();
                  b.TransMgr.Fsm[c].Msg.MsgBody.CommQuery = d.MsgBody.CommQuery;
                  b.LinkSendJson(b.McLink, b.TransMgr.Fsm[c].Msg);
                  return 0
                } else {
                  b.TransMgr.Fsm[c].pfCallBack(false, d.MsgBody.Cause, null, d.MsgBody, b.TransMgr.Fsm[c].UserSn)
                }
                break;
              default:
                if (0 == d.MsgBody.Cause) {
                  b.TransMgr.Fsm[c].pfCallBack(true, d.MsgBody.Cause, null, d.MsgBody, b.TransMgr.Fsm[c].UserSn)
                } else {
                  b.TransMgr.Fsm[c].pfCallBack(false, d.MsgBody.Cause, d.MsgBody.CauseStr, d.MsgBody, b.TransMgr.Fsm[c].UserSn)
                }
                break
            }
          }
          b.TransMgr.Fsm[c].ClearRun();
          break;
        case IDT.MSG_OAM_NOTIFY:
          if (null != b.CallBack.onGUOamInd) {
            b.CallBack.onGUOamInd(d.MsgBody.OpCode, d.MsgBody.GNum, d.MsgBody.GName, d.MsgBody.UsrNum, d.MsgBody.UsrName)
          }
          break;
        case IDT.MSG_CC_SETUP:
          c = b.CC.Alloc();
          if (c < 0) {
            break
          }
          b.CC.Fsm[c].ProcPeerMsg(d, b.McLink);
          break;
        case IDT.MSG_CC_SETUPACK:
        case IDT.MSG_CC_ALERT:
        case IDT.MSG_CC_CONN:
        case IDT.MSG_CC_CONNACK:
        case IDT.MSG_CC_INFO:
        case IDT.MSG_CC_INFOACK:
        case IDT.MSG_CC_MODIFY:
        case IDT.MSG_CC_MODIFYACK:
        case IDT.MSG_CC_REL:
        case IDT.MSG_CC_RLC:
        case IDT.MSG_CC_USERCTRL:
        case IDT.MSG_CC_STREAMCTRL:
        case IDT.MSG_CC_CONFSTATUSREQ:
          c = d.DstFsm;
          if (null == c || c < 0 || c >= b.CC.iMaxFsm) {
            break
          }
          b.CC.Fsm[c].ProcPeerMsg(d, b.McLink);
          break;
        case IDT.MSG_CC_CONFSTATUSRSP:
          if (b.CallBack.onCallInd) {
            b.CallBack.onCallInd(IDT.CALL_EVENT_ConfStatusRsp, 0, d.MsgBody)
          }
          break;
        case IDT.MSG_HB:
          if (null == d.SrcFsm || null == d.DstFsm) {
            break
          }
          if (4294967295 != d.SrcFsm || 4294967295 != d.DstFsm) {
            c = d.DstFsm;
            if (null == c || c < 0 || c >= b.CC.iMaxFsm) {
              break
            }
            b.CC.Fsm[c].ProcPeerMsg(d, b.McLink)
          }
          break;
        default:
          break
      }
      return 0
    };
    b.RQuery = function (d, g, c) {
      var f = {
        MsgCode: IDT.MSG_OAM_REQ,
        MsgBody: {
          OpCode: IDT.OPT_R_QUERY,
          InvokeNum: b.strUserNum,
          OpSN: e,
          CommQuery: {
            EndFlag: 0,
            Page: 0,
            Count: IDT.ROUTECFG_QUERYLIST_MAX_COUNT,
            StartTime: "",
            EndTime: ""
          },
          RouteCfg: [d]
        }
      };
      var e = b.OamPreExProc(g, c, f);
      if (e < 0) {
        return -1
      }
      f.MsgBody.OpSN = e;
      b.TransMgr.Fsm[e].Msg.MsgBody.OpSN = e;
      b.LinkSendJson(b.McLink, f);
      return 0
    }
  }
  return a
});