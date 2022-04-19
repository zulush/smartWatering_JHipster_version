import { IZone } from '@/shared/model/zone.model';
import { IBoitier } from '@/shared/model/boitier.model';

export interface IInstallation {
  id?: number;
  dateDabut?: Date;
  dateFin?: Date | null;
  zone?: IZone | null;
  boitier?: IBoitier | null;
}

export class Installation implements IInstallation {
  constructor(
    public id?: number,
    public dateDabut?: Date,
    public dateFin?: Date | null,
    public zone?: IZone | null,
    public boitier?: IBoitier | null
  ) {}
}
