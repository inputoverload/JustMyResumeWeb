import { HttpHeaders } from "@angular/common/http";

export class DataConfigModule
{
  public static SERVER = 'https://localhost:44396';

  public static httpOptions = {
    headers: new HttpHeaders({
      "Accept": "application/json",
      "Content-Type": "application/json",
      "Authorization": "Bearer " + localStorage.getItem("jwt")
    })
  };
}
