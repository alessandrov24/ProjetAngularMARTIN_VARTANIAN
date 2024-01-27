import { Component, Input, OnInit } from '@angular/core';
import { Assignment } from '../assignment.model';
import { AssignmentsService } from 'src/app/shared/assignments.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-assignment-detail',
  templateUrl: './assignment-detail.component.html',
  styleUrls: ['./assignment-detail.component.css']
})
export class AssignmentDetailComponent implements OnInit{
  assignmentTransmis:Assignment;

  constructor(private assignmentService:AssignmentsService, private route:ActivatedRoute, private router:Router, private authService:AuthService) { }

  ngOnInit(): void {
    this.getAssignment();
  }
  getAssignment() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.assignmentService.getAssignment(id)
      .subscribe(assignment => this.assignmentTransmis = assignment);
  }

  onAssignmentRendu() {
    this.assignmentTransmis.rendu = true;

    this.assignmentService.updateAssignment(this.assignmentTransmis)
      .subscribe(message => {
        console.log(message);
        this.router.navigate(['/home']);
      });

    //this.router.navigate(['/home']);
  }

  onDelete() {
    this.assignmentService.deleteAssignment(this.assignmentTransmis)
      .subscribe(message => {
        console.log(message);
        this.router.navigate(['/home']);
      });

    /*this.assignmentTransmis = null;
    this.router.navigate(['/home']);*/
    
  }

  onClickEdit() {
    this.router.navigate(['/assignment', this.assignmentTransmis.id, 'edit'], {
      queryParams: { nom: this.assignmentTransmis.nom },
      fragment: 'edition'
    });
  }

  isAdmin(): boolean {
    return this.authService.isAdmin();
  }  

}
