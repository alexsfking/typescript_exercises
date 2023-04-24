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

class SinglyLinkedListNode {
    data: number;
    next: SinglyLinkedListNode | null;

    constructor(nodeData: number) {
        this.data = nodeData;
        this.next = null;
    }
};

class SinglyLinkedList {
    head: SinglyLinkedListNode | null;
    tail: SinglyLinkedListNode | null;

    constructor() {
        this.head = null;
        this.tail = null;
    }

    insertNode(nodeData: number): void {
        const node = new SinglyLinkedListNode(nodeData);

        if (this.head == null) {
            this.head = node;
        } else {
            this.tail!.next = node;
        }

        this.tail = node;
    }
};

function printSinglyLinkedList(node: SinglyLinkedListNode | null, sep: string, ws: WriteStream): void {
    while (node != null) {
        ws.write(String(node.data));

        node = node.next;

        if (node != null) {
            ws.write(sep);
        }
    }
}

/*
Given the pointer to the head node of a linked list and an integer to insert at
a certain position, create a new node with the given integer as its data
attribute, insert this node at the desired position and return the head node.

A position of 0 indicates head, a position of 1 indicates one node away from the
head and so on. The head pointer given may be null meaning that the initial list
is empty.

Example
head
1->2->3
data=4
position=2
1->2->4->3
*/

/*
 * Complete the 'insertNodeAtPosition' function below.
 *
 * The function is expected to return an INTEGER_SINGLY_LINKED_LIST.
 * The function accepts following parameters:
 *  1. INTEGER_SINGLY_LINKED_LIST llist
 *  2. INTEGER data
 *  3. INTEGER position
 */

/*
 * For your reference:
 *
 * SinglyLinkedListNode {
 *     number data;
 *     SinglyLinkedListNode next;
 * }
 *
 */

function insertNodeAtPosition(llist: SinglyLinkedListNode, data: number, position: number): SinglyLinkedListNode {
    // Write your code here
    let current_node:SinglyLinkedListNode|null=llist;
    const new_node:SinglyLinkedListNode=new SinglyLinkedListNode(data);
    if(position===0){
        new_node.next=llist;
        return new_node;
    }
    let count:number=0;
    while(current_node && count<position-1){
        current_node=current_node.next;
        count+=1
    }
    if(current_node){
        const temp:SinglyLinkedListNode|null=current_node.next;
        current_node.next=new_node;
        new_node.next=temp;
    }
    return llist;
}

function main() {
    const ws: WriteStream = createWriteStream(process.env['OUTPUT_PATH']);

    let llist: SinglyLinkedList = new SinglyLinkedList();

    const llistCount: number = parseInt(readLine().trim(), 10);

    for (let i: number = 0; i < llistCount; i++) {
        const llistItem: number = parseInt(readLine().trim(), 10);

        llist.insertNode(llistItem);
    }

    const data: number = parseInt(readLine().trim(), 10);

    const position: number = parseInt(readLine().trim(), 10);

    const llist_head: SinglyLinkedListNode = insertNodeAtPosition(llist.head, data, position);

    printSinglyLinkedList(llist_head, ' ', ws);
    ws.write('\n');

    ws.end();
}
