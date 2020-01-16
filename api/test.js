const Mock = require('mockjs')

function addApi(app) {
  // 调用
  app.post('/test', function(req, res) {
    res.json({
      data: Mock.mock({
        'list|1-10': [{
          'id|+1': 1
        }]
      })
    })
  })
}

module.exports = {"api": addApi};