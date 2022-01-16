const express = require('express');
const bodyparser = require ('body-parser');
const app = express ();

app.use(bodyparser.urlencoded({ extended: false}));
app.use(bodyparser.json());



// database

const db = require('./src/config/config');
const { path } = require('express/lib/application');

// force: true 
db.sequelize.sync({alter: true}).then(()=>{
    console.log('resync {force: true}');
})


// routes
require('./src/router/route')(app);

//  ejs
app.set('view engine', 'ejs');
app.set("views", "src/views");

// static folder
app.use( express.static( "public" ) );



// PORT 
const PORT = process.env.PORT || 5500;

app.listen(PORT,()=>{
console.log(`Server is running on port ${PORT}`);
});