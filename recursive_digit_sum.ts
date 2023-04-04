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
We define super digit of an integer x using the following rules:

Given an integer, we need to find the super digit of the integer.

If x has only 1 digit, then its super digit is x. Otherwise, the super digit of
x is equal to the super digit of the sum of the digits of x. For example, the
super digit of 9875 will be calculated as:

    super_digit(9875)   	9+8+7+5 = 29 
    super_digit(29) 	    2 + 9   = 11
    super_digit(11)		    1 + 1   = 2
    super_digit(2)		      2     = 2 
*/

/*
 * Complete the 'superDigit' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts following parameters:
 *  1. STRING n
 *  2. INTEGER k
 */
function calculateSuper(p:number):number{
    let temp:string;
    if(p>9){
        temp=p.toString();
        p=0;
        for(let i=0;i<temp.length;i++){
            p+=Number(temp[i]);
        }
        return calculateSuper(p);
    }
    return p;
}

function superDigit(n: string, k: number): number {
    // Write your code here
    let total:number=0;
    for(let i=0;i<n.length;i++){
        total+=Number(n[i]);
    }
    total=total*k;
    return calculateSuper(total);
}

function main() {
    const ws: WriteStream = createWriteStream(process.env['OUTPUT_PATH']);

    const firstMultipleInput: string[] = readLine().replace(/\s+$/g, '').split(' ');

    const n: string = firstMultipleInput[0];

    const k: number = parseInt(firstMultipleInput[1], 10);

    const result: number = superDigit(n, k);

    ws.write(result + '\n');

    ws.end();
}
