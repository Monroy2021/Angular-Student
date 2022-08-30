import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../shared/api.service';
import { studdentdata } from './student.modelo';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {

  showadd!: boolean;
  showupdate!: boolean;
  studentmodelobj: studdentdata = new studdentdata
  formValue!: FormGroup;
  allstudentdata: any;

  constructor(private formBuilder: FormBuilder, private api: ApiService) { }

  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      mobile: ['', Validators.required],
      city: ['', Validators.required],

    })
    this.getdata()

  }

  add() {
    this.showadd = true;
    this.showupdate = false;


  }

  edit(data: any) {
    this.showadd = false;
    this.showupdate = true;
    this.studentmodelobj.id = data.id;
    this.formValue.controls['name'].setValue(data.name)
    this.formValue.controls['email'].setValue(data.email)
    this.formValue.controls['mobile'].setValue(data.mobile)
    this.formValue.controls['city'].setValue(data.city)

  }

  //update on edit 

  update() {
    this.studentmodelobj.name = this.formValue.value.name;
    this.studentmodelobj.email = this.formValue.value.email;
    this.studentmodelobj.mobile = this.formValue.value.mobile;
    this.studentmodelobj.city = this.formValue.value.city;

    this.api.updatestudent(this.studentmodelobj, this.studentmodelobj.id).subscribe(rest => {
      this.formValue.reset();
      this.getdata();
      alert("record update secessfully");
    },
      err => {
        alert("something went wrong")
      }
    )

  }

  addstudent() {
    this.studentmodelobj.name = this.formValue.value.name;
    this.studentmodelobj.email = this.formValue.value.email;
    this.studentmodelobj.mobile = this.formValue.value.mobile;
    this.studentmodelobj.city = this.formValue.value.city;

    this.api.poststudent(this.studentmodelobj).subscribe(res => {
      alert("record added sucessfully")
      console.log(res)
      this.formValue.reset()
      this.getdata()
    },
      err => {
        alert("something went wrong !!!");
      }
    )
  }

  //getdata 

  getdata() {
    this.api.getstudent().subscribe(res => {
      this.allstudentdata = res;
    })

  }

  //delete 

  deletestudent(data: any) {

    if (confirm('are you sure to delete? '))
      this.api.deletestudent(data.id).subscribe(res => {
        alert("record deleted suceefully")
        data.getdate();
      })

  }

}
