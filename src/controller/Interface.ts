export interface Controller {
    init_routes(): any;
    get_read(req: any, res: any): any;
    get_readByID(req: any, res: any): any;
    post_create(req: any, res: any): any;
    put_update(req: any, res: any): any;
    delete_delete(req: any, res: any): any;
};