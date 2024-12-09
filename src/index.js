import connection from './databse.js'
import app from './server.js'


connection()

app.listen(app.get('port'),()=>{
    console.log(`Server Ok on http://localhost:${app.get('port')}`)
})