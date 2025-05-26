// src/version/version.controller.ts
import { Controller, Get } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Controller('app')
export class VersionController {
  constructor(private readonly configService: ConfigService) {}

  @Get('version')
  getVersion() {
    const latest = this.configService.get<string>('LATEST_VERSION');
    const minimum = this.configService.get<string>('MINIMUM_VERSION');
    const force = this.configService.get<string>('FORCE_UPDATE') === 'true';
    const url = this.configService.get<string>('UPDATE_URL');

    return {
      latestVersion: latest,
      minimumVersion: minimum,
      forceUpdate: force,
      updateUrl: url,
    };
  }
}
