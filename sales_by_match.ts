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
***Chat-GPT***
The problem that the code is solving is to determine the number of pairs of
socks with matching colors, given an array of integers representing the color of
each sock. The sockMerchant function takes two parameters, n which is an integer
representing the number of socks in the pile, and ar which is an array of
integers representing the color of each sock. The function returns an integer
representing the number of pairs of socks with matching colors.

The function works by using an object called socks to keep track of the number
of socks of each color. The for loop iterates over each sock in the array ar,
and for each sock, it checks if it has already been counted by checking if the
sock's color is a key in the socks object. If the color is already in the socks
object, the count for that color is incremented by 1. Otherwise, a new entry is
added to the socks object with a count of 1.

Once the socks object has been populated with the count of socks of each color,
the function iterates over each key in the object and calculates the number of
pairs of socks with matching colors by dividing the count of socks of each color
by 2 and rounding down to the nearest integer. The pairs of socks for each color
are added together to get the total number of pairs of socks with matching
colors, which is then returned by the function.

The main function reads input from standard input, calls the sockMerchant
function with the input parameters, and writes the result to standard output.
The input is expected to be in the following format:

The first line contains an integer n, which represents the number of socks in
the pile. The second line contains n space-separated integers, which represent
the colors of the socks.
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
