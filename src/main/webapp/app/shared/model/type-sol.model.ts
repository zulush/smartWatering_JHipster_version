export interface ITypeSol {
  id?: number;
  lebelle?: string;
  description?: string | null;
}

export class TypeSol implements ITypeSol {
  constructor(public id?: number, public lebelle?: string, public description?: string | null) {}
}
