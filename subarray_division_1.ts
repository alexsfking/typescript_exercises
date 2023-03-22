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
Two children, Lily and Ron, want to share a chocolate bar. Each of the squares
has an integer on it.

Lily decides to share a contiguous segment of the bar selected such that:

The length of the segment matches Ron's birth month, and, The sum of the
integers on the squares is equal to his birth day. Determine how many ways she
can divide the chocolate.

Example
s=[2,2,1,3,2]
d=4   m=2

Lily wants to find segments summing to Ron's birth day, d=4 with a length
equalling his birth month, m=2. In this case, there are two segments meeting her
criteria: [2,2] and [1,3].

Function Description
Complete the birthday function in the editor below.
birthday has the following parameter(s):
    int s[n]: the numbers on each of the squares of chocolate
    int d: Ron's birth day
    int m: Ron's birth month

Returns
    int: the number of ways the bar can be divided
*/

/*
 * Complete the 'birthday' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts following parameters:
 *  1. INTEGER_ARRAY s
 *  2. INTEGER d
 *  3. INTEGER m
 */

function birthday(s: number[], d: number, m: number): number {
    // Write your code here
    //m is the window length
    //d is the sum condition
    let window_start:number = 0;
    let window_end:number = 0;
    let window_sum:number = 0;
    let number_of_ways:number = 0;
    while(window_end<s.length){
        window_sum+=s[window_end];
        window_end+=1;
        if(window_end-window_start==m){
            if(window_sum===d){
                number_of_ways+=1;
            }
            window_sum-=s[window_start];
            window_start+=1;
        }
    }
    return number_of_ways;
}

function main() {
    const ws: WriteStream = createWriteStream(process.env['OUTPUT_PATH']);

    const n: number = parseInt(readLine().trim(), 10);

    const s: number[] = readLine().replace(/\s+$/g, '').split(' ').map(sTemp => parseInt(sTemp, 10));

    const firstMultipleInput: string[] = readLine().replace(/\s+$/g, '').split(' ');

    const d: number = parseInt(firstMultipleInput[0], 10);

    const m: number = parseInt(firstMultipleInput[1], 10);

    const result: number = birthday(s, d, m);

    ws.write(result + '\n');

    ws.end();
}
