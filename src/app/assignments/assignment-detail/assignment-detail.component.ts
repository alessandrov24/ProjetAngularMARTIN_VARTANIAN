import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Assignment } from '../assignment.model';
import { AssignmentsService } from 'src/app/shared/assignments.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth.service';


@Component({
  selector: 'app-assignment-detail',
  templateUrl: './assignment-detail.component.html',
  styleUrls: ['./assignment-detail.component.css']
})

export class AssignmentDetailComponent implements OnInit {
  /*@Input()*/ assignmentTransmis!: Assignment;
 // @Output() deleteAssignment: EventEmitter<Assignment> = new EventEmitter<Assignment>();


  constructor(private assignmentService: AssignmentsService, private route: ActivatedRoute, public authService: AuthService, private router:Router){}  
  
  ngOnInit(): void{
      this.getAssignment();
  }

  onAssignmentRendu(){
    this.assignmentTransmis.rendu = true;
    this.assignmentService.updateAssignment(this.assignmentTransmis).subscribe(message => {
      console.log(message); this.router.navigate(["/home"]);});
    //this.router.navigate(['/home']);
  }

  getAssignment(){
    const id = +this.route.snapshot.params['id'];
    this.assignmentService.getAssignment(id).subscribe(assignment => this.assignmentTransmis = assignment!);
  }
  

  onDeleteAssignment(){
    if (this.assignmentTransmis) {
      this.assignmentService.deleteAssignment(this.assignmentTransmis).subscribe(
        message => {
          console.log(message);
          this.router.navigate(['/home']);
        },
        err => console.error(err)
      );
    } else {
      console.error('Aucun assignment à supprimer');
    }
  }
  
  onClickEdit(){
    this.router.navigate(['/assignment', this.assignmentTransmis.id, 'edit'],
    {queryParams: {nom: this.assignmentTransmis.nom}, fragment: 'edition'});
  }

  isAdmin(): boolean{
    return this.authService.loggedIn;

  }
  
}
