export interface ITypePlante {
  id?: number;
  libelle?: string;
  humiditeMax?: number | null;
  humiditeMin?: number;
  temperature?: number | null;
  luminosite?: number | null;
}

export class TypePlante implements ITypePlante {
  constructor(
    public id?: number,
    public libelle?: string,
    public humiditeMax?: number | null,
    public humiditeMin?: number,
    public temperature?: number | null,
    public luminosite?: number | null
  ) {}
}
