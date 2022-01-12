import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Members } from '@app/dashboard/models/members';
import { UsersService } from '@app/_services/users.service';

@Component({
  selector: 'app-add-member-modal',
  templateUrl: './add-member-modal.component.html',
  styleUrls: ['./add-member-modal.component.scss']
})
export class AddMemberModalComponent implements OnInit {
  displayedColumns: string[] = ['capacité', 'autoriser', 'refuser'];
    dataSource: any  = [
    {capacity: "Ajouter un utilisateur", autoriser: "", refuser: ""},
    {capacity: "Ajouter un rôle utilisateur", autoriser: "", refuser: ""},
    {capacity: "Supprimer un utilisateur", autoriser: "", refuser: ""},
    {capacity: "Ajouter une annonce", autoriser: "", refuser: ""},
    {capacity: "Modifier une annonce", autoriser: "", refuser: ""},
    {capacity: "Supprimer d'une annonce", autoriser: "", refuser: ""},
    {capacity: "Rédaction contact client", autoriser: "", refuser: ""},
    {capacity: "Modifier un contact client", autoriser: "", refuser: ""},
    {capacity: "Suppression d'un contact client", autoriser: "", refuser: ""},

  ];

  memberForm: FormGroup;
  actionForm: FormGroup;

  constructor(private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public member: Members,
    public dialogRef: MatDialogRef<AddMemberModalComponent>,
    private userService: UsersService
    ) { }

  ngOnInit(): void {

    this.memberForm = this.fb.group({
      //id: [this.member.id],
      name: [this.member.name],
      lastName: [this.member.lastName],
      email: [this.member.email],
      rules: [this.member.rules],
      actions: [this.member.actions],
      password: [this.member.actions],
    })
    this.actionForm = this.fb.group({
      addUser: [false],
      addUserRule: [false],
      deleteUser: [false],
      addAd: [false],
      editAd: [false],
      deleteAd: [false],
      writeContact: [false],
      editContact: [false],
      deleteContact: [false],
   })

  }
  onSubmit(): void {
    const newUser = Object.assign(
      this.memberForm.value,
      this.actionForm.value,
     );
    this.userService.registerUser(newUser)
      .subscribe((response) => {
        console.warn('response', response);
      })
     /*this.userService.addMember(newUser);
     console.log('user', newUser)
     this.dialogRef.close(newUser)*/
  }
}
