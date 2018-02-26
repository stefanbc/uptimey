import { NextFunction, Request, Response, Router } from "express";
import { BaseRoute } from "../router";

import { BasicModel } from '../../models/basic.model';
import { AdvancedModel } from '../../models/advanced.model';

export class ApiRoute extends BaseRoute {

    public static create(router: Router) {
        console.log("[ApiRoute::create] Creating api routes.");

        router.get('/basic', (req: Request, res: Response, next: NextFunction) => {
            new ApiRoute().basic(req, res, next);
        });

        router.get('/advanced', (req: Request, res: Response, next: NextFunction) => {
            new ApiRoute().advanced(req, res, next);
        });
    }

    constructor(private basicModel?: BasicModel, private advancedModel?: AdvancedModel) {
        super();
    }

    public basic(req: Request, res: Response, next: NextFunction) {

        if (req.xhr) {
            res.json(this.basicModel.gatherData({}));
        } else {
            return next(new Error("Permission denied"));
        }

    }

    public advanced(req: Request, res: Response, next: NextFunction) {

        if (req.xhr) {

            // this.advancedModel.getIpObject((ipObject) => {

                return res.json(
                    this.advancedModel.gatherAdvancedData({
                        // localIp  : ipObject.localIp,
                        // publicIp : ipObject.publicIp
                    })
                );

            // }, next);

        } else {
            return next(new Error("Permission denied"));
        }

    }

}

// /**
//  * Required packages
//  */
// const basic = require('../models/basic');
// const advanced = require('../models/advanced');

// const router = require('express').Router();

// /* GET api endpoint. */
// router.get('/basic', function (req, res, next) {

//     if (req.xhr) {
//         res.json(basic.gatherData());
//     } else {
//         return next(new Error("Permission denied"));
//     }

// });

// /* GET advanced api endpoint. */
// router.get('/advanced', function (req, res, next) {

//     if (req.xhr) {

//         advanced.getIpObject((ipObject) => {

//             return res.json(
//                 advanced.gatherAdvancedData({
//                     localIp  : ipObject.localIp,
//                     publicIp : ipObject.publicIp
//                 })
//             );

//         }, next);

//     } else {
//         return next(new Error("Permission denied"));
//     }

// });

// module.exports = router;
