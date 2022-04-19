import { IZone } from '@/shared/model/zone.model';

export interface IArrosage {
  id?: number;
  date?: Date;
  litresEau?: number | null;
  zone?: IZone | null;
}

export class Arrosage implements IArrosage {
  constructor(public id?: number, public date?: Date, public litresEau?: number | null, public zone?: IZone | null) {}
}
