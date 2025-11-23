import { TypeOrmModule } from "@nestjs/typeorm";
import { Module } from '@nestjs/common';
import { City } from "../entities/city.entity";
import { State } from "../entities/state.entity";
import { CityService } from "../services/city.service";
import { StateService } from "../services/state.service";
import { CityController } from "../controllers/city.controller";
import { StateController } from "../controllers/state.controller";

@Module({
  imports: [TypeOrmModule.forFeature([City, State])],
  providers: [CityService, StateService],
  controllers: [CityController, StateController],
})

export class CityModule {}