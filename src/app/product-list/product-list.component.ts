import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { PopupComponent } from '../popup/popup.component';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  fetchedData: any[] = [];
  selectedOption: string = '';

  category: string = '';

  constructor(
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.category = params['category'];
      const storedData = localStorage.getItem(this.category);
      this.fetchedData = storedData ? JSON.parse(storedData) : [];
      console.log('data', this.fetchedData);
    });
  }

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
