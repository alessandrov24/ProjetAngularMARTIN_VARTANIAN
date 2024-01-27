import { Component, EventEmitter,  Output} from '@angular/core';
import { Assignment } from '../assignment.model';
import { AssignmentsService } from 'src/app/shared/assignments.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-assignment',
  templateUrl: './add-assignment.component.html',
  styleUrls: ['./add-assignment.component.css']
})
export class AddAssignmentComponent {
  nomDevoir:string = "";
  dateRendu:Date = new Date();
  nouvelAssignment:Assignment;
  //@Output() nouvelAssignment = new EventEmitter<Assignment>();
  
  // Nouvelles propriétés
  auteur: string = "";
  matiere: string = "";
  imageMatiere: string = "";
  photoProf: string = "";
  note?: number; // Optionnel car l'assignment n'est pas encore noté
  remarques: string = "";

  constructor(private assignmenntService:AssignmentsService, private router:Router) { }

  onSubmit() {
    const newAssignment = new Assignment();
    newAssignment.id = Math.floor(Math.random() * 1000000);
    newAssignment.nom = this.nomDevoir;
    newAssignment.dateDeRendu = this.dateRendu;
    newAssignment.rendu = false;

    // Nouvelles propriétés
    newAssignment.auteur = this.auteur;
    newAssignment.matiere = this.matiere;
    newAssignment.imageMatiere = this.imageMatiere;
    newAssignment.photoProf = this.photoProf;
    newAssignment.note = this.note; // Peut rester non défini
    newAssignment.remarques = this.remarques;

    //this.assignments.push(newAssignment);
    //this.nouvelAssignment.emit(newAssignment);

    this.assignmenntService.addAssignment(newAssignment)
      .subscribe(message => console.log(message));

    this.router.navigate(['/home']);
  }

}
