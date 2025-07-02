import { Controller, Get, Query } from '@nestjs/common';
import { FacilityType } from '@prisma/client';
import { FacilitiesService } from './service';

@Controller('facilities')
export class FacilitiesController {
  constructor(private readonly facilitiesService: FacilitiesService) {}

  @Get()
  findAll() {
    return this.facilitiesService.findAll();
  }

  @Get('/type')
  findByType(@Query('type') type: FacilityType) {
    return this.facilitiesService.findByType(type);
  }

  @Get('/nearby')
  findNearby(
    @Query('lat') lat: number,
    @Query('lng') lng: number,
    @Query('radius') radius: number,
  ) {
    return this.facilitiesService.findNearby(lat, lng, radius);
  }
}