import { Injectable } from '@angular/core';
import { NotionObject } from 'src/app/types/NotionObject';
import { environment } from 'src/environments/environment';
import { RequestService } from '../requestservice/request.service';


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
  fetchSessionPages = async ():Promise<NotionObject[]> => {
    let mainpageid:string = await this.getMainPageId();    
    return await this.fetchBlockChildren(mainpageid,true);
  }

  fetchSessionCourses = async (session:NotionObject):Promise<NotionObject[]> => {
    return await this.fetchBlockChildren(session.id,true);
  }

  fetchCourseNotes = async (course:NotionObject):Promise<Note> => {

  }
  fetchBlockChildren = async (blockid:string,hasChildren:boolean | undefined):Promise<NotionObject[]> => {
    const data = await this.requestService.getRequest(`https://api.notion.com/v1/blocks/${blockid}/children`,this.headers);
    let children:NotionObject[] = [];
    if(hasChildren === undefined){
      data.results.filter((result:any) => result.type === 'child_page').forEach((result:any) => {
        let childpage = result.child_page 
        children.push({
          name:childpage.title,
          id:result.id
        });
      })
    }
    data.results.filter((result:any) => result.type === 'child_page' && result.has_children == hasChildren).forEach((result:any) => {
      let childpage = result.child_page 
      children.push({
        name:childpage.title,
        id:result.id
      });
    })
    return children;
  }
  headers =  {
      "Authorization":`Bearer ${environment.notionapikey}`,
      "Content-Type":"application/json",
      "Notion-Version":"2022-06-28"
    }
  constructor(public requestService:RequestService) { }
}
