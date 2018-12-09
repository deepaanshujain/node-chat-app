const express = require('express');
//const hbs = require('hbs');
const path = require('path');

var app = express();

var port = process.env.PORT || 3000;
//app.set('view engine', 'hbs');

var publicPath = path.join(__dirname, "../public");
console.log(publicPath);
app.use(express.static(publicPath));

app.listen(port, () => {
	console.log(`App started on Port ${port}`);
});