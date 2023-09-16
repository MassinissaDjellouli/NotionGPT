import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RequestService {
  getRequest = async (url:string,headers: any) => {
    const data = await fetch(this.proxy,{
      body:JSON.stringify({
        "headers":headers,
        "url":url,
        "method":"GET"
      }),
      method:"POST"
    });
    this.throwOnError(data);
    return await data.json();
  }
  postRequest = async (url:string,headers: any, body: any) => {
    const data = await fetch(this.proxy,{
      body:JSON.stringify({
        "data":body,
        "headers":headers,
        "url":url,
        "method":"POST"
      }),
      method:"POST"
    });
    this.throwOnError(data);
    return await data.json();
  }

  private throwOnError = (data:Response) => {
    if(data.status < 200 || data.status > 299){
      throw new Error(data.statusText);
    }
  }
  proxy = "localhost:8000/";
  constructor() { }
}
