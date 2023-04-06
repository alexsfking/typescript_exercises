'use strict';

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
***Chat-GPT***
The plusMinus function takes an array of integers as its parameter arr and
calculates the ratio of positive, negative, and zero integers in the array. It
does this by iterating over the array using a loop and counting the number of
positive, negative, and zero integers encountered. Finally, it prints the ratios
of each of these categories to the total number of integers in the array, with
each ratio rounded to 6 decimal places.

The function does not return any value, but rather uses the console.log function
to print the ratios to the console. The toFixed method is used to round the
ratios to 6 decimal places before printing them.
*/

/*
 * Complete the 'plusMinus' function below.
 *
 * The function accepts INTEGER_ARRAY arr as parameter.
 */

function plusMinus(arr: number[]): void {
    let less:number=0;
    let greater:number=0;
    let zero:number=0;
    for(let i = 0; i < arr.length; i++) {
        if(arr[i]<0){
            less+=1;
        } else if(arr[i]>0){
            greater+=1;
        } else {
            zero+=1;
        }
    }
    console.log((greater/(arr.length)).toFixed(6));
    console.log((less/(arr.length)).toFixed(6));
    console.log((zero/(arr.length)).toFixed(6));
}

function main() {
    const n: number = parseInt(readLine().trim(), 10);

    const arr: number[] = readLine().replace(/\s+$/g, '').split(' ').map(arrTemp => parseInt(arrTemp, 10));

    plusMinus(arr);
}
