export interface User {
    username: string;
    password: string;
    email: string;
    profileImageUrl: string | null;
    role: string;
    mu: number;
    sigma: number;
    skillIndex: number;
}