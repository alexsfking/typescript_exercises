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
Given an array of integers, where all elements but one occur twice, find the unique element.

Example
a=[1,2,3,4,3,2,1]
The unique element is 4.
*/

/*
 * Complete the 'lonelyinteger' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts INTEGER_ARRAY a as parameter.
 */

function lonelyinteger(a: number[]): number {
    // Write your code here
    const uniq = new Set<number>();
    const hash: Record<number,number>={}
    for(let i=0;i<a.length;i++){
        if(a[i] in hash){
            if(uniq.has(a[i])){
                //remove from unique
                uniq.delete(a[i]);
            }
        } else {
            //add to hash and unique
            uniq.add(a[i]);
            hash[a[i]]=1;
        }
    }
    return uniq.values().next().value;
}

function main() {
    const ws: WriteStream = createWriteStream(process.env['OUTPUT_PATH']);

    const n: number = parseInt(readLine().trim(), 10);

    const a: number[] = readLine().replace(/\s+$/g, '').split(' ').map(aTemp => parseInt(aTemp, 10));

    const result: number = lonelyinteger(a);

    ws.write(result + '\n');

    ws.end();
}
