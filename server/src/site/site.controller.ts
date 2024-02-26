import { BadRequestException, Body, Controller, Delete, Get, Post, Query, Request, UseGuards } from '@nestjs/common';
import { SiteService } from './site.service';
import { Site } from 'src/entities/site.entity';
import { AuthGuard } from 'src/auth/guards/auth.guard';

@Controller('api/site')
export class SiteController {
    constructor(
        private readonly siteService: SiteService,
    ) { }

    @UseGuards(AuthGuard)
    @Get('')
    get() {
        return this.siteService.find();
    }

    @UseGuards(AuthGuard)
    @Post('')
    Post(@Request() req, @Body() body: Partial<Site>) {
        return this.siteService.save({ ...body, userId: req.user.id });
    }

    @UseGuards(AuthGuard)
    @Delete('')
    delete(@Request() req, @Query('id') id: number) {
        if (!id) throw new BadRequestException('id is required');
        return this.siteService.delete(id, req.user.id);
    }
}
