import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {passwordValidator} from "../../../common/validators/password";
import {FormErrorDirective} from "../../../common/directives/form/form-error/form-error.directive";
import {ButtonComponent} from "../../button/button.component";
import {UserType} from "../../../common/enum/user/user-type";
import {repeatPasswordValidator} from "../../../common/validators/repeat-password";
import {User} from "../../../common/models/user/user.interface";
import {NgIf} from "@angular/common";
import {ButtonRole} from "../../button/button-role";
import {errorMessages} from "./errors";

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormErrorDirective,
    ButtonComponent,
    NgIf
  ],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.scss'
})
export class UserFormComponent implements OnInit {
  @Input() selectedUser: User | undefined;
  @Output() onSubmit: EventEmitter<User> = new EventEmitter();
  @Output() onDelete: EventEmitter<null> = new EventEmitter();

  protected readonly UserType = UserType;
  protected readonly ButtonRole = ButtonRole;
  protected readonly errorMessages = errorMessages;

  userForm!: FormGroup;

  ngOnInit() {
    this.initializeForm();
    if (this.selectedUser) {
      this.userForm.patchValue(this.selectedUser);
    }
  }

  submit(): void {
    this.userForm.markAllAsTouched();
    this.userForm.updateValueAndValidity()
    if (this.userForm.valid) {
      if (this.isEditMode) {
        this.onSubmit.emit({ ...this.selectedUser, ...this.userForm.value }); // keep id
      } else {
        this.onSubmit.emit(this.userForm.value);
      }
    }
  }

  delete(): void {
    this.onDelete.emit();
  }

  private initializeForm(): void {
    this.userForm = new FormGroup({
      username: new FormControl(null, Validators.required),
      first_name: new FormControl(null, Validators.required),
      last_name: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.required, Validators.email]),
      user_type: new FormControl(null, Validators.required),
      password: new FormControl(null, [Validators.required, passwordValidator()]),
      repeat_password: new FormControl(null, Validators.required),
    }, { validators: repeatPasswordValidator });
  }

  get isEditMode(): boolean {
    return !!this.selectedUser;
  }
}
