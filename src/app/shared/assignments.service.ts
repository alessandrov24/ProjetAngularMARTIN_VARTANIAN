import { Injectable } from '@angular/core';
import { Assignment } from '../assignments/assignment.model';
import { Observable, of, throwError} from 'rxjs';
import { LoggingService } from './logging.service';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { map } from 'rxjs/operators';
import { tap } from 'rxjs/operators';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AssignmentsService {
  private HttpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }


  assignment:Assignment[] = [
    {
      id: 1,
      nom: 'Devoir Angular de Buffa',
      dateDeRendu: new Date('2023-09-30'),
      rendu: false,
    },
    {
      id: 2,
      nom: 'Devoir SQL de Mopolo',
      dateDeRendu: new Date('2023-10-30'),
      rendu: false,
    },
    {
      id: 3,
      nom: 'Devoir gestion de Tunsi',
      dateDeRendu: new Date('2023-08-30'),
      rendu: true,
    },
    {
      id: 4,
      nom: 'Devoir Js Donatti',
      dateDeRendu: new Date('2023-06-29'),
      rendu: true,
    },
  ];

  url = "http://localhost:8010/api/assignments";

  constructor(private loggingService:LoggingService, private http:HttpClient) { }

  getAssignments():Observable<Assignment[]>{
    //return of (this.assignment);
    return this.http.get<Assignment[]>(this.url);

  }

  addAssignment(assignment: Assignment): Observable<any>{
    //this.assignment.push(assignment);
    //this.loggingService.log(assignment.nom,"ajouté")
    //return of('Assignment ajouté');
    return this.http.post<Assignment>(this.url, assignment, this.HttpOptions);
  }

  updateAssignment(assignment: Assignment): Observable<any>{
    /*this.assignment.push(assignment);
    return of('Assignment modifié');*/
    //const index = this.assignment.findIndex(a => a.id === assignment.id);
    //if (index !== -1) {
    //  this.assignment[index] = assignment;
    //  return of('Assignment modifié');
    //} 
    //return of(undefined);
    return this.http.put<Assignment>(this.url, assignment);
  }

  deleteAssignmentById(id: number): Observable<String> {
    const index = this.assignment.findIndex(a => a.id === id);
    if (index !== -1) {
      this.assignment.splice(index, 1);
      return of('Assignment supprimé');
    } else {
     return throwError(() => new Error('Assignment non trouvé'));
    }
  }
  
  deleteAssignment(assignment: Assignment): Observable<any>{
    //const index = this.assignment.findIndex(a => a.id === assignment.id);
    //if (index !== -1) {
    //  this.assignment.splice(index, 1);
    //  return of('Assignment supprimé');
    //} else {
    //  return throwError(() => new Error('Assignment non trouvé'));
    //}
    let deleteURI = this.url + '/' + assignment._id;
    return this.http.delete(deleteURI);
  }
  

  getAssignment(id: number): Observable<Assignment | undefined>{
    //const a:Assignment | undefined = this.assignment.find(a => a.id === id);
    //return of(a);
    return this.http.get<Assignment>(this.url + "/" + id)
    .pipe(
      map(a => {
        a.nom += "reçu et transformé en pipe";
        return a;
      }),
      tap(_ => {
        console.log("tap: assignment avec id = " + id + "requête GET envoyé sur MongoDB")
      }),
      catchError(this.handleError<any>('### catchError: getAssignments by id avec id=' + id))
    );
  }

  private handleError<T>(operation: any, result?: T) {
    return (error: any): Observable<T> => {
      console.log(error); // pour afficher dans la console
      console.log(operation + ' a échoué ' + error.message);
 
      return of(result as T);
    }
 };
 


}
