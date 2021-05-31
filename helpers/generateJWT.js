const jwt = require('jsonwebtoken');


const generateJWT = (uid)=>{

    return new Promise((resolve, reject) => {
        //Los datos que va contener el JWT
        const payload = {uid};

        jwt.sign(payload, process.env.SECRETORPRIVATEKEY, {
            expiresIn:'4h'
        }, (err, token) =>{
            if(err){
                console.log(err);
                reject('No se puedo generar el token')
            }else{
                resolve(token)
            }
        })

    })
    
}

module.exports = {
    generateJWT
}