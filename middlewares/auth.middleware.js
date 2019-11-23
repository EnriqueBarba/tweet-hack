module.exports.isAuthenticated = (req, res, next) => {
  console.log('TODO')
  //si existe una sesión con un usuario se para a la siguiente función
  if (req.session.user) {
    next()
        //si no se direcciona al login para que no pueda navegar por el área de logeados
  } else {
    res.redirect('/login');
  }
}

module.exports.isNotAuthenticated = (req, res, next) => {
  console.log('TODO')
  //si hay una sesión en curso vuelve a la pagina inicial
  if (req.session.user) {
    res.redirect('/');
    //si no continua
  } else {
    next()
  }
}
