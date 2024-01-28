import { Injectable } from '@angular/core';
import { Assignment } from '../assignments/assignment.model';
import { Observable, catchError, map, of } from 'rxjs';
import { LoggingService } from './logging.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AssignmentsService {

  constructor(private loggingService:LoggingService, private http:HttpClient) { }

  assignments:Assignment[] = [];

  url = "https://apiprojetangular.onrender.com/api/assignments";

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
      a.nom;
      return a;
    }),
    catchError(this.handleError<Assignment>(`getAssignment id=${id}`))
    );
  }

  private handleError<T>(operation, result?: T) { 
    return (error: any): Observable<T> => { 
      console.error(error); // log to console instead 
      console.log(operation + 'a échoué' + error.message);
      return of(result as T); 
    }; 
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

  getAssignmentsPagine(page:number, limit:number):Observable<any> {
    return this.http.get(this.url+"?page="+page+"&limit="+limit);
  }

}
