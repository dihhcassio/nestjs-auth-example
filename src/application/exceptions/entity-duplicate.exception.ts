export class EntityDuplicateException extends Error{
    constructor(message: string){
        super(message);
        this.name = 'EntityDuplicateException';
    }
}