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
***Chat-GPT***
The superDigit function and calculateSuper function are used to calculate the
super digit of a given integer n multiplied by k.

The calculateSuper function takes a number p as input and recursively calculates
the super digit of p by adding up the individual digits of p. If p has only one
digit, then it is returned as the super digit. If p has more than one digit,
then calculateSuper is called again with the sum of the digits until the super
digit is found.

The superDigit function takes a string n and a number k as input. It first
calculates the sum of the digits in n multiplied by k. It then calls the
calculateSuper function with this sum to get the super digit of the integer.

The main function reads the input string from the standard input and passes it
to the superDigit function. The result is then written to the standard output.

To illustrate how these functions work, let's consider an example where n is
"9875" and k is 4. The sum of the digits of "9875" is 29, so total is set to 29
* 4 = 116. The calculateSuper function is then called with 116, which adds up
the digits and returns 8. Therefore, the super digit of "9875" multiplied by 4
is 8.
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
