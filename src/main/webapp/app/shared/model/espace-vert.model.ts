import { IZone } from '@/shared/model/zone.model';
import { IExtraUser } from '@/shared/model/extra-user.model';

export interface IEspaceVert {
  id?: number;
  lebelle?: string | null;
  photoContentType?: string | null;
  photo?: string | null;
  zones?: IZone[] | null;
  extraUser?: IExtraUser | null;
}

export class EspaceVert implements IEspaceVert {
  constructor(
    public id?: number,
    public lebelle?: string | null,
    public photoContentType?: string | null,
    public photo?: string | null,
    public zones?: IZone[] | null,
    public extraUser?: IExtraUser | null
  ) {}
}
