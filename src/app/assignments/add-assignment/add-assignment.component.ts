// Importations nécessaires depuis les modules Angular et autres services
import { Component, EventEmitter,  Output} from '@angular/core';
import { Assignment } from '../assignment.model';
import { AssignmentsService } from 'src/app/shared/assignments.service';
import { Router } from '@angular/router';
// Décorateur Component définissant le sélecteur, le template HTML et le style CSS pour ce composant
@Component({
  selector: 'app-add-assignment',
  templateUrl: './add-assignment.component.html',
  styleUrls: ['./add-assignment.component.css']
})
export class AddAssignmentComponent {
  // Déclaration et initialisation des propriétés utilisées pour créer un nouvel assignment
  nomDevoir:string = "";
  dateRendu:Date = new Date();
  nouvelAssignment:Assignment;
  //@Output() nouvelAssignment = new EventEmitter<Assignment>();
  // Ces propriétés suivantes sont ajoutées pour prendre en charge les nouvelles propriétés des assignments
  auteur: string = "";
  matiere: string = "";
  imageUrlMatiere: string = "";
  prof: string = "";
  note: number;
  remarques: string = "";
  matiereImageUrl: string;
  profImageUrl: string;

  constructor(private assignmenntService:AssignmentsService, private router:Router) { }

  // Méthode appelée lors de la soumission du formulaire
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
