import {Component, inject, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-user-view',
  standalone: true,
  imports: [],
  templateUrl: './user-view.component.html',
  styleUrl: './user-view.component.scss',
})
export class UserViewComponent implements OnInit {
  http = inject(HttpClient);

  ngOnInit() {
    // mock http with 403 status code
    this.http.get('https://run.mocky.io/v3/371b298f-0d3f-4106-8f68-03df87844c78').subscribe((response) => {
    });
  }
}
