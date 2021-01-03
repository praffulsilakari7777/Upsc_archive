const fs = require('fs');
const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const placesRoutes = require('./routes/places-routes');
const usersRoutes = require('./routes/users-routes');
const booksRoutes = require('./routes/books-routes');
const pagesRoutes = require('./routes/pages-routes');
const categoriesRoutes = require('./routes/categories-routes');
const HttpError = require('./models/http-error');

 const app = express();

 app.use(bodyParser.json());

 app.use('/uploads/materialpdfs', express.static(path.join('uploads','materialpdfs')));
 app.use('/uploads/solutionpdfs', express.static(path.join('uploads','solutionpdfs')));
 app.use('/uploads/chapterpdfs', express.static(path.join('uploads','chapterpdfs')));
 app.use('/uploads/images', express.static(path.join('uploads','images')));
 app.use(express.static(path.join('public')));


app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization' );
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
 next();
});

app.use('/api/places', placesRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/books', booksRoutes);
app.use('/api/pages', pagesRoutes);
app.use('/api/category', categoriesRoutes);

app.use((req, res, next) => {
res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
});


// app.use((req, res, next) => {
//    const error = new HttpError('Could not find this route.',404);
//    throw error;
// });
 
app.use((error, req, res, next) => {
  if (req.file) {
    fs.unlink(req.file.path, (err) => {
      console.log(err);
    });
}
  if(res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({message: error.message || 'An unknow error occurred!'});
});


 

 mongoose
 .connect(`mongodb+srv://prafful:Prafful@123@cluster0.zwu4x.mongodb.net/Ncert?retryWrites=true&w=majority`, {
  useNewUrlParser: true
 })
 .then(() => {
   app.listen(process.env.PORT || 80);
   console.log('DB connection successful!');
 })
 .catch(err => {
   console.log(err);
 });



