import { Component } from '@angular/core';
import {RouterLink} from "@angular/router";
import {ButtonComponent} from "../../../components/button/button.component";

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [
    RouterLink,
    ButtonComponent
  ],
  templateUrl: './not-found.component.html',
  styleUrl: '../shared/fallback-pages.scss'
})
export class NotFoundComponent {

}
