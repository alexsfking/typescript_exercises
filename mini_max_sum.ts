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
 * Complete the 'miniMaxSum' function below.
 *
 * The function accepts INTEGER_ARRAY arr as parameter.
 */

function sumInRange(numbers: number[], start: number, end: number): number {
  let sum = 0;
  for (let i = start; i < end; i++) {
    sum += numbers[i];
  }
  return sum;
}


function miniMaxSum(arr: number[]): void {
    // Write your code here
    arr.sort((a,b)=>a-b);
    const minimum:number=sumInRange(arr,0,arr.length-1);
    const maximum:number=sumInRange(arr,1,arr.length);
    console.log(minimum,maximum);
}

function main() {

    const arr: number[] = readLine().replace(/\s+$/g, '').split(' ').map(arrTemp => parseInt(arrTemp, 10));

    miniMaxSum(arr);
}
