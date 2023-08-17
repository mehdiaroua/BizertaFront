export class User {

    id!:number;
    username!: string;
    email!: string;
    password!: string;
    
    role!: Role[];
    selectedRole!: Role;
  }
  export enum ERole {
    ROLE_USER = 'ROLE_USER',
    ROLE_ADMIN = 'ROLE_ADMIN'
  }
  export class Role {
    id!: number;
    name!: ERole;
  }

