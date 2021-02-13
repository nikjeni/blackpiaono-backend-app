const express = require('express');
const app = express();
const bodyPraser = require('body-parser');
const cors = require('cors');
const { db } = require('./middleware/db-middleware');
const { userRoutes } = require('./routes/user-routes');
const { pageRoutes } = require('./routes/pages-routes');

app.use(db);
app.use(cors());
app.use(bodyPraser.json());
app.use('/user', userRoutes);
app.use('/pages', pageRoutes);

var port = 3000;
app.listen(3000, () => console.log(`Server is running at ${port}`));