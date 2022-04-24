import express, { Request, Response } from 'express';
import { serve, setup } from 'swagger-ui-express';
import { useContainer, useExpressServer } from 'routing-controllers';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import fs from 'fs';

import { diContainer } from '@shared/helpers/inversify';
import { SwaggerOpenApi } from '@shared/infrastructure/swagger';
import { HandleErrors } from '@shared/infrastructure/http/middlewares/handle-errors';

class App {
  public express: express.Application;

  private swaggerCustomCss: any = fs.readFileSync(
    process.cwd() + '/src/shared/infrastructure/swagger/swagger.css',
    'utf8',
  );

  private routingControllersOptions: any = {
    validation: true,
    classTransformer: true,
    plainToClassTransformOptions: {
      enableImplicitConversion: false,
    },
    defaultErrorHandler: false,
  };

  constructor() {
    this.express = express();
    this.middlewares();
    this.swaggerConfig();
    this.routingControllers();
    this.routes();
  }

  private middlewares(): void {
    this.express.use(helmet());
    this.express.use(cors());
    this.express.use(cookieParser());
    this.express.use(morgan('tiny'));
    this.express.use(express.urlencoded({ extended: false }));
    this.express.use(express.json());
    this.express.use(HandleErrors.setup());
  }

  private routingControllers(): void {
    useContainer(diContainer);
    useExpressServer(this.express, this.routingControllersOptions);
  }

  private swaggerConfig(): void {
    // swagger docs
    const options = {
      explorer: true,
      customCss: this.swaggerCustomCss,
    };

    const spec = SwaggerOpenApi.setup(this.routingControllersOptions);

    this.express.use('/docs', serve, setup(spec, options));
  }

  private routes(): void {
    // route verify api works
    this.express.get('/', (request: Request, response: Response) => {
      response.json({
        message: 'ok',
      });
    });
  }
}

export default new App().express;
