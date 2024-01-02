import { Component, OnInit } from '@angular/core';
import { Assignment } from './assignment.model';
import { AssignmentsService } from '../shared/assignments.service';

@Component({
  selector: 'app-assignments',
  templateUrl: './assignments.component.html',
  styleUrls: ['./assignments.component.css'],
})
export class AssignmentsComponent implements OnInit {
  titre = "Formulaire d'ajout de devoir";
  color = 'green';
  formVisible = false;
  boutonDesactive = true;
  assignment!:Assignment[];

  constructor (private assignmentService:AssignmentsService) {}
  

  ngOnInit() {
    //this.assignment = this.assignmentService.getAssignments();
    this.getAssignments();
  }

  getAssignments() {
    this.assignmentService.getAssignments().subscribe(assignment => this.assignment = assignment);
  }

  getDescription() {
    return 'Je suis un sous composant';
  }

  getColor(a: any) {
    if (a.rendu) return 'green';
    else return 'red';
  }

  //nouvelle méthode pour BtnCLick
  onAddAssignmentBtnClick() {
    //this.formVisible = true;
  }

  //Nouvelle propriété
  assignmentSelectionne!:Assignment;

  //Méthode appelée quand on clique
  assignmentClique(assignment:Assignment) {
    this.assignmentSelectionne = assignment;
  }

  /*//Méthode pour add assignment (push l'event)
  onNouvelAssignment(event:Assignment){
    //this.assignment.push(event);
    this.formVisible = false;
    this.assignmentService.addAssignment;
  }
*/

/*
  //Fonction pour supprimer l'assignment choisis
  onDeleteAssignment(a:Assignment) {
    // position de l'assignment à supprimer, dans le tableau
    const pos = this.assignment.indexOf(a);
    this.assignment.splice(pos, 1);
  }
*/
}
