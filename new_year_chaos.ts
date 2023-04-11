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
It is New Year's Day and people are in line for the Wonderland rollercoaster
ride. Each person wears a sticker indicating their initial position in the queue
from 1 to n. Any person can bribe the person directly in front of them to swap
positions, but they still wear their original sticker. One person can bribe at
most two others.

Determine the minimum number of bribes that took place to get to a given queue
order. Print the number of bribes, or, if anyone has bribed more than two
people, print Too chaotic.

Example
    q=[1,2,3,4,5,6,7,8]
    if person 5 bribes person 4 the queue will be:
    q=[1,2,3,5,4,6,7,8]
    Only one bribe is required. Print 1

    q=[4,1,2,3]
    Person 4 bribed 3 people. Print "Too chaotic"

Function Description
Complete the function minimumBribes in the editor below.
minimumBribes has the following parameter(s):
    int q[n]: the positions of the people after all bribes

Returns
No value is returned. Print the minimum number of bribes necessary or Too
chaotic if someone has bribed more than 2 people.
*/

/*
 * Complete the 'minimumBribes' function below.
 *
 * The function accepts INTEGER_ARRAY q as parameter.
 */

function minimumBribes(q: number[]): void {
    // Write your code here
    let stack:number[]=[];
    let next_num:number=q.length;
    let current_index:number=q.length-1;
    let count:number=0;
    while(next_num!=1){
        if(next_num-current_index>3){
            console.log("Too chaotic");
            //console.log(stack);
            //console.log(next_num,current_index);
            return;
        }
        if(q[current_index]===next_num){
            count+=next_num-current_index-1;
            stack.push(next_num);
            q.splice(current_index,1);
            current_index=q.length-1;
            next_num--;
        } else{
            current_index--;
        }
    }
    console.log(count);
    //console.log(stack);
    return;
}

function main() {
    const t: number = parseInt(readLine().trim(), 10);

    for (let tItr: number = 0; tItr < t; tItr++) {
        const n: number = parseInt(readLine().trim(), 10);

        const q: number[] = readLine().replace(/\s+$/g, '').split(' ').map(qTemp => parseInt(qTemp, 10));

        minimumBribes(q);
    }
}
