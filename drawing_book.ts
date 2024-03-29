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
A teacher asks the class to open their books to a page number. A student can
either start turning pages from the front of the book or from the back of the
book. They always turn pages one at a time. When they open the book, page 1 is
always on the right side:

When they flip page 1, they see pages 2 and 3. Each page except the last page will
always be printed on both sides. The last page may only be printed on the front,
given the length of the book. If the book is n pages long, and a student wants to
turn to page p, what is the minimum number of pages to turn? They can start at
the beginning or the end of the book.

Given n and p, find and print the minimum number of pages that must be turned in
order to arrive at page p.
*/

/*
***Chat-GPT***
This program defines a function named pageCount which is expected to return an
integer. The function takes two parameters, n and p, which represent the total
number of pages in a book and the target page number, respectively.

The pageCount function calculates the minimum number of pages that must be
turned in order to arrive at page p. To do this, it first calls two helper
functions: leftCount and rightCount. These functions calculate the number of
pages that need to be turned from the left and the right side of the book,
respectively.

The leftCount function takes the target page number as an argument and
calculates the number of pages that need to be turned from the left side of the
book to arrive at that page. It does this by dividing the target page number by
2 and rounding down to the nearest integer.

The rightCount function takes the total number of pages and the target page
number as arguments and calculates the number of pages that need to be turned
from the right side of the book to arrive at the target page. It does this by
checking whether the total number of pages is odd or even. If it is odd, it
calculates the number of pages to turn by subtracting the target page number
from the total number of pages and dividing the result by 2, rounding down to
the nearest integer. If it is even, it adds 1 to the difference between the
total number of pages and the target page number before dividing by 2 and
rounding down.

The pageCount function then compares the number of pages that need to be turned
from the left and the right side of the book and returns the smaller of the two
values as the result.

The rest of the program handles input and output. It reads two integers n and p
from standard input, calls the pageCount function with these values, and writes
the result to standard output.
*/

/*
 * Complete the 'pageCount' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts following parameters:
 *  1. INTEGER n
 *  2. INTEGER p
 */

function leftCount(p:number):number{
    return Math.floor(p/2);
}
function rightCount(n:number,p:number):number{
    if(n%2){
        //remainder
        return Math.floor((n-p)/2);
    } else {
        return Math.floor((n-p+1)/2);
    }
}

function pageCount(n: number, p: number): number {
    // Write your code here
    const left:number=leftCount(p);
    const right:number=rightCount(n,p);
    if(left<right){
        return left;
    }
    return right;
}

function main() {
    const ws: WriteStream = createWriteStream(process.env['OUTPUT_PATH']);

    const n: number = parseInt(readLine().trim(), 10);

    const p: number = parseInt(readLine().trim(), 10);

    const result: number = pageCount(n, p);

    ws.write(result + '\n');

    ws.end();
}
