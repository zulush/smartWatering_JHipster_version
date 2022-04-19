import { ICapteur } from '@/shared/model/capteur.model';
import { IBoitier } from '@/shared/model/boitier.model';

export interface IConnecte {
  id?: number;
  fonctionnel?: boolean | null;
  branche?: string | null;
  frequence?: number | null;
  marge?: number | null;
  capteur?: ICapteur | null;
  boitier?: IBoitier | null;
}

export class Connecte implements IConnecte {
  constructor(
    public id?: number,
    public fonctionnel?: boolean | null,
    public branche?: string | null,
    public frequence?: number | null,
    public marge?: number | null,
    public capteur?: ICapteur | null,
    public boitier?: IBoitier | null
  ) {
    this.fonctionnel = this.fonctionnel ?? false;
  }
}
