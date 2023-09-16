import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RequestService {
  getRequest = async (url:string,headers: any) => {
    const data = await this.sendToProxy(url,headers,undefined,"GET")
    this.throwOnError(data);
    return await data.json();
  }
  postRequest = async (url:string,headers: any, body: any) => {
    console.log(JSON.stringify({
      "data":body,
      "headers":headers,
      "url":url,
      "method":"POST"
    }))
    const data = await this.sendToProxy(url,headers,body,"POST");
    this.throwOnError(data);
    return await data.json();
  }
  private sendToProxy = async (url:string,headers: any, body: any,method : string) => {
    if(body !== undefined){
      return await fetch(this.proxy,{
        headers: {
          "Content-Type":"application/json"
        },
        body:JSON.stringify({
          "data":body,
          "headers":headers,
          "url":url,
          "method":method
        }),
        method:"POST"
      });
    }
    return await fetch(this.proxy,{
      body:JSON.stringify({
        "headers":headers,
        "url":url,
        "method":method
      }),
      method:"POST"
    });
  }
  
  private throwOnError = (data:Response) => {
    if(data.status < 200 || data.status > 299){
      throw new Error(data.statusText);
    }
  }
  proxy = "localhost:8000/proxy";
  constructor() { }
}
