import core from './core';
import process from 'process';
var read = core.readdir(process.cwd(), [], ['.git']);
console.log(read);
