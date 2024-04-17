import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IUser } from 'app/shared/interface/user.interface';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {
  @Input()
  data?: IUser;

  @Output() onSubmit = new EventEmitter<IUser>();
  @Output() onRemove = new EventEmitter<IUser>();

  formGroup: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.formGroup = this.formBuilder.group({
      name: [this.data?.name, Validators.required],
      username: [this.data?.username, Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.data && this.data !== undefined) {
      this.formGroup.patchValue({
        name: this.data.name,
        username: this.data.username,
        password: '',
      });
    }
  }



  onClickSubmit() {
    if (this.formGroup.valid) {
      this.onSubmit.emit({ ...this.formGroup.getRawValue(), id: this.data?.id });
    }
  }

  onClickRemove() {
    this.onRemove.emit(this.data);
    this.formGroup.reset();
  }

}
