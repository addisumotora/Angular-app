import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NavigationExtras, Router } from '@angular/router';
import { PopupComponent } from '../popup/popup.component';

@Component({
  selector: 'app-fetch-data',
  templateUrl: './fetch-data.component.html',
  styleUrls: ['./fetch-data.component.css']
})
export class FetchDataComponent {
  selectedOption: string = ''

  fetchedData: any[] = []

  constructor(public dialog: MatDialog, private router: Router) {}

  openDialog() {
    const dialogRef = this.dialog.open(PopupComponent);

    dialogRef.componentInstance.dialogResult.subscribe((result) => {
      console.log('Dialog result:', result);
      this.selectedOption = result.selectedOption;
      this.fetchedData = result.fetchedData;

      this.router.navigate([`${this.selectedOption}`]);
      dialogRef.close();
    });
  }
}
