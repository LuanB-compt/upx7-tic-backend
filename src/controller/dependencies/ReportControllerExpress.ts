import axios from "axios";
import { Request, Response, Router } from "express";
import multer from "multer";
import { Controller } from "../../interface/controller/Interface";
import { CDNMiddleware } from "../../middleware/CDNMiddleware";
import { ReportService } from "../../service/ReportService";
import { error } from "console";

export class ReportControllerExpress implements Controller {
  private readonly upload: multer.Multer = multer();
  private readonly cdn: CDNMiddleware = new CDNMiddleware();
  private readonly service: ReportService = new ReportService();
  private router: Router;
  private path: string = "/report";

  constructor() {
    this.router = Router();
    this.init_routes();
  }

  private init_routes() {
    this.router.get(this.path, this.get_read.bind(this));
    this.router.get(this.path + "/:id", this.get_readByID.bind(this));
    this.router.get(
      this.path + "/city/close/:city",
      this.get_close_city.bind(this)
    );
    this.router.get(
      this.path + "/city/open/:city",
      this.get_open_city.bind(this)
    );

    this.router.get(this.path + "/:user", this.get_reports_user.bind(this));
    this.router.get(
      this.path + "/user/close/:user",
      this.get_close_user.bind(this)
    );
    this.router.get(
      this.path + "/user/open/:user",
      this.get_open_user.bind(this)
    );

    this.router.get(this.path + "/img/:id", this.render_cdn_img.bind(this));

    this.router.post(
      this.path,
      this.upload.single("file"),
      this.cdn.save_img.bind(this),
      this.post_create.bind(this)
    );

    this.router.put(this.path + "/:id", this.put_update.bind(this));
    this.router.put(this.path + "/upvote/:id", this.put_upvotes.bind(this));
  }

  public get_router() {
    return this.router;
  }

  public async get_read(req: Request, res: Response) {
    const response = await this.service.read();
    if (response != undefined) {
      res.status(200).json(response);
    } else {
      res.status(400).json({ message: "error" });
    }
  }

  public async get_readByID(req: Request, res: Response) {
    const response = await this.service.readByID(+req.params.id);
    if (response != undefined) {
      res.status(200).json(response);
    } else {
      res.status(400).json({ message: "error" });
    }
  }

  public async get_close_city(req: Request, res: Response) {
    const response = await this.service.read_by_city(req.params.city, false);
    if (response != undefined) {
      res.status(200).json(response);
    } else {
      res.status(400).json({ message: "error" });
    }
  }

  public async get_open_city(req: Request, res: Response) {
    const response = await this.service.read_by_city(req.params.city, true);
    if (response != undefined) {
      res.status(200).json(response);
    } else {
      res.status(400).json({ message: "error" });
    }
  }

  public async get_reports_user(req: Request, res: Response) {
    const response = await this.service.read_by_user(req.params.user);
    if (response != undefined) {
      res.status(200).json(response);
    } else {
      res.status(400).json({ message: "error" });
    }
  }

  public async get_close_user(req: Request, res: Response) {
    const response = await this.service.read_by_user(req.params.user, false);
    if (response != undefined) {
      res.status(200).json(response);
    } else {
      res.status(400).json({ message: "error" });
    }
  }

  public async get_open_user(req: Request, res: Response) {
    const response = await this.service.read_by_user(req.params.user, true);
    if (response != undefined) {
      res.status(200).json(response);
    } else {
      res.status(400).json({ message: "error" });
    }
  }

  public async render_cdn_img(req: Request, res: Response) {
    try {
      const idParts = req.params.id.split("/");
      const id = idParts[idParts.length - 1];

      const response = await axios({
        url: `http://127.0.0.1:5000/${id}`,
        method: "get",
        responseType: "stream",
      });

      res.setHeader("Content-Type", response.headers["content-type"]);
      response.data.pipe(res);
    } catch (error) {
      res.status(500).send(error);
    }
  }

  public async post_create(req: Request, res: Response) {
    const response = await this.service.create(res.locals.data);
    if (response != undefined) {
      res.status(200).json(response);
    } else {
      res.status(400).json({ message: "error" });
    }
  }

  public async put_update(req: Request, res: Response) {
    const response = await this.service.update(+req.params.id, req.body);
    if (response != undefined) {
      res.status(200).json(response);
    } else {
      res.status(400).json({ message: "error" });
    }
  }

  public async put_upvotes(req: Request, res: Response) {
    const response = await this.service.upvotes(+req.params.id);
    if (response != undefined) {
      res.status(200).json(response);
    } else {
      res.status(400).json({ message: "error" });
    }
  }

  public async delete_delete(req: Request, res: Response) {
    const response = await this.service.delete(+req.params.id);
    if (response != undefined) {
      res.status(200).json(response);
    } else {
      res.status(400).json({ message: "error" });
    }
  }
}
