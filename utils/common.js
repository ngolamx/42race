module.exports.ensureAuthenticated = function(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/')
}
// Add user info from connection sessions when handle callbacks of webhook
module.exports.attachUserInfo = function(req, res, next) {
  req.sessionStore.all((err, sessions) => {
      if (!sessions) {
        next()
      }
      const id = req.body.owner_id
      const users = Object.values(sessions).map(item => item.passport).filter(item => item)
      const user = users.find(item => item.user.id === id)
      if (user) {
        req.user = user.user;
      }
      next();
  })
}