// src/version/version.controller.ts
import { Controller, Get } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Controller('app')
export class VersionController {
  constructor(private readonly configService: ConfigService) {}

  @Get('version')
  getVersion() {
    const minimum = this.configService.get<string>('MINIMUM_VERSION');
    return {
      latestVersion: latest,
      minimumVersion: minimum,
      forceUpdate: force,
      updateUrl: url,
    };
  }
}
