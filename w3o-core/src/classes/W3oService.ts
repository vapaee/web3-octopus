import {
    W3oModule,
    Web3Octopus,
} from '.';
import { W3oIServices } from '../types';


// Clase abstracta que representa un módulo, incluyendo un método para inicializar el módulo y obtener un snapshot del estado interno
export abstract class W3oService extends W3oModule {
    constructor(public path: string) {
        super();
    }
}

// -- ejemplo de uso --
class MyServiceClass extends W3oService {
    w3oName = 'my-service';
    w3oVersion = '1.0.0';
    w3oRequire = [];
    constructor(public path: string)  {
        super(path);
    }
    init(): void {
        console.log('init');
        this.initialized$.next(true);
    }
    snapshot(): any {
        return {};
    }
    hello() {
        console.log('hello');
    }
}


interface IMyServices extends W3oIServices {
    foo: MyServiceClass;
}
const octopus = new Web3Octopus<IMyServices>();
const myService = new MyServiceClass('foo');

export function getOctopus() {
    return octopus;
}
// --
const oct = getOctopus();
oct.services.foo.hello();
myService.hello();

