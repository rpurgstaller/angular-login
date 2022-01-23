import { Component, OnInit } from '@angular/core';
import {UserRestApiService} from "../../user/services/user-rest-api.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(public restApi: UserRestApiService) { }

  ngOnInit(): void {
  }

}
