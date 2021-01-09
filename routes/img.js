const imgRouter = require("express").Router();
const path = require('path')

imgRouter.get("/:name", async (request, response, next) => {
  const options = {
    root: path.join(process.cwd(), 'img_shop'),
    dotfiles: 'deny',
    headers: {
      'x-timestamp': Date.now(),
      'x-sent': true
    }
  }
  const fileName = request.params.name

  response.sendFile(fileName, options, function (err) {
    if (err) {
      next(err)
    } else {
      console.log('Sent:', fileName)
    }
  })
})

module.exports = imgRouter;