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
  id="monParagraphe";
  boutonDesactive = true;
  // pour le formulaire
  nomDevoir=""
  dateDeRendu?:Date=undefined;
  assignments:Assignment[];

  constructor(private assignmenntService:AssignmentsService) {}

  ngOnInit() {
    this.getAssignments();
  }
  getDescription() {
    return 'Je suis un sous composant';
  }

  getColor(a: any) {
    if (a.rendu) return 'green';
    else return 'red';
  }

  onSubmit(event:any) {
    this.titre = "Vous avez tapé : " + this.dateDeRendu;
    console.log(event)

    let a = new Assignment();
    a.nom = this.nomDevoir;
    if(this.dateDeRendu)
      a.dateDeRendu = this.dateDeRendu;

    a.rendu = false;

    this.assignments.push(a);
  }

  getAssignments() {
    this.assignmenntService.getAssignments()
    .subscribe(assignments => this.assignments = assignments);
  }

}
