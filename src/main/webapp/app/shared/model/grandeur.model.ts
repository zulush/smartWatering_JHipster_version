import { IZone } from '@/shared/model/zone.model';

export interface IGrandeur {
  id?: number;
  type?: string;
  valeur?: number;
  unite?: string;
  date?: Date;
  zone?: IZone | null;
}

export class Grandeur implements IGrandeur {
  constructor(
    public id?: number,
    public type?: string,
    public valeur?: number,
    public unite?: string,
    public date?: Date,
    public zone?: IZone | null
  ) {}
}
