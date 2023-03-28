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
Julius Caesar protected his confidential information by encrypting it using a
cipher. Caesar's cipher shifts each letter by a number of letters. If the shift
takes you past the end of the alphabet, just rotate back to the front of the
alphabet. In the case of a rotation by 3, w, x, y and z would map to z, a, b and
c.

Original alphabet:      abcdefghijklmnopqrstuvwxyz
Alphabet rotated +3:    defghijklmnopqrstuvwxyzabc

Note: The cipher only encrypts letters; symbols, such as -, remain unencrypted.

Function Description
Complete the caesarCipher function in the editor below.
caesarCipher has the following parameter(s):
string s: cleartext
int k: the alphabet rotation factor

Returns
string: the encrypted string
*/

/*
 * Complete the 'caesarCipher' function below.
 *
 * The function is expected to return a STRING.
 * The function accepts following parameters:
 *  1. STRING s
 *  2. INTEGER k
 */


function caesarCipher(s: string, k: number): string {
    // Write your code here
    k=k%26;
    const arr:string[]=s.split("");
    for(let i=0;i<arr.length;i++){
        let charCode:number=arr[i].charCodeAt(0);
        if(charCode>=65 && charCode<=90){
            charCode+=k;
            if(charCode>90){
                charCode-=26;
            }
        } else if(charCode>=97 && charCode<=122){
            charCode+=k;
            if(charCode>122){
                charCode-=26;
            }
        }
        arr[i]=String.fromCharCode(charCode);
    }
    
    return arr.join("");
}

function main() {
    const ws: WriteStream = createWriteStream(process.env['OUTPUT_PATH']);

    const n: number = parseInt(readLine().trim(), 10);

    const s: string = readLine();

    const k: number = parseInt(readLine().trim(), 10);

    const result: string = caesarCipher(s, k);

    ws.write(result + '\n');

    ws.end();
}
