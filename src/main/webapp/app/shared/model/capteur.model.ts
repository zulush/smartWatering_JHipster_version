export interface ICapteur {
  id?: number;
  ref?: string | null;
  type?: string | null;
  photoContentType?: string | null;
  photo?: string | null;
}

export class Capteur implements ICapteur {
  constructor(
    public id?: number,
    public ref?: string | null,
    public type?: string | null,
    public photoContentType?: string | null,
    public photo?: string | null
  ) {}
}
