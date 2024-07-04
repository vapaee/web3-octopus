import {
    W3oModule,
    Web3Octopus,
} from '.';


// Clase abstracta que representa un módulo, incluyendo un método para inicializar el módulo y obtener un snapshot del estado interno
export abstract class W3oService<T> extends W3oModule<T> {
    constructor(public path: string, w3o: Web3Octopus<T>) {
        super(w3o);
    }
}

// -- ejemplo de uso --
class MyServiceClass<T> extends W3oService<T> {
    w3oName = 'my-service';
    w3oVersion = '1.0.0';
    w3oRequire = [];
    constructor(public path: string, w3o: Web3Octopus<T>)  {
        super(path, w3o);
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


interface IMyServices {
    foo: MyServiceClass<IMyServices>;
}
const octopus = new Web3Octopus<IMyServices>();
const myService = new MyServiceClass('foo', octopus);

export function getOctopus() {
    return octopus;
}
// --
const oct = getOctopus();
oct.services.foo.hello();

