import { IInstallation } from '@/shared/model/installation.model';
import { IConnecte } from '@/shared/model/connecte.model';

export interface IBoitier {
  id?: number;
  reference?: number;
  type?: string | null;
  code?: string | null;
  installations?: IInstallation[] | null;
  connexions?: IConnecte[] | null;
}

export class Boitier implements IBoitier {
  constructor(
    public id?: number,
    public reference?: number,
    public type?: string | null,
    public code?: string | null,
    public installations?: IInstallation[] | null,
    public connexions?: IConnecte[] | null
  ) {}
}
