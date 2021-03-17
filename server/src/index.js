require('./db/config')
const app = require('./app')

//ahora vamos empezar utilizar el servidor, le vamos a decir que empiece a escuchar y quiero que escuches en tal puerto
app.listen(app.get('port'))
console.log('El servidor se ha levantado en el puerto 3000')
