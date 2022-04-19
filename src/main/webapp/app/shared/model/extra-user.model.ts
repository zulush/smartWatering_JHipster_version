import { IUser } from '@/shared/model/user.model';
import { IEspaceVert } from '@/shared/model/espace-vert.model';

export interface IExtraUser {
  id?: number;
  phone?: string | null;
  address?: string | null;
  internalUser?: IUser | null;
  espaceVerts?: IEspaceVert[] | null;
}

export class ExtraUser implements IExtraUser {
  constructor(
    public id?: number,
    public phone?: string | null,
    public address?: string | null,
    public internalUser?: IUser | null,
    public espaceVerts?: IEspaceVert[] | null
  ) {}
}
