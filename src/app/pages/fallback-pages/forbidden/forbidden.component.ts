import { Component } from '@angular/core';
import {ButtonComponent} from "../../../components/button/button.component";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-forbidden',
  standalone: true,
  imports: [
    ButtonComponent,
    RouterLink
  ],
  templateUrl: './forbidden.component.html',
  styleUrl: '../shared/fallback-pages.scss'
})
export class ForbiddenComponent {

}
