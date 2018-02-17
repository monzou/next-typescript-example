const withTs = require('@zeit/next-typescript')
const withSass = require('@zeit/next-sass')
const withBundleAnalyzer = require('@zeit/next-bundle-analyzer')
const { ANALYZE } = process.env

module.exports = withTs(withSass(withBundleAnalyzer({
  analyzeServer: ['server', 'all'].includes(ANALYZE),
  analyzeBrowser: ['browser', 'all'].includes(ANALYZE)
})))
