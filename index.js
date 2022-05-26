const ns = require('node-static')
const file = new ns.Server()

require('http').createServer((request, response) => {
  request.addListener('end', () => {
    file.serve(request, response)
  }).resume()
}).listen(process.env.PORT || 5000)
