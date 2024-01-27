import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AssignmentsService } from 'src/app/shared/assignments.service';
import { Assignment } from '../assignment.model';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
 selector: 'app-edit-assignment',
 templateUrl: './edit-assignment.component.html',
 styleUrls: ['./edit-assignment.component.css'],
})
export class EditAssignmentComponent implements OnInit {
 assignment!: Assignment | undefined;
 nomAssignment!: string;
 dateDeRendu!: Date;
 // Nouvelles propriétés
 auteur!: string;
 matiere!: string;
 imageMatiere!: string;
 photoProf!: string;
 note?: number;
 remarques!: string;
 // 
 canEdit: boolean = false;

 constructor(
   private assignmentsService: AssignmentsService,
   private route: ActivatedRoute,
   private router: Router,
   private authService: AuthService
 ) {}

  ngOnInit(): void {
   this.getAssignment();
   this.checkPermissions();

   const paramsHTTP = this.route.snapshot.queryParams['nom'];
   const fragment = this.route.snapshot.fragment;
    console.log('Query Params : ' + paramsHTTP);
    console.log('Fragment : ' + fragment);
  }

  getAssignment() {
    // on récupère l'id dans le snapshot passé par le routeur
    // le "+" force l'id de type string en "number"
    const id = +this.route.snapshot.params['id'];
  
    this.assignmentsService.getAssignment(id).subscribe((assignment) => {
      if (!assignment) return;
      this.assignment = assignment;
      // Pour pré-remplir le formulaire
      this.nomAssignment = assignment.nom;
      this.dateDeRendu = assignment.dateDeRendu;
      // Pré remplir avec les nouvelles propriétés
      this.auteur = assignment.auteur;
      this.matiere = assignment.matiere;
      this.imageMatiere = assignment.imageMatiere;
      this.photoProf = assignment.photoProf;
      this.note = assignment.note;
      this.remarques = assignment.remarques;
    });
  }
  onSaveAssignment() {
    if (!this.assignment) return;

    // on récupère les valeurs dans le formulaire
    this.assignment.nom = this.nomAssignment;
    this.assignment.dateDeRendu = this.dateDeRendu;
    // récupération des nouvelles propriétés
    this.assignment.auteur = this.auteur;
    this.assignment.matiere = this.matiere;
    this.assignment.imageMatiere = this.imageMatiere;
    this.assignment.photoProf = this.photoProf;
    this.assignment.note = this.note;
    this.assignment.remarques = this.remarques;

   
    this.assignmentsService
      .updateAssignment(this.assignment)
      .subscribe((message) => {
        console.log(message);

        // navigation vers la home page
        this.router.navigate(['/home']);
      });
  }

  checkPermissions() {
    this.canEdit = this.authService.isLogged() && this.authService.isAdmin();
  }
}
