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
Given a square matrix, calculate the absolute difference between the sums of its
diagonals.

For example, the square matrix  is shown below:

1 2 3
4 5 6
9 8 9  
The left-to-right diagonal = 1+5+9=15. The right to left diagonal = 3+5+9=17. Their absolute
difference is |15-17|=2.
*/

/*
The diagonalDifference function takes a two-dimensional array of integers arr as
input and calculates the absolute difference between the sums of the diagonal
elements of the matrix. Specifically, it calculates the sum of the elements
along the diagonal from the top left corner to the bottom right corner (referred
to as the tl_br variable), and the sum of the elements along the diagonal from
the top right corner to the bottom left corner (referred to as the tr_bl
variable). It then returns the absolute difference between tl_br and tr_bl.

The function achieves this by using two nested loops to iterate through each
element of the matrix. If the current element is on the top left to bottom right
diagonal (i.e., if i === j), the element is added to tl_br. Similarly, if the
current element is on the top right to bottom left diagonal (i.e., if j ===
arr.length - i - 1), the element is added to tr_bl. Finally, the absolute
difference between tl_br and tr_bl is returned.

The main function reads input from the standard input stream, parses it to
construct a matrix of integers, calls the diagonalDifference function with the
matrix as input, and writes the result to the standard output stream.
*/

/*
 * Complete the 'diagonalDifference' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts 2D_INTEGER_ARRAY arr as parameter.
 */

function diagonalDifference(arr: number[][]): number {
    // Write your code here
    //let tl_br:number=0;
    //let tr_bl:number=0;
    let [tl_br, tr_bl]: [number, number] = [0, 0];
    for(let i=0;i<arr.length;i++){
        for(let j=0;j<arr.length;j++){
            //console.log(arr[i][j]);
            if(i===j){
                //top left to bottom right
                tl_br+=arr[i][j];
            } 
            if(j===arr.length-i-1){
                //top right to bottom left
                tr_bl+=arr[i][j];
            }
        }
    }

    return Math.abs(tl_br-tr_bl);
}

function main() {
    const ws: WriteStream = createWriteStream(process.env['OUTPUT_PATH']);

    const n: number = parseInt(readLine().trim(), 10);

    let arr: number[][] = Array(n);

    for (let i: number = 0; i < n; i++) {
        arr[i] = readLine().replace(/\s+$/g, '').split(' ').map(arrTemp => parseInt(arrTemp, 10));
    }

    const result: number = diagonalDifference(arr);

    ws.write(result + '\n');

    ws.end();
}
