import { Component, ViewChild } from '@angular/core';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  sampleForm: NgForm;
  @ViewChild('sampleForm')
  currentForm: NgForm;

  ngAfterViewChecked(){
    // console.log("this stuff is changing");
    this.formChanged();
  }

  formChanged() {
    //if the form didn't change then do nothing
    if (this.currentForm === this.sampleForm) { 
      return; 
    }
    //set the form to the current form for comparison
    this.sampleForm = this.currentForm;
    //subscribe to form changes and send the changes to the onValueChanged method
    this.sampleForm.valueChanges
      .subscribe(data => this.onValueChanged(data));
  }

  onValueChanged(data?: any) {
    let form = this.sampleForm.form;

    for (const field in this.formErrors) {
      // clear previous error message (if any)
      this.formErrors[field] = '';
      const control = form.get(field);

      if (control && control.dirty && !control.valid) {
        const messages = this.validationMessages[field];
        for (const key in control.errors) {
          this.formErrors[field] += messages[key] + ' ';
        }
      }
    }
  }

  formErrors = { //any field that has a validation needs to go in this array. this says that we are starting with no errors
    'first_name': '',
    'last_name': ''
  };

  validationMessages = {
    'first_name': {
      'required':      'First name is required.',
      'minlength':     'Name must be at least 2 characters long.'
    },
    'last_name': {
      'minlength':     'Name must be at least 2 characters long.'
    }
  };

  onSubmit(data: NgForm){ //data can be anything
    console.log(data.value)
}

}
