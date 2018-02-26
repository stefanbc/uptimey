import { NextFunction, Request, Response, Router } from "express";
import { BaseRoute } from "../router";

import { BasicModel } from '../../models/basic.model';

export class IndexRoute extends BaseRoute {

    public static create(router: Router) {
        console.log("[IndexRoute::create] Creating index route.");

        router.get('/', (req: Request, res: Response, next: NextFunction) => {
            new IndexRoute().index(req, res, next);
        });
    }

    constructor(private basicModel?: BasicModel) {
        super();
    }

    public index(req: Request, res: Response, next: NextFunction) {

        // basic.getLocation((location) => {
        let options: Object = {
            layoutId : 'index',
            data     : this.basicModel.gatherData({})
        };
        // }, next);

        this.render(req, res, 'pages/index/index', options);
    }

}

// const basic = require('../models/basic');

// const router = require('express').Router();

// import { IndexPage } from '../../pages/index/index';

// /* GET home page. */
// router.get('/', function (req, res, next) {

//     new IndexPage();

//     basic.getLocation((location) => {

//         return res.render('pages/index/index', {
//             layoutId : 'index',
//             data     : basic.gatherData({
//                 location
//             })
//         });

//     }, next);

// });

// module.exports = router;