import { Component, OnInit /*EventEmitter, Output*/ } from '@angular/core';
import { AssignmentsService } from 'src/app/shared/assignments.service';
import { Assignment } from '../assignment.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-assignment',
  templateUrl: './add-assignment.component.html',
  styleUrls: ['./add-assignment.component.css']
})
export class AddAssignmentComponent implements OnInit {
  
  // Evenement qu'on enverra au père avec la soumission
  // du formulaire
  //@Output() nouvelAssignment = new EventEmitter<Assignment>();

  // pour le formulaire
  nomDevoir="";
  dateDeRendu?:Date=undefined;

  constructor(private assignmentService:AssignmentsService, private router:Router){}
  
  ngOnInit(): void{
  }
  
  onSubmit(event:any) {
    let a = new Assignment();
    a.nom = this.nomDevoir;
    if(this.dateDeRendu)
      a.dateDeRendu = this.dateDeRendu;
    a.rendu = false;
    a.id = Math.floor(Math.random()*1000);

    //this.nouvelAssignment.emit(a);
    this.assignmentService.addAssignment(a).subscribe(message => console.log(message));
    this.router.navigate(['/home']);
    
  }

}
