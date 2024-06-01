export function apiBaseUrl(routeAPI) {
  if (process.env.NODE_ENV === 'development') {
    return (`http://localhost:3333/${routeAPI}`)
    // return 'http://localhost:3333/users'
  } else {
    return (`https://health-pro.onrender.com/${routeAPI}`)
  }
}