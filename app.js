const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const rootDir = require("./util/path");

app = express();
app.set('view engine', 'ejs');
app.set('views', 'views');

const adminR = require("./routes/admin");
const shopR = require("./routes/shop");

app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname, "public")));

app.use('/admin',adminR.routes);
app.use(shopR);

app.use((req,res, next)=>{
    res.status(404).render('404', { pageTitle: 'Page Not Found' , path: '/admin/add-product'});
})
app.listen(3000);
