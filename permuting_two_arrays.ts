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
Given two n element arrays A and B test the relation: if A'[i]+B'[i]>=k
for all i return "YES" else return "NO"
*/

/*
***Chat-GPT***
The function twoArrays takes three arguments: an integer k, an array A of
integers, and an array B of integers. It returns a string "YES" if the sum of
the ith element in A and the ith element in B is greater than or equal to k for
all i, and "NO" otherwise.

In the function, the arrays A and B are sorted in ascending and descending order
respectively using the sort() method. The function then loops through each
element of the sorted arrays and checks if the sum of the corresponding elements
is greater than or equal to k. If at any point the sum is less than k, the
function returns "NO". If all the sums are greater than or equal to k, the
function returns "YES".

The main() function reads input from the standard input and writes the output to
standard output. It first reads the number of test cases q from the input,
followed by q sets of inputs each containing the length of the arrays n, the
integer k, and the arrays A and B. For each set of inputs, the function calls
twoArrays with the corresponding arguments and writes the result to standard
output.
*/

/*
 * Complete the 'twoArrays' function below.
 *
 * The function is expected to return a STRING.
 * The function accepts following parameters:
 *  1. INTEGER k
 *  2. INTEGER_ARRAY A
 *  3. INTEGER_ARRAY B
 */

function twoArrays(k: number, A: number[], B: number[]): string {
    // Write your code here
    A.sort((a,b)=>a-b);
    B.sort((a,b)=>b-a);
    for(let i=0;i<A.length;i++){
        if(A[i]+B[i]<k){
            return "NO";
        }
    }
    return "YES";
}

function main() {
    const ws: WriteStream = createWriteStream(process.env['OUTPUT_PATH']);

    const q: number = parseInt(readLine().trim(), 10);

    for (let qItr: number = 0; qItr < q; qItr++) {
        const firstMultipleInput: string[] = readLine().replace(/\s+$/g, '').split(' ');

        const n: number = parseInt(firstMultipleInput[0], 10);

        const k: number = parseInt(firstMultipleInput[1], 10);

        const A: number[] = readLine().replace(/\s+$/g, '').split(' ').map(ATemp => parseInt(ATemp, 10));

        const B: number[] = readLine().replace(/\s+$/g, '').split(' ').map(BTemp => parseInt(BTemp, 10));

        const result: string = twoArrays(k, A, B);

        ws.write(result + '\n');
    }

    ws.end();
}
