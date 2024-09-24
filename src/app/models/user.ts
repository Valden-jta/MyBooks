export class User {

    public id_user: number;
    public name: string;
    public last_name: string;          
    public user_name: string;          
    public email: string;
    public address: string;
    public password: string;


    constructor(id_user: number, name:string, last_name: string, user_name:string, email: string, address:string, password: string) {
        this.id_user = id_user;
        this.name = name;
        this.last_name = last_name;
        this.user_name = user_name;
        this.email = email;
        this.address = address;
        this.password = password;
    }

    public nombreCompleto():string {
        return this.name + " " + this.last_name;
      }
}
