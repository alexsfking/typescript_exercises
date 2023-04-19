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
An arcade game player wants to climb to the top of the leaderboard and track
their ranking. The game uses Dense Ranking, so its leaderboard works like this:

    * The player with the highest score is ranked number 1 on the leaderboard. 
    * Players who have equal scores receive the same ranking number, and the
    next player(s) receive the immediately following ranking number.

Example
ranked=[100,90,90,80]
player=[70,80,105]

ranks=[1,2,2,3]
player_score=[70,80,105]
out=[4,3,1]
*/

/*
The given code implements a solution for an arcade game where a player wants to
climb to the top of the leaderboard and track their ranking. The game uses Dense
Ranking, where players with equal scores receive the same ranking number, and
the next player(s) receive the immediately following ranking number.

The code defines three main functions:

    createRanks(ranked: number[]): number[]: This function takes an array of
    integers ranked as input, which represents the scores of players on the
    leaderboard. It returns an array ranks of the same length as ranked, where
    ranks[i] represents the rank of the player with the score ranked[i] according to
    the Dense Ranking system. The function iterates through the ranked array and
    calculates the ranks by comparing consecutive scores. If two scores are equal,
    they are assigned the same rank, otherwise, the rank is incremented by 1.

    climbingLeaderboard(ranked: number[], player: number[]): number[]: This is the
    main function that solves the problem. It takes two input arrays of integers -
    ranked representing the scores on the leaderboard, and player representing the
    scores of the player. It returns an array out of the same length as player,
    where out[i] represents the rank of the player with the score player[i] after
    playing the game. The function first calls the createRanks function to calculate
    the ranks of the players on the leaderboard. Then, for each score in the player
    array, it compares it with the scores on the leaderboard using a while loop. It
    updates the ranked and ranks arrays based on the comparison and pushes the
    corresponding rank of the player into the out array.

    main(): This is the entry point of the program. It reads input from standard
    input, parses it, and calls the climbingLeaderboard function to get the results.
    It then writes the results to standard output.

In summary, the climbingLeaderboard function and its helper function createRanks
implement a solution for tracking the ranking of a player in an arcade game with
Dense Ranking system. The createRanks function calculates the ranks of players
on the leaderboard, and the climbingLeaderboard function uses these ranks to
determine the rank of the player after playing the game.
*/

/*
 * Complete the 'climbingLeaderboard' function below.
 *
 * The function is expected to return an INTEGER_ARRAY.
 * The function accepts following parameters:
 *  1. INTEGER_ARRAY ranked
 *  2. INTEGER_ARRAY player
 */

function createRanks(ranked: number[]): number[]{
    const ranks:number[]=[1];
    for(let i=1;i<ranked.length;i++){
        if(ranked[i]===ranked[i-1]){
            ranks.push(ranks[ranks.length-1]);
        } else {
            ranks.push(ranks[ranks.length-1]+1);
        }
    }
    return ranks;
}

function climbingLeaderboard(ranked: number[], player: number[]): number[] {
    // Write your code here
    const ranks:number[]=createRanks(ranked);
    const out:number[]=[];
    for(const player_score of player){
        while(ranked.length){
            if(ranked[ranked.length-1]<player_score){
                ranked.pop();
                ranks.pop();
            } else if(ranked[ranked.length-1]===player_score) {
                out.push(ranks[ranks.length-1]);
                break;
            } else if(ranked[ranked.length-1]>player_score){
                ranked.push(player_score);
                ranks.push(ranks[ranks.length-1]+1);
                out.push(ranks[ranks.length-1]);
                break;
            } else {
                console.log(player_score,ranks,ranked);
                throw new Error("Unknown error");
            }
        }
        if (ranked.length===0){
            out.push(1);
        }
    }
    return out;
}

function main() {
    const ws: WriteStream = createWriteStream(process.env['OUTPUT_PATH']);

    const rankedCount: number = parseInt(readLine().trim(), 10);

    const ranked: number[] = readLine().replace(/\s+$/g, '').split(' ').map(rankedTemp => parseInt(rankedTemp, 10));

    const playerCount: number = parseInt(readLine().trim(), 10);

    const player: number[] = readLine().replace(/\s+$/g, '').split(' ').map(playerTemp => parseInt(playerTemp, 10));

    const result: number[] = climbingLeaderboard(ranked, player);

    ws.write(result.join('\n') + '\n');

    ws.end();
}
