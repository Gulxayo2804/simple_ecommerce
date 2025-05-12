const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const rootDir = require("./util/path");
const errP = require('./controllers/error');

app = express();
app.set('view engine', 'ejs');
app.set('views', 'views');

const adminR = require("./routes/admin");
const shopR = require("./routes/shop");

app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname, "public")));

app.use('/admin',  adminR);
app.use(shopR);

app.use(errP.get404)
app.listen(3000);
