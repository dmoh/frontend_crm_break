import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { UsersService } from '@app/_services/users.service';
import { Subscription } from 'rxjs';
import { Members } from '../models/members';
import { AddMemberModalComponent } from './add-member-modal/add-member-modal.component';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.scss'],
  providers: [MatSnackBar]
})

export class MembersComponent implements OnInit {
    memberSubscription: Subscription;
    dataSource : MatTableDataSource<Members> = new MatTableDataSource();
    displayedColumns: string[] = ['id', 'name', 'lastName', 'email', 'rules', 'actions'];
    /*dataSource: Members[]  = [
    {id: 1, name: "Mohamed", lastName: "Litib", email:"m.litib@gmail.com", rules:'admin', actions:'edition', password: ''},
    {id: 2, name: "Mohamed", lastName: "Litib", email:"m.litib@gmail.com", rules:'admin', actions:'supression', password: ''},
    {id: 3, name: "Mohamed", lastName: "Litib", email:"m.litib@gmail.com", rules:'admin', actions:'supression', password: ''},
    {id: 4, name: "Mohamed", lastName: "Litib", email:"m.litib@gmail.com", rules:'admin', actions:'supression', password: ''},
  ];*/

  constructor(private dialog: MatDialog, private snackBar: MatSnackBar, private userService: UsersService) { }

    ngOnInit(): void {
        this.memberSubscription = this.userService.membersSub.subscribe((members: Members[]) => {
        this.dataSource.data = members;
        //this.dataSource.paginator = this.paginator;
      })
      this.userService.emitMembers();
    }

    openDialog(): void {
      const dialogRef = this.dialog.open(AddMemberModalComponent, {
          width: '100%',
          data: new Members,
      });
      dialogRef.afterClosed().subscribe(result=> {
        if (result) {
              this.snackBar.open( 'Utilisateur Ajouté', 'Annulé',{duration: 3000});
            }
          })
    }
    deleteMember(id){
      this.userService.deleteMember(id)
    }

}
