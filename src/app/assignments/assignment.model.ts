export class Assignment {
  // ? indique que l'attribut est optionnel
  // lors de la création d'un nouvel assignment, MongoDB va créer un id
  _id?:number;
  id!:number;
  nom!:string;
  dateDeRendu!:Date;
  rendu!:boolean;
}
