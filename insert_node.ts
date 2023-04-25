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

/*
Sure! Here's the explanation of the insertNodeAtPosition function in the
provided code:

The insertNodeAtPosition function takes three parameters:

    llist: A reference to the head node of a singly linked list.
    data: An integer value to be inserted as a new node in the linked list.
    position: An integer indicating the position where the new node should be
    inserted. A position of 0 indicates the head, a position of 1 indicates one
    node away from the head, and so on.

The function first creates a new node with the given data value using the
SinglyLinkedListNode class. Then, based on the position parameter, the function
inserts the new node at the desired position in the linked list.

If position is 0, the new node is inserted as the new head of the linked list,
by setting its next pointer to the current head of the list and returning the
new node as the new head.

If position is greater than 0, the function iterates through the linked list
using a while loop and a count variable to keep track of the current position.
When the desired position is reached (position - 1), the function updates the
next pointer of the current node to point to the new node, and the next pointer
of the new node to point to the next node in the original list, effectively
inserting the new node at the desired position.

Finally, the function returns the reference to the head of the updated linked
list.

Note: The SinglyLinkedListNode class represents a node in a singly linked list
and has two properties - data which holds the value of the node, and next which
is a reference to the next node in the list or null if it is the last node. The
SinglyLinkedList class represents a singly linked list and has properties head
and tail which hold references to the head and tail nodes respectively. The
insertNode function in the SinglyLinkedList class is used to insert a new node
at the tail of the linked list.
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
