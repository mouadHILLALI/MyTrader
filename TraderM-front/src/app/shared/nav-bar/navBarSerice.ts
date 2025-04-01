import { Injectable } from "@angular/core";
import { NavLinks , User } from "../../types";


@Injectable({
    providedIn: 'root'
})
export class NavBarService {
    private user: User | null = null; 

    constructor() {
        this.loadUser(); 
    }

    private loadUser(): void {
        const storedUser = localStorage.getItem("user");
        this.user = storedUser ? JSON.parse(storedUser) : null;
    }

    public getNavLinks(): NavLinks[] {
        if (this.isAuthenticated() && this.user?.role === "ROLE_USER") {
            return [
                { title: "Dashboard", Link: "/dashboard" },
                { title: "Profile", Link: "/profile" },
                { title: "Logout", Link: "/logout" }
            ];
        } else {
            return [
                { title: "Home", Link: "/" },
                { title: "Login", Link: "/auth/login" },
                { title: "Register", Link: "/auth/register" }
            ];
        }
    }

    public isAuthenticated(): boolean {
        return this.user !== null;
    }
}
