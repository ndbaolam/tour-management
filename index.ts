import express, { Express } from 'express';
import dotenv from 'dotenv';
import moment from 'moment';
import path from 'path';
import bodyParser from 'body-parser';

import clientRoutes from './routes/client/index.route';
import adminRoutes from './routes/admin/index.route';
import { systemConfig } from './config/system';

dotenv.config();

const app: Express = express();
const port: (number | string) = process.env.PORT || 3000;

app.set('views', './views');
app.set('view engine', 'pug');

app.use(express.static(__dirname + '/public'));

// App Local Variables
app.locals.moment = moment;
app.locals.prefixAdmin = systemConfig.prefixAdmin;

// TinyMCE
app.use(
    "/tinymce",
    express.static(path.join(__dirname, "node_modules", "tinymce"))
);
// End TinyMCE

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

//parse application/json
app.use(bodyParser.json());

clientRoutes(app);
adminRoutes(app);

app.listen(port, () => {
    console.log(`App listening on port ${port}!`);
});