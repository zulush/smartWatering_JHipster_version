import { IZone } from '@/shared/model/zone.model';

export interface INotification {
  id?: number;
  date?: Date;
  content?: string;
  vu?: boolean;
  zone?: IZone | null;
}

export class Notification implements INotification {
  constructor(public id?: number, public date?: Date, public content?: string, public vu?: boolean, public zone?: IZone | null) {
    this.vu = this.vu ?? false;
  }
}
