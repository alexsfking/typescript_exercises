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
Louise and Richard have developed a numbers game. They pick a number and check
to see if it is a power of 2. If it is, they divide it by 2. If not, they reduce
it by the next lower number which is a power of 2. Whoever reduces the number to
1 wins the game. Louise always starts.

Given an initial value, determine who wins the game.

Example
n=132
It's Louise's turn first. She determines that 132 is not a power of 2. The next
lower power of 2 is 128, so she subtracts that from 132 and passes 4 to Richard.
4 is a power of 2, so Richard divides it by 2 and passes 2 to Louise. Likewise,
2 is a power so she divides it by 2 and reaches 1. She wins the game.

Update If they initially set counter to 1, Richard wins. Louise cannot make a
move so she loses.
*/

/*
 * Complete the 'counterGame' function below.
 *
 * The function is expected to return a STRING.
 * The function accepts LONG_INTEGER n as parameter.
 */

function nearestPowerOf2(n: number): number {
    // Calculate the logarithm base 2 of n
    return(Math.pow(2,Math.floor(Math.log2(n))));
}

function isPowerOf2(n: number): boolean {
    // Check if n is non-negative and has only one bit set to 1
    return n >= 0 && (n & (n - 1)) === 0;
}

function counterGame(n: number): string {
    // Write your code here
    let player:boolean=true;
    while(n!=1){
        if(isPowerOf2(n)){
            n=n/2;
        } else {
            n=n-nearestPowerOf2(n);
        }
        player=!player;
    }
    if(player===false){
        return "Louise";
    }
    return "Richard";
}

function main() {
    const ws: WriteStream = createWriteStream(process.env['OUTPUT_PATH']);

    const t: number = parseInt(readLine().trim(), 10);

    for (let tItr: number = 0; tItr < t; tItr++) {
        const n: number = parseInt(readLine().trim(), 10);

        const result: string = counterGame(n);

        ws.write(result + '\n');
    }

    ws.end();
}
