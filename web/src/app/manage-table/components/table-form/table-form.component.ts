import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  SimpleChanges,
} from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { tableStatus } from "app/shared/constants/manage.table.status";
import { IManageTable } from "app/shared/interface/manage-table.interface";

@Component({
  selector: "app-table-form",
  templateUrl: "./table-form.component.html",
  styleUrls: ["./table-form.component.scss"],
})
export class TableFormComponent implements OnInit {
  @Input()
  data?: IManageTable;

  @Output() onSubmit = new EventEmitter<IManageTable>();

  formGroup: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.formGroup = this.formBuilder.group({
      name: [this.data?.name, Validators.required],
      status: [this.data?.status, Validators.required],
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.data && this.data !== undefined) {
      this.formGroup.patchValue({
        name: this.data.name,
        status: this.data.status,
      });
    }
  }

  getTableStatus() {
    return tableStatus;
  }

  onClickSubmit() {
    if (this.formGroup.valid) {
      this.onSubmit.emit({ ...this.formGroup.getRawValue(), id: this.data.id });
    }
  }
}
