const express=require('express');
const bodyParser=require('body-parser');
const cookieParser=require('cookie-parser');
const {port}=require('./config/env.config');
const {dbConnect}=require('./config/db.config');
const authRoute=require('./routes/auth.route');
const trendifyRoute=require('./routes/trendify.route');

const app=express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cookieParser());
app.use(authRoute);
app.use(trendifyRoute);

dbConnect();
app.listen(port);
