const jwt = require("jsonwebtoken");


const genJWT = (uid, name) => {

    const payload = { uid, name};

    return new Promise((resolve, reject) => {

            jwt.sign(payload, process.env.SECRET_SEED, {

                expiresIn: '24h',

            }, (err, token) => {

                if(err) {
                    reject(err);
                } else {
                    resolve(token)
                }

            });

    });
}


module.exports = {
    genJWT,
}
