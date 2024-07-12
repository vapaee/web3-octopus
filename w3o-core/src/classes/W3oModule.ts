import {
    BehaviorSubject
} from 'rxjs';


// Clase abstracta que representa un módulo (authenticador, network o servicio), su ID ()
export abstract class W3oModule {
    initialized$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    constructor() {}

    // Método abstracto que deberá ser implementado por los móidulos que lo necesiten
    // esta función será llamada cuando todos los módulos requeridos estén inicializados
    init(): void {
        this.initialized$.next(true);
    }

    // Método abstracto para obtener la versión del módulo
    abstract get w3oVersion(): string;

    // Método abstracto para obtener el nombre del módulo
    abstract get w3oName(): string;

    // Método abstracto para obtener la lista de dependencias del módulo
    abstract get w3oRequire(): string[];

    // Devuelve el ID del módulo
    get w3oId(): string {
        return this.w3oName + '@' + this.w3oVersion;
    }

    // Método abstracto para tomar una instantánea del estado del módulo
    abstract snapshot(): any;
}
