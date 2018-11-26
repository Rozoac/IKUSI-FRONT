import { Autenticacion } from "./autenticacion.model";
export class Url {
  constructor(public autenticacion?: Autenticacion, public direccion?: string) {}
}
