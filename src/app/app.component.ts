import { Component } from '@angular/core';
import { NotionAPIService } from './services/notionapiservice/notion-api.service';
import { NotionObject } from './types/NotionObject';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'NotionGPT';
  sessions:NotionObject[] = [];
  constructor(public notionApiService:NotionAPIService) {
    this.fetchSessionPages();
    
   }

  fetchSessionPages = async () => {
    this.sessions = await this.notionApiService.fetchSessionPages();
    let classes = await this.notionApiService.fetchSessionCourses(this.sessions[0]);
    let notes = await this.notionApiService.fetchCourseNotes(classes[1]);
    console.log(notes[0]);
  }

}
