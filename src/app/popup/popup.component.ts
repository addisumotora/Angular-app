import { Component, EventEmitter, Output } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { PopupService } from '../popup.service';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css'],
})
export class PopupComponent {
  selectedOption: string = '';

  options: string[] = ["electronics", "jewelery", "men's clothing","women's clothing"];
  @Output() dialogResult = new EventEmitter<any>();

  constructor(private apiService: PopupService, private dialogRef: MatDialogRef<PopupComponent>) {}

  fetch() {
    if(this.selectedOption){
      this.apiService.fetchData(this.selectedOption).subscribe((data) => {
        if (data) {
          console.log('Data fetched:', data);
          this.dialogResult.emit({
            selectedOption: this.selectedOption,
            fetchedData: data,
          });
          this.closeDialog();
        }
      });
    }
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
