/*Gestion de jwt*/
//import
let jwt = require('jsonwebtoken')


module.exports = {
    tokenSign : process.env.TOKEN_SECRET,
    getUser: (data) => {
        try {
            let decode = jwt.verify(data, process.env.TOKEN_SECRET);
            return {
                id : decode.userId,
                username: decode.username,
                isAdmin: decode.isAdmin
            }

        } catch (e) {
                return 'Echec !'
        }
    }
}