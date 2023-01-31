import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { UsersService } from '@app/_services/users.service';
import { Subscription } from 'rxjs';
import { Members } from '../models/members';
import { AddMemberModalComponent } from './add-member-modal/add-member-modal.component';
import {crmConstants} from "@app/_helpers/crm-constants";

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.scss'],
  providers: [MatSnackBar]
})

export class MembersComponent implements OnInit, OnDestroy {
    memberSubscription: Subscription;
    crmConstants = crmConstants;
    dataSource : MatTableDataSource<Members> = new MatTableDataSource();
    displayedColumns: string[] = ['id', 'firstname', 'lastname', 'email', 'roles', 'actions'];
    /*dataSource: Members[]  = [
    {id: 1, name: "Mohamed", lastName: "Litib", email:"m.litib@gmail.com", rules:'admin', actions:'edition', password: ''},
    {id: 2, name: "Mohamed", lastName: "Litib", email:"m.litib@gmail.com", rules:'admin', actions:'supression', password: ''},
    {id: 3, name: "Mohamed", lastName: "Litib", email:"m.litib@gmail.com", rules:'admin', actions:'supression', password: ''},
    {id: 4, name: "Mohamed", lastName: "Litib", email:"m.litib@gmail.com", rules:'admin', actions:'supression', password: ''},
  ];*/

  constructor(private dialog: MatDialog, private snackBar: MatSnackBar, private userService: UsersService) { }

    ngOnInit(): void {
      this.userService.getMemberList()
        .subscribe((response) => {
          console.warn('res', response);
          this.dataSource.data = response.users;

        });
        /*this.memberSubscription = this.userService.membersSub.subscribe((members: Members[]) => {
        this.dataSource.data = members;
        //this.dataSource.paginator = this.paginator;
      })
      this.userService.emitMembers();*/
    }
    openDialog(member?: any): void {
      const dialogRef = this.dialog.open(AddMemberModalComponent, {
          width: '100%',
          data: !member ? new Members() : member,
      });
      dialogRef.afterClosed().subscribe(result=> {
        if (result && result.id && result.id > 0) {
              this.snackBar.open( 'Utilisateur Ajouté', 'ok',{duration: 3000});
              this.ngOnInit();
        }
      })
    }
    deleteMember(id){
      this.userService.deleteMember(id)
    }
  ngOnDestroy() {
    //this.memberSubscription.unsubscribe();
  }

  onInitPasswordMember(memberId: number) {
    this.userService
      .updatePasswordMember(memberId)
      .subscribe((response:  any) => {
        if (response && response.ok) {
          this.snackBar.open('Mot de passe mit à jour avec succès', 'ok', {
            verticalPosition: "top",
            duration: 4500
          })
        }
      })
  }
}
