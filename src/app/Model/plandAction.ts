export class Paction {
    _id: string;
    planActionPilote: string;
    planActionTitre: string;
    source: string;
    planActionDateDebut: Date;
    planActionDateFin: Date;
    pieceJointe: string;
    planActionEquipe: object;
    theme: Array<string>;
    statut: string;
    refPlanAction: string;
    planActionCreation: Date;
    visibiliteId: string;
    typePlanAction: string;
 
    // tslint:disable-next-line: max-line-length
    public constructor(planActionPilote: string, typePlanAction: string,planActionTitre: string,source: string,planActionDateDebut: Date,planActionDateFin: Date,planActionEquipe:object,pieceJointe: string,statut: string,refPlanAction: string,planActionCreation: Date,visibiliteId: string){
       this.planActionPilote = planActionPilote;
       this.pieceJointe = pieceJointe;
       this.planActionCreation = planActionCreation;
       this.planActionTitre = planActionTitre;
       this.source = source;
       this.planActionDateDebut = planActionDateDebut;
       this.planActionDateFin = planActionDateFin;
       this.planActionEquipe = planActionEquipe;
       this.statut = statut;
       this.refPlanAction = refPlanAction;
       this.visibiliteId = visibiliteId ;
       this.typePlanAction = typePlanAction;
    }
}