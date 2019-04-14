import { HttpHeaders } from "@angular/common/http";

export class DataConfigModule
{
  public static SERVER = 'https://localhost:44396';

  public static httpOptions = {
    headers: new HttpHeaders({
      "Authorization": "Bearer " + localStorage.getItem("jwt"),
      "Content-Type": "application/json"
    })
  };
}
