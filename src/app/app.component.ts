import { Component } from '@angular/core';
import { NotionAPIService } from './services/notionapiservice/notion-api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'NotionGPT';
  sessions:String[] = [];
  constructor(public notionApiService:NotionAPIService) {
    this.fetchSessionPages();
    
   }

  fetchSessionPages = async () => {
    this.sessions = await this.notionApiService.fetchSessionPages();
    console.log(this.sessions);
  }

}
