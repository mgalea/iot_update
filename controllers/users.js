//const User = require('../models/User')
//const service = require('../services')
const bcrypt = require('bcrypt-nodejs')


function signUp (req, res) {
    console.log('Registering user: ', req.body)
    const user = new User({
        email: req.body.email,
        displayName: req.body.displayName,
        password: req.body.password
    })

    user.save((err) => {
        if (err) res.status(500).send({ message: `Error creating user: ${err}`})

        return res.status(200).send({ token: service.createToken(user) })
    })
}

function signIn (req, res) {    
    console.log('Trying to log in user: ', req.body.email)

    if (!req.body.email) return res.status(200).send({message: 'User does not exist'})

    User.findOne({ email: req.body.email }, (err, user) => {
        console.log('Respuesta de búsqueda', user)

        if(err) return res.status(500).send({ message: err })
        if(!user) return res.status(404).render('login', { title: 'Intenta loguearte de nuevo' })
        console.log('Respuesta de user: ', user.email)

        let userPwd = req.body.password
        let dbPwd = user.password
        console.log('Pwd Usuario: ', req.body.password, 'Pwd Base de Datos: ', user.password)

        bcrypt.compare(userPwd, dbPwd, (error, isMatch) => {
            if (error) return res.status(500).send({ message: error })
            if (!isMatch) {
                console.log('La contraseña No es correcta !isMatch: ', !isMatch)
                return
            } else {
                req.user = user
                res.status(200).send({
                    message: 'User logged in.',
                    token: service.createToken(user)
                })
            }
        })        
    })
}

module.exports = {
    signIn,
    signUp
}