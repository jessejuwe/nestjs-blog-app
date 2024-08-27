import { Controller } from '@nestjs/common';
import { AppService } from './app.service';

/**
 * Controller for the application
 */
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
}
