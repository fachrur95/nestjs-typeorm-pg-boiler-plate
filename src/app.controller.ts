import { Controller, Get, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { version } from '../package.json';

@ApiTags('Default')
@Controller()
export class AppController {
  @Get()
  showDescription(@Res() res: Response) {
    return res.send(
      `
        <!DOCTYPE html>
        
        <html>
          <body>
            <div style="position: absolute; top: 50%; left: 50%; 
            -moz-transform: translateX(-50%) translateY(-50%);
            -webkit-transform: translateX(-50%) translateY(-50%);
            transform: translateX(-50%) translateY(-50%);">
              <center>
                <h1>Pinang Connect</h1>
                <h2>Dashboard Internal Backend Service</h2> 
                <h3>Version ${version}</h3>
              </center>
            </div>        
          </body>
        </html>
      `,
    );
  }
}
