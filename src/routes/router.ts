import { NextFunction, Request, Response } from 'express';

export class BaseRoute {

    public render(req: Request, res: Response, view: string, options?: Object) {

        res.render(view, options);

    }

}