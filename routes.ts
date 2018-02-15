const Router = require('nextjs-dynamic-routes')

const router = new Router()

router.add({
  name: 'index',
  pattern: '/'
})
router.add({
  name: 'redux',
  pattern: '/redux'
})
router.add({
  name: 'story',
  pattern: '/stories/:id'
})

module.exports = router
