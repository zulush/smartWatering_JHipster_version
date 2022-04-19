import { ITypePlante } from '@/shared/model/type-plante.model';

export interface IPlante {
  id?: number;
  libelle?: string;
  photoContentType?: string | null;
  photo?: string | null;
  racine?: string | null;
  type?: ITypePlante | null;
}

export class Plante implements IPlante {
  constructor(
    public id?: number,
    public libelle?: string,
    public photoContentType?: string | null,
    public photo?: string | null,
    public racine?: string | null,
    public type?: ITypePlante | null
  ) {}
}
