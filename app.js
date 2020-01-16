//引入express中间件
const express = require('express');
const app = express();
const path = require('path')

//指定启动服务器到哪个文件夹
app.use(express.static('./api'));

//allow custom header and CORS
// 解决跨域问题
app.all('*',function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');

  if (req.method == 'OPTIONS') {
    res.send(200); /让options请求快速返回/
  }
  else {
    next();
  }
});

// 读取目录的内容
const fs = require('fs');
fs.readdir('api', (err, files)=>{
  if(err) {
    return;
  }
  files.forEach((file)=>{
    let fullpath = path.resolve('api/' + file);
    require(fullpath).api(app);
  });
});


//监听端口建议为3000
app.listen(3000, function () {
    console.log('Web App listening at http://localhost:%s', 3000);
});