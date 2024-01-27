export class Assignment {
  // ? indique que l'attribut est optionnel
  // lors de la création d'un nouvel assignment, MongoDB va créer un id
  _id?:number;
  id!:number;
  nom!:string;
  dateDeRendu!:Date;
  rendu!:boolean;

   // Nouvelles propriétés
  auteur!: string; // Nom de l'élève
  matiere!: string; // Matière de l'assignment (ex. Base de données, Technologies Web, etc.)
  imageMatiere?: string; // URL ou chemin d'accès à l'image associée à la matière
  photoProf?: string; // URL ou chemin d'accès à la photo du prof
  note?: number; // Note sur 20. Optionnelle jusqu'à ce que l'assignment soit rendu et noté
  remarques?: string; // Remarques sur l'assignment

  
}
