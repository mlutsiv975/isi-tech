import {Directive, ElementRef, HostListener, Input, OnDestroy} from '@angular/core';
import {AbstractControl, NgControl} from "@angular/forms";
import {fromEvent, merge, Subscription, take} from "rxjs";

@Directive({
  selector: '[appFormError]',
  standalone: true
})
export class FormErrorDirective implements OnDestroy {
  @HostListener('blur') onBlur() {
    this.isTouched = true;
  }
  @Input() errorMessages: any;

  private isTouched = false;
  private fieldErrors: any;
  private errorContainer: HTMLDivElement | null = null;
  private control: AbstractControl | null = null;
  private validationSubscription: Subscription | null = null;

  constructor(
    private el: ElementRef,
    private ngControl: NgControl
  ) {}

  ngOnInit() {
    this.fieldErrors = this.errorMessages[this.ngControl.name!]
    this.control = this.ngControl.control;
    this.createErrorContainer();
    this.watchControlValidation();
  }

  ngOnDestroy() {
    if (this.validationSubscription) {
      this.validationSubscription.unsubscribe();
    }
  }

  private watchControlValidation() {
    if (!this.control) {
      return;
    }

    this.validationSubscription = merge(
      fromEvent(this.el.nativeElement, 'blur').pipe(take(1)),
      this.control.statusChanges,
      this.control.valueChanges
    ).subscribe(() => {
      if (this.control?.valid) {
        this.clearErrorMessages();
      } else if (this.isTouched) {
        this.updateErrorMessages();
      }
    });
  }

  private createErrorContainer() {
    this.errorContainer = document.createElement('div');
    this.errorContainer.classList.add('form-control__error');
    const inputParent = this.el.nativeElement.parentElement;
    inputParent.appendChild(this.errorContainer);
  }

  private updateErrorMessages() {
    this.clearErrorMessages();

    if (!this.control || !this.control.errors) {
      return;
    }

    if (this.control.errors.hasOwnProperty('required')) {
      this.errorContainer!.innerText = this.fieldErrors?.required || 'This field is required';
      return;
    }

    const errorMessageKeys = this.fieldErrors ? Object.keys(this.fieldErrors) : [];
    const firstMatchingErrorMessage = errorMessageKeys.find(key => this.control!.errors!.hasOwnProperty(key));

    if (firstMatchingErrorMessage) {
      this.errorContainer!.innerText = this.fieldErrors[firstMatchingErrorMessage];
    }
  }

  private clearErrorMessages() {
    this.errorContainer!.innerText = '';
  }
}
