const getters = {
  title: state => state.app.title,
  permission_routers: state => state.permission.routers,
  roles: state => state.user.roles,
  addRoutes: state => state.permission.addRoutes,
  token: state => state.user.token,
};

export default getters