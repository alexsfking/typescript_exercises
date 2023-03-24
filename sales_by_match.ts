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
There is a large pile of socks that must be paired by color. Given an array of
integers representing the color of each sock, determine how many pairs of socks
with matching colors there are.
*/

/*
 * Complete the 'sockMerchant' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts following parameters:
 *  1. INTEGER n
 *  2. INTEGER_ARRAY ar
 */

function sockMerchant(n: number, ar: number[]): number {
    // Write your code here
    const socks: Record<number,number>={};
    for(let i=0;i<ar.length;i++){
        if(ar[i] in socks){
            socks[ar[i]]+=1;
        } else {
            socks[ar[i]]=1;
        }
    }
    let pairs:number=0;
    for(const key in socks){
        pairs+=Math.floor(socks[key]/2);
    }
    return pairs;
}

function main() {
    const ws: WriteStream = createWriteStream(process.env['OUTPUT_PATH']);

    const n: number = parseInt(readLine().trim(), 10);

    const ar: number[] = readLine().replace(/\s+$/g, '').split(' ').map(arTemp => parseInt(arTemp, 10));

    const result: number = sockMerchant(n, ar);

    ws.write(result + '\n');

    ws.end();
}
