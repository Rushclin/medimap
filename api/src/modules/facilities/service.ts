import { Injectable } from '@nestjs/common';
import { FacilityType } from '@prisma/client';
import { PrismaService } from 'src/providers/prisma/prisma.service';

@Injectable()
export class FacilitiesService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.healthFacility.findMany({
      include: {
        openingHours: true,
        doctors: true,
        stocks: {
          include: {
            medication: true,
          },
        },
      },
    });
  }

  async findByType(type: FacilityType) {
    return this.prisma.healthFacility.findMany({
      where: { type },
      include: {
        openingHours: true,
        doctors: true,
      },
    });
  }

  async findNearby(lat: number, lng: number, radius: number) {
    // Implémentation simplifiée - pour une vraie solution géospatiale,
    // vous devriez utiliser PostGIS ou une extension similaire
    const allFacilities = await this.prisma.healthFacility.findMany({
      include: {
        openingHours: true,
      },
    });

    return allFacilities.filter(facility => {
      const distance = this.calculateDistance(
        lat,
        lng,
        facility.latitude,
        facility.longitude
      );
      return distance <= radius;
    });
  }

  private calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number) {
    // Implémentation de la formule haversine
    const R = 6371; // Rayon de la Terre en km
    const dLat = this.toRad(lat2 - lat1);
    const dLon = this.toRad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.toRad(lat1)) * Math.cos(this.toRad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c * 1000; // Distance en mètres
  }

  private toRad(value: number) {
    return value * Math.PI / 180;
  }
}