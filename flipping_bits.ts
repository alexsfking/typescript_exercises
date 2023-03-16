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
You will be given a list of 32 bit unsigned integers. Flip all the bits and return the result as an unsigned integer.
*/

/*
***Chat-GPT***
The flippingBits function in the provided code is intended to take a 32-bit
unsigned integer n as a parameter, flip all of its bits, and return the result
as another 32-bit unsigned integer.

The implementation of the function is quite simple. It uses the bitwise NOT
operator ~ to flip all the bits of the input number n, and then the zero-fill
right shift operator >>> to convert the result to an unsigned 32-bit integer.

The main function reads input values from standard input and calls flippingBits
function for each input value. The resulting value is then written to standard
output using a write stream. The expected input format is a number q
representing the number of input values, followed by q lines containing the
input values as 32-bit unsigned integers.

Note that the function assumes that the input is always a 32-bit unsigned
integer. If the input value has more than 32 bits or is signed, the function may
not produce the expected result.
*/

/*
 * Complete the 'flippingBits' function below.
 *
 * The function is expected to return a LONG_INTEGER.
 * The function accepts LONG_INTEGER n as parameter.
 */

function flippingBits(n: number): number {
    // Write your code here
    return ~n >>> 0;
}

function main() {
    const ws: WriteStream = createWriteStream(process.env['OUTPUT_PATH']);

    const q: number = parseInt(readLine().trim(), 10);

    for (let qItr: number = 0; qItr < q; qItr++) {
        const n: number = parseInt(readLine().trim(), 10);

        const result: number = flippingBits(n);

        ws.write(result + '\n');
    }

    ws.end();
}
