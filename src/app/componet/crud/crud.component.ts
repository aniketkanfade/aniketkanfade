import { CommonService } from './../../common.service';
import { Component, ElementRef, ViewChild, } from '@angular/core';
import { FormsModule } from '@angular/forms';
import jsPDF from 'jspdf';
@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.scss']
})
export class CrudComponent implements FormsModule {
  allUser: any = {};
  isEdit = false;
  userObj = {
    name: '',
    mobile: '',
    email: '',
    password: '',
  }


  constructor(private commonService: CommonService) { }
  ngOnInit() {
    this.getLatestUser()
  }
  @ViewChild('content', { static: false }) el!: ElementRef;
  makePDF(user: any) {
    let pdf = new jsPDF('p', 'pt', 'a4');
    pdf.html(this.el.nativeElement, {
      callback: (pdf) => {
        pdf.save("demo.pdf");
      }
    });

  }

  addUser(formObj: any) {
    // console.log(formObj)
    this.commonService.createUser(formObj).subscribe((response) => {
      this.getLatestUser();
    })
  }
  getLatestUser() {
    this.commonService.getAllUser().subscribe((response) => {
      this.allUser = response
    })
  }
  editUser(user: any) {
    this.isEdit = true;
    this.userObj = user;
  }
  deleteUser(user: any) {
    this.commonService.deleteUser(user).subscribe(() => {
      this.getLatestUser();
    })
  }
  updateUser() {
    this.isEdit = !this.isEdit;
    this.commonService.updateUser(this.userObj).subscribe(() => {
      this.getLatestUser();
    })

  }
}
