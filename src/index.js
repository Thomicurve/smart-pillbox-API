const app = require('./appConfig');


app.listen(app.get('port'), ()=> {
    console.log('Server Up!');
})