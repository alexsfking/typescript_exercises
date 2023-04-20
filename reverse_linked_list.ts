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
Given the pointer to the head node of a linked list, change the next pointers of
the nodes so that their order is reversed. The head pointer given may be null
meaning that the initial list is empty.

Example
head references the list
1->2->3->NULL
Manipulate the next pinters of each node in place and return head now
referencing the head of the list 3->2->1->NULL

Function Description
Complete the reverse function in the editor below.
reverse has the following parameter:
    SinglyLinkedListNode pointer head: a reference to the head of a list

Returns
    SinglyLinkedListNode pointer: a reference to the head of the reversed list
*/

/*
 * Complete the 'reverse' function below.
 *
 * The function is expected to return an INTEGER_SINGLY_LINKED_LIST.
 * The function accepts INTEGER_SINGLY_LINKED_LIST llist as parameter.
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

function reverse(llist: SinglyLinkedListNode): SinglyLinkedListNode {
    // Write your code here
    let prev_node:SinglyLinkedListNode|null=null;
    let current_node:SinglyLinkedListNode|null=llist;
    while(current_node!==null){
        const next_node:SinglyLinkedListNode|null=current_node.next;
        current_node.next=prev_node;
        prev_node=current_node;
        current_node=next_node;
    }
    return prev_node!;
}

function main() {
    const ws: WriteStream = createWriteStream(process.env['OUTPUT_PATH']);

    const tests: number = parseInt(readLine().trim(), 10);

    for (let testsItr: number = 0; testsItr < tests; testsItr++) {
        let llist: SinglyLinkedList = new SinglyLinkedList();

        const llistCount: number = parseInt(readLine().trim(), 10);

        for (let i: number = 0; i < llistCount; i++) {
            const llistItem: number = parseInt(readLine().trim(), 10);

            llist.insertNode(llistItem);
        }

        const llist1: SinglyLinkedListNode = reverse(llist.head);

        printSinglyLinkedList(llist1, ' ', ws);
        ws.write('\n');
    }

    ws.end();
}
