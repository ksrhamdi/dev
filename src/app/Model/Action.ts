export class ActionModel {
   _id: string;
   refAction: string;
   pilote: string;
   dateDebut: Date;
   dateFin: Date;
   description: string;
   problemeConstat: string;
   type: string;
   statut: string;
   visibilite: boolean;
   theme: string;
   // tslint:disable-next-line: max-line-length
   constructor(statut: string, refAction: string, pilote: string, dateDebut: Date, dateFin: Date, description: string, problemeConstat: string, type: string, visibilite: boolean ) { 
      this.dateDebut = dateDebut;
      this.refAction = refAction;
      this.dateFin = dateFin;
      this.type = type;
      this.pilote = pilote;
      this.problemeConstat = problemeConstat;
      this.visibilite = visibilite;
      this.description = description;
      this.statut = statut;

   }
}
