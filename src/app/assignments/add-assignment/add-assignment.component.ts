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
  auteur: string = "";
  matiere: string = "";
  imageUrlMatiere: string = "";
  prof: string = "";
  note: number;
  remarques: string = "";
  matiereImageUrl: string;
  profImageUrl: string;

  constructor(private assignmenntService:AssignmentsService, private router:Router) { }

  onSubmit() {
    const newAssignment = new Assignment();
    newAssignment.id = Math.floor(Math.random() * 1000000);
    newAssignment.nom = this.nomDevoir;
    newAssignment.dateDeRendu = this.dateRendu;
    newAssignment.rendu = false;
    newAssignment.auteur = this.auteur;
    newAssignment.matiere = this.matiere;
    newAssignment.imageUrlMatiere = this.imageUrlMatiere;
    newAssignment.prof = this.prof;
    newAssignment.note = this.note;
    newAssignment.remarques = this.remarques;

    this.assignmenntService.addAssignment(newAssignment)
      .subscribe(message => console.log(message));

    this.router.navigate(['/home']);
  }

  onMatiereImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    // Traiter le fichier pour l'image de la matière
  }

  onProfImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    // Traiter le fichier pour la photo du professeur
  }

}
