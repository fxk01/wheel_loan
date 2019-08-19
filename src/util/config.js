const ENV = process.env.NODE_ENV;
let apiPrefix = '';

if (ENV == 'development') {
  apiPrefix = '/development'
} else if (ENV == 'production') {
  apiPrefix = 'production'
}
export default {
  apiPrefix,
}
