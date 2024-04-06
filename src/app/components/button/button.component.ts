import {Component, Input} from '@angular/core';
import {ButtonRole} from "./button-role";
import {NgClass} from "@angular/common";

@Component({
  selector: 'app-button',
  standalone: true,
  templateUrl: './button.component.html',
  imports: [
    NgClass
  ],
  styleUrl: './button.component.scss'
})
export class ButtonComponent {
  @Input() buttonRole: ButtonRole = ButtonRole.PRIMARY;
  @Input() buttonType: string = 'submit';
}
