'use strict';

import { WriteStream, createWriteStream } from "fs";
process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString: string = '';
let inputLines: string[] = [];
let currentLine: number = 0;

process.stdin.on('data', function(inputStdin: string): void {
    inputString += inputStdin;
});

process.stdin.on('end', function(): void {
    inputLines = inputString.split('\n');
    inputString = '';

    main();
});

function readLine(): string {
    return inputLines[currentLine++];
}
/*
A pangram is a string that contains every letter of the alphabet. Given a
sentence determine whether it is a pangram in the English alphabet. Ignore case.
Return either pangram or not pangram as appropriate.

Example s='The quick brown fox jumps over the lazy dog'

The string contains all letters in the English alphabet, so return pangram.

Function Description
Complete the function pangrams in the editor below. It should return the string
pangram if the input string is a pangram. Otherwise, it should return not
pangram.

pangrams has the following parameter(s):

string s: a string to test 

Returns
string: either pangram or not pangram
*/
/*
 * Complete the 'pangrams' function below.
 *
 * The function is expected to return a STRING.
 * The function accepts STRING s as parameter.
 */

function isLetter(char: string): boolean {
    const letterRegExp: RegExp = /^[a-zA-Z]$/;
    return letterRegExp.test(char);
  }

function pangrams(s: string): string {
    // Write your code here
    const uniq = new Set<string>();
    for(let i =0;i<s.length;i++){
        if(isLetter(s[i])){
            uniq.add(s[i].toLowerCase());
        }
    }
    if(uniq.size===26){
        return "pangram"
    }
    return "not pangram"
}

function main() {
    const ws: WriteStream = createWriteStream(process.env['OUTPUT_PATH']);

    const s: string = readLine();

    const result: string = pangrams(s);

    ws.write(result + '\n');

    ws.end();
}
