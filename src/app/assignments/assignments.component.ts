import { Component, OnInit, ViewChild } from '@angular/core';
import { Assignment } from './assignment.model';
import { AssignmentsService } from '../shared/assignments.service';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatCheckboxChange } from '@angular/material/checkbox';

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
  assignments: Assignment[] = [];

  //pour gérer la pagination
  page:number=1;
  limit:number=10;
  totalDocs!:number;
  totalPages!:number;
  nextPage!:number;
  prevPage!:number;
  hasPrevPage!:boolean;
  hasNextPage!:boolean;

  displayedColumns: string[] = ['nom', 'dateDeRendu', 'rendu', 'actions'];
  dataSource: MatTableDataSource<Assignment>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private assignmenntService:AssignmentsService) {}

  ngOnInit() {
    this.loadAssignments();
  }

  loadAssignments() {
    this.assignmenntService.getAssignmentsPagine(this.page, this.limit).subscribe(data => {
      // Assuming the response has a structure with 'docs', 'totalDocs', and 'totalPages'
      this.dataSource = new MatTableDataSource(data.docs);
      this.dataSource.sort = this.sort;
      this.assignments = data.docs;
      this.totalDocs = data.totalDocs;
      this.totalPages = data.totalPages;
      this.nextPage = data.nextPage;
      this.prevPage = data.prevPage;
      this.hasPrevPage = data.hasPrevPage;
      this.hasNextPage = data.hasNextPage;
      this.dataSource.filter = '';
    });
  }

  // Method for pagination controls
  handlePageEvent(event: PageEvent) {
    this.limit = event.pageSize;
    this.page = event.pageIndex + 1; // MatPaginator pageIndex is 0-based
    this.loadAssignments();
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

  applyFilterRendu(event: MatCheckboxChange) {
    const renduFilterValue = event.checked ? 'true' : '';
    this.dataSource.filter = renduFilterValue;
  }

  applySearch(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    this.dataSource.filter = inputElement.value.trim().toLowerCase();
  }

}
