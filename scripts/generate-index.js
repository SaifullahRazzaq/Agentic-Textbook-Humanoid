const fs = require('fs');
const path = require('path');

const docsDir = path.join(__dirname, '../docs');
const outputFile = path.join(__dirname, '../src/components/chat-index.json');

function getAllFiles(dirPath, arrayOfFiles) {
    const files = fs.readdirSync(dirPath);

    arrayOfFiles = arrayOfFiles || [];

    files.forEach(function (file) {
        if (fs.statSync(dirPath + "/" + file).isDirectory()) {
            arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles);
        } else {
            if (file.endsWith('.md')) {
                arrayOfFiles.push(path.join(dirPath, "/", file));
            }
        }
    });

    return arrayOfFiles;
}

function parseMarkdown(content, filename) {
    const lines = content.split('\n');
    const sections = [];
    let currentSection = { title: 'General', content: '' };

    lines.forEach(line => {
        if (line.startsWith('# ')) {
            // Main title, ignore or set context
        } else if (line.startsWith('## ')) {
            if (currentSection.content.trim()) {
                sections.push(currentSection);
            }
            currentSection = { title: line.replace('## ', '').trim(), content: '', source: filename };
        } else {
            currentSection.content += line + ' ';
        }
    });

    if (currentSection.content.trim()) {
        sections.push(currentSection);
    }

    return sections;
}

const files = getAllFiles(docsDir);
let allSections = [];

files.forEach(file => {
    const content = fs.readFileSync(file, 'utf8');
    const filename = path.basename(file, '.md');
    const sections = parseMarkdown(content, filename);
    allSections = [...allSections, ...sections];
});

fs.writeFileSync(outputFile, JSON.stringify(allSections, null, 2));
console.log(`Indexed ${allSections.length} sections from ${files.length} files.`);
