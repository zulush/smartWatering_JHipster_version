import { INotification } from '@/shared/model/notification.model';
import { IGrandeur } from '@/shared/model/grandeur.model';
import { IPlantage } from '@/shared/model/plantage.model';
import { IArrosage } from '@/shared/model/arrosage.model';
import { ITypeSol } from '@/shared/model/type-sol.model';
import { IEspaceVert } from '@/shared/model/espace-vert.model';

export interface IZone {
  id?: number;
  libelle?: string | null;
  superficie?: number | null;
  photoContentType?: string | null;
  photo?: string | null;
  notifications?: INotification[] | null;
  grandeurs?: IGrandeur[] | null;
  plantages?: IPlantage[] | null;
  arrosages?: IArrosage[] | null;
  typeSol?: ITypeSol | null;
  espaceVert?: IEspaceVert | null;
}

export class Zone implements IZone {
  constructor(
    public id?: number,
    public libelle?: string | null,
    public superficie?: number | null,
    public photoContentType?: string | null,
    public photo?: string | null,
    public notifications?: INotification[] | null,
    public grandeurs?: IGrandeur[] | null,
    public plantages?: IPlantage[] | null,
    public arrosages?: IArrosage[] | null,
    public typeSol?: ITypeSol | null,
    public espaceVert?: IEspaceVert | null
  ) {}
}
