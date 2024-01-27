import { Injectable } from '@angular/core';
import { Assignment } from '../assignments/assignment.model';
import { Observable, map, of } from 'rxjs';
import { LoggingService } from './logging.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AssignmentsService {

  constructor(private loggingService:LoggingService, private http:HttpClient) { }

  assignments:Assignment[] = [
    {
      id: 1,
      nom: 'TP1 sur Webcomponents',
      dateDeRendu: new Date('2023-01-17'),
      rendu: true,
    },
    {
      id: 2,
      nom: 'TP2 Angular',
      dateDeRendu: new Date('2023-12-15'),
      rendu: false,
    },
    {
      id: 3,
      nom: 'TP3 Angular',
      dateDeRendu: new Date('2023-01-04'),
      rendu: true,
    },
  ];

  url = "http://localhost:8010/api/assignments";

  getAssignments():Observable<Assignment[]> {
    //return of(this.assignments);
    return this.http.get<Assignment[]>(this.url);
  }

  getNewId():number {
     return this.assignments.length+1;
  }

  addAssignment(assignment:Assignment):Observable<any> {
    //this.assignments.push(assignment);
    //this.loggingService.log(assignment.nom, "ajouté");
    //return of("Assignment ajouté");
    return this.http.post<Assignment>(this.url, assignment);
  }

  // retuns as an Observable the assignment that matches the id
  getAssignment(id:number):Observable<Assignment|undefined> {
    //return of(this.assignments.find(a => a.id === id));
    return this.http.get<Assignment>(this.url+"/"+id)
    .pipe(map(a=> {
      a.nom += " transformé avec un pipe";
      return a;
    }));
  }

  updateAssignment(assignment:Assignment):Observable<any> {
    /*this.assignments.forEach((a, index) => {
      if (a === assignment) {
        this.assignments[index] = assignment;
      }
    });

    this.loggingService.log(assignment.nom, "modifié");
    return of("Assignment modifié");*/

    return this.http.put<Assignment>(this.url, assignment);
  }

  deleteAssignment(assignment:Assignment):Observable<any> {
    /*let pos = this.assignments.indexOf(assignment);
    this.assignments.splice(pos, 1);

    this.loggingService.log(assignment.nom, "supprimé");
    return of("Assignment supprimé");*/
    let deleteURI = this.url+"/"+assignment._id;
    return this.http.delete(deleteURI);
  }

}
