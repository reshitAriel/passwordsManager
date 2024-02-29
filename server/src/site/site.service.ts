import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Site } from 'src/entities/site.entity';
import { decryptData, encryptData } from 'src/utils/encrypt';
import { Repository } from 'typeorm';

@Injectable()
export class SiteService {
  constructor(
    @InjectRepository(Site)
    private readonly siteRepository: Repository<Site>,
  ) {}

  async find(userId: string) {
    const sites = await this.siteRepository.find({ where: { userId } });

    return sites.map((site) => {
      site.password = decryptData(site.password);
      return site;
    });
  }

  save(site: Partial<Site>) {
    if (site.password) site.password = encryptData(site.password);

    return this.siteRepository.save(site);
  }

  delete(siteId: number, userId: string) {
    return this.siteRepository.delete({ id: siteId, userId });
  }
}
