import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SnackbarService } from '../core/utils/snackbar.service';
import { LoginService } from '../core/services/login.service';

@Component({
  selector: 'app-profile-share',
  templateUrl: './profile-share.component.html',
  styleUrls: ['./profile-share.component.scss']
})
export class ProfileShareComponent implements OnInit {
  registerForm: FormGroup;
  selectedFile: any;
  sharedData: any;
  disableShareButton = false;
  constructor(private formBuilder: FormBuilder, private snack: SnackbarService, private loginService: LoginService) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      designation: ['', Validators.required],
      location: ['', Validators.required],
      profilePic: [null, Validators.required]
       });
  }

  get f() { return this.registerForm.controls; }

  public onSubmit(value) {
    if(this.selectedFile) {
      const splittedName = this.selectedFile.name.split('.');
      const isValid = this.checkFileError(splittedName[splittedName.length - 1]);
      if (!isValid) {
        this.snack.openSnackBar('File extension should be png, jpeg, jpg', 2000);
        return;
      }
      const allKey = Object.keys(value);
      const length = allKey.length;
      const formData = new FormData();
      for (let i = 0; i < length; i++ ) {
        if (allKey[i] === 'profilePic') {
          formData.append(allKey[i], this.selectedFile);
        } else {
          formData.append(allKey[i], value[allKey[i]]);
        }
      }
      this.disableShareButton = true;
      this.loginService.profileShare(formData).subscribe(res => {
        this.sharedData = res.data;
        this.registerForm.reset();
        this.disableShareButton = false;
        this.snack.openSnackBar('Successfully Shared', 2000);
      }, err => { this.disableShareButton = false;
                  this.snack.openSnackBar(err, 2000)
      });
    } else {
      this.snack.openSnackBar('Please add file once again', 2000);
    }

  }

/**
 * @description used for allowing particular extension's
 * @param extension file extension
 */
  public checkFileError(extension: string): boolean {
    extension = extension.toLowerCase();
    if (extension === 'png' || extension === 'jpeg' || extension === 'jpg') {
      return true;
    } else {
      return false;
    }
  }

  /**
   * @description "Used to get file detail when selected from input type='file'"
   * @param event file meta data get through the event
   */
  public fileChanged(event) {
    if (event.target.files[0] !== undefined) {
      this.selectedFile = event.target.files[0];
    }
  }
}
