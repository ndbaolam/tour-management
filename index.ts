import express, { Express } from 'express';
import dotenv from 'dotenv';
import moment from 'moment';
import bodyParser from 'body-parser';

import clientRoutes from './routes/client/index.route';

dotenv.config();

const app: Express = express();
const port: (number | string) = process.env.PORT || 3000;

app.set('views', './views');
app.set('view engine', 'pug');

app.use(express.static('public'));

// App Local Variables
app.locals.moment = moment;

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

//parse application/json
app.use(bodyParser.json());

clientRoutes(app);

app.listen(port, () => {
    console.log(`App listening on port ${port}!`);
});