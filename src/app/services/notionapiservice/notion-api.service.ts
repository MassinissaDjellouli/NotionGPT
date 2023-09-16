import { Injectable } from '@angular/core';
import { RequestService } from '../requestservice/request.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NotionAPIService {
  getMainPageId = async ():Promise<string> =>  {
    const data = await this.requestService.postRequest("https://api.notion.com/v1/search",
    this.headers,{
      "query":"uni",
      "filter": {
          "value": "page",
          "property": "object"
      }
    });
    if(data.object !== "list" 
    || data.results.filter((result:any) => result.object === "page") === undefined 
    || data.results.filter((result:any) => result.object === "page").length === 0){
      throw new Error("Notion API returned unexpected data");
    }
    return data.results.filter((result:any) => result.object === "page").map((result:any) => result.id)[0];
  }
  fetchSessionPages = async ():Promise<String[]> => {
    let mainpageid:string = await this.getMainPageId();
    const data = this.requestService.getRequest(`https://api.notion.com/v1/blocks/${mainpageid}/children`,this.headers);
    console.log(data);
    return ["test"];
  }
  headers =  {
      "Authorization":`Bearer ${environment.notionapikey}`,
      "Content-Type":"application/json",
      "Notion-Version":"2022-06-28"
    }
  constructor(public requestService:RequestService) { }
}
