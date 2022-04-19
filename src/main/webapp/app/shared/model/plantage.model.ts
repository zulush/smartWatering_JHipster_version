import { IPlante } from '@/shared/model/plante.model';
import { IZone } from '@/shared/model/zone.model';

export interface IPlantage {
  id?: number;
  date?: Date;
  nombre?: number;
  plante?: IPlante | null;
  zone?: IZone | null;
}

export class Plantage implements IPlantage {
  constructor(public id?: number, public date?: Date, public nombre?: number, public plante?: IPlante | null, public zone?: IZone | null) {}
}
