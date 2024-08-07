const fs = require('fs');
const path = require('path');

const srcDirectory = './src'; // Asegúrate de que este es el camino correcto a la carpeta src
const outputFiles = {
    js: 'all_javascript.js',
    ts: 'all_typescript.ts',
    scss: 'all_styles.scss',
    html: 'all_templates.html',
    php: 'all_php_code.php',
    tree: 'all_files_tree.txt',
};

// Estado para saber si hemos escrito el comentario inicial
const hasWrittenInitialComment = {
    js: false,
    ts: false,
    scss: false,
    html: false,
};

// Lista para mantener un registro de los archivos visitados
let fileTree = [];

// Función para escribir el contenido de un archivo en el archivo correspondiente
function appendFileContent(filePath, fileType) {
    const content = fs.readFileSync(filePath, 'utf8');
    let commentSyntax = '// ';
    let sufix = '\n\n';

    if (fileType === 'html') {
        commentSyntax = '<!-- ';
        sufix = ' -->\n\n';
    }

    // Escribir comentario inicial si no ha sido escrito aún
    if (!hasWrittenInitialComment[fileType]) {
        let text = "Este archivo contiene el código de todo el proyecto de forma concatenada uno tras otro separados por un comentario con la ruta del archivo cuyo código está exactamente a continuación de su nombre";
        let initialComment = `${commentSyntax} ${text} ${sufix}`
        fs.writeFileSync(outputFiles[fileType], initialComment);
        hasWrittenInitialComment[fileType] = true;
    }

    // Escribir el contenido del archivo con el comentario de separación
    const writeStream = fs.createWriteStream(outputFiles[fileType], { flags: 'a' });
    writeStream.write(`${commentSyntax} ----------------------- file: ${filePath} ----------------------- ${sufix}`);
    writeStream.write(content + '\n\n');
    writeStream.end();
}

// Función recursiva para leer directorios y archivos
function readDirectory(directory) {
    const files = fs.readdirSync(directory);
    for (const file of files) {
        const fullPath = path.join(directory, file);
        const stats = fs.statSync(fullPath);
        if (stats.isDirectory()) {
            readDirectory(fullPath); // Llamada recursiva para directorios
        } else if (stats.isFile()) {
            const fileType = path.extname(file).slice(1);
            if (outputFiles[fileType]) {
                appendFileContent(fullPath, fileType); // Procesar archivos según su tipo
            }
            fileTree.push(fullPath);
        }
    }
}

// Función para generar la estructura del árbol de archivos
function generateFileTree(directory, prefix = '') {
    const files = fs.readdirSync(directory);
    let tree = '';
    files.forEach((file, index) => {
        const fullPath = path.join(directory, file);
        const stats = fs.statSync(fullPath);
        const isLast = index === files.length - 1;

        if (stats.isDirectory()) {
            tree += `${prefix}${isLast ? '└── ' : '├── '}${file}/\n`;
            tree += generateFileTree(fullPath, `${prefix}${isLast ? '    ' : '│   '}`);
        } else {
            tree += `${prefix}${isLast ? '└── ' : '├── '}${file}\n`;
        }
    });
    return tree;
}

// Borramos los archivos de salida si ya existen
for (const fileType in outputFiles) {
    const filePath = outputFiles[fileType];
    if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
    }
}

// Leer y procesar la carpeta src
readDirectory(srcDirectory);

// Añadir la estructura del directorio raíz al archivo de estructura
const fileTreeStructure = generateFileTree(srcDirectory);
fs.writeFileSync(outputFiles.tree, 'Estructura del directorio raíz:\n\n');
fs.appendFileSync(outputFiles.tree, fileTreeStructure);

console.log('Proceso completado.');
