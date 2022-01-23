import {AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {User} from "../../model/user";
import {UserRestApiService} from "../../services/user-rest-api.service";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {SelectionModel} from "@angular/cdk/collections";
import {MatSort} from "@angular/material/sort";
import {MatPaginatorIntl} from "@angular/material/paginator/paginator-intl";
import {Router} from "@angular/router";
import {ConfirmDialogService} from "../../../../shared/services/confirm-dialog.service";
import {filter, mergeMap, switchMap} from "rxjs/operators";
import {HttpErrorResponse} from "@angular/common/http";
import {EMPTY, Observable} from "rxjs";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  users: User[] = [];

  public dataSource: MatTableDataSource<User>;

  displayedColumns: string[] = [
    'username', 'email', 'public_id', 'created_on', 'actions'
  ]

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  @ViewChild(MatSort) sort!: MatSort;

  private idColumn: string = 'id';

  constructor(
    public restApi: UserRestApiService,
    public router: Router,
    private confirmDialogService: ConfirmDialogService
  ) {
    this.dataSource = new MatTableDataSource(this.users);
  }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(): void {
    this.restApi.getUserList()
      .subscribe(data => {
        this.users = data['data'];
        this.dataSource = new MatTableDataSource(this.users);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        console.log(data)
      });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase()
  }

  public addUser() {

  }

  public updateUser = (public_id: number) => {
    this.router.navigate(['/profile', public_id]).then(()=>{
      // ... do after navigation
    });
  }

  public deleteUser = (recordId: number, user: User) => {

    const dsData = this.dataSource.data;

    //const record = dsData.find((user:User) => user[this.idColumn] === recordId);

    const name = 'Delete ' + user.username + '?';

    this.confirmDialogService.confirm(name, 'Are you sure?' ).pipe(

      switchMap((value: boolean | undefined) => {
        return value ? this.restApi.deleteUser(user.public_id) : EMPTY;
      }))
      .subscribe(
        (result: {}) => {
          // refresh DataTable
          this.deleteRowDataTable(recordId);
        },
        (err: HttpErrorResponse) => {
          console.log(err.error);
          console.log(err.message);
          // TODO show decent error Dialog
        }
      );
  }

  private deleteRowDataTable(recordId: any) {
    const itemIndex = this.dataSource.data.findIndex((obj: { [x: string]: any; }) => obj[this.idColumn] === recordId);
    this.dataSource.data.splice(itemIndex, 1);
    this.dataSource.paginator = this.paginator;
  }



}

