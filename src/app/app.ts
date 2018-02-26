import * as express from 'express';
import * as path from 'path';
import * as logger from 'morgan';
import * as bodyParser from 'body-parser';
import * as RateLimit from 'express-rate-limit';
import * as helmet from 'helmet';

import { IndexRoute } from "../routes/index/index";
import { ApiRoute } from '../routes/api/api';

export class Server {

    public app: express.Application;

    public static bootstrap(): Server {
        return new Server();
    }

    constructor() {
        this.app = express();

        this.config();
        this.routes();
    }

    public config() {

        this.app.use('/dist', express.static(path.join(__dirname, '../dist')));

        this.app.set('views', path.join(__dirname, 'templates'));
        this.app.set('view engine', 'pug');

        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(bodyParser.json());

        this.app.use(logger('dev'));

        let limiter = new RateLimit({
            windowMs: 1 * 60 * 1000, // 1 minute
            max: 50, // limit each IP to 50 requests per windowMs
            delayMs: 0 // disable delaying - full speed until the max limit is reached
        });

        //  apply to all requests
        this.app.use(limiter);
        this.app.use(helmet({
            noCache: false
        }));

        // catch 404 and forward to error handler
        this.app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
            let err: any;
            err = new Error('Not Found');
            err.status = 404;

            next(err);
        });

        // error handler
        this.app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
            // set locals, only providing error in development
            res.locals.message = err.message;
            res.locals.error = req.app.get('env') === 'development' ? err : {};

            // render the error page
            res.status(err.status || 500).render('pages/pages/error', {
                layoutId: 'error'
            });
        });

    }

    public routes() {
        let router: express.Router;
        router = express.Router();

        IndexRoute.create(router);
        ApiRoute.create(router);

        this.app.use(router);
    }
}