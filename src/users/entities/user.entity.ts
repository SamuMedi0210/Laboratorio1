import { UserGender } from "src/common/enum/roles/userGender";
import { UserRole } from "src/common/enum/roles/userRole";

export class UserEntity {

    id: number;
    name: string;
    age: number;
    photo?: string[];
    email: string;
    password: string;
    role: string;
    gender: string;
    isActive: boolean;
}
