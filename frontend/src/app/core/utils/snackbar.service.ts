import { Injectable } from '@angular/core';
import { MatSnackBar} from '@angular/material/snack-bar';
@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor(private snackBar: MatSnackBar) { }

  /**
   * @name openSnackBar
   * @description Used for open alert message
   * @param {string} message 
   * @param {number} duration 
   */
  openSnackBar(message: string, duration?: number) {
    let msg = message['error'] ? message['error']['message'] : message;
    return this.snackBar.open(msg, 'X', {
      duration: duration ? duration : 6000,
      verticalPosition: 'top',
      horizontalPosition: 'right',
    });
  }
}
