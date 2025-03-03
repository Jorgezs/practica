export interface Usuario {
  ID: number;
  Nombre: string;
  Apellido: string;
  Edad: number;
  TypeUser: Roles
}

export enum Roles {
  Administrador,
  Usuario
}
