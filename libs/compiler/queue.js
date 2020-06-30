"use strict";
/**
 * Creates a new queue. A queue is a first-in-first-out (FIFO) data structure -
 * items are added to the end of the queue and removed from the front.
 * @example
 * // create a new queue
 * var queue = new Queue();
 * // enqueue an item
 * queue.enqueue('item');
 * // dequeue an item
 * var item = queue.dequeue();
 * // get the item at the front of the queue
 * var item = queue.peek();
 * // determine the number of items in the queue
 * var length = queue.getLength();
 * // determine whether the queue is empty
 * var isEmpty = queue.isEmpty();
 */
function Queue() {
    // initialise the queue and offset
    var queue = [];
    var offset = 0;
    // Returns the length of the queue.
    this.getLength = function () {
        return queue.length - offset;
    };
    // Returns true if the queue is empty, and false otherwise.
    this.isEmpty = function () {
        return queue.length == 0;
    };
    /* Enqueues the specified item. The parameter is:
     *
     * item - the item to enqueue
     */
    this.enqueue = function (item) {
        queue.push(item);
    };
    /* Dequeues an item and returns it. If the queue is empty, the value
     * 'undefined' is returned.
     */
    this.dequeue = function () {
        // if the queue is empty, return immediately
        if (queue.length == 0)
            return undefined;
        // store the item at the front of the queue
        var item = queue[offset];
        // increment the offset and remove the free space if necessary
        if (++offset * 2 >= queue.length) {
            queue = queue.slice(offset);
            offset = 0;
        }
        // return the dequeued item
        return item;
    };
    /* Returns the item at the front of the queue (without dequeuing it). If the
     * queue is empty then undefined is returned.
     */
    this.peek = function () {
        return queue.length > 0 ? queue[offset] : undefined;
    };
}
module.exports = Queue;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicXVldWUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvY29tcGlsZXIvcXVldWUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7Ozs7Ozs7Ozs7Ozs7O0dBZ0JHO0FBQ0gsU0FBUyxLQUFLO0lBQ1osa0NBQWtDO0lBQ2xDLElBQUksS0FBSyxHQUFHLEVBQUUsQ0FBQztJQUNmLElBQUksTUFBTSxHQUFHLENBQUMsQ0FBQztJQUVmLG1DQUFtQztJQUNuQyxJQUFJLENBQUMsU0FBUyxHQUFHO1FBQ2YsT0FBTyxLQUFLLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztJQUMvQixDQUFDLENBQUM7SUFFRiwyREFBMkQ7SUFDM0QsSUFBSSxDQUFDLE9BQU8sR0FBRztRQUNiLE9BQU8sS0FBSyxDQUFDLE1BQU0sSUFBSSxDQUFDLENBQUM7SUFDM0IsQ0FBQyxDQUFDO0lBRUY7OztPQUdHO0lBQ0gsSUFBSSxDQUFDLE9BQU8sR0FBRyxVQUFVLElBQUk7UUFDM0IsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNuQixDQUFDLENBQUM7SUFFRjs7T0FFRztJQUNILElBQUksQ0FBQyxPQUFPLEdBQUc7UUFDYiw0Q0FBNEM7UUFDNUMsSUFBSSxLQUFLLENBQUMsTUFBTSxJQUFJLENBQUM7WUFBRSxPQUFPLFNBQVMsQ0FBQztRQUV4QywyQ0FBMkM7UUFDM0MsSUFBSSxJQUFJLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBRXpCLDhEQUE4RDtRQUM5RCxJQUFJLEVBQUUsTUFBTSxHQUFHLENBQUMsSUFBSSxLQUFLLENBQUMsTUFBTSxFQUFFO1lBQ2hDLEtBQUssR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQzVCLE1BQU0sR0FBRyxDQUFDLENBQUM7U0FDWjtRQUVELDJCQUEyQjtRQUMzQixPQUFPLElBQUksQ0FBQztJQUNkLENBQUMsQ0FBQztJQUVGOztPQUVHO0lBQ0gsSUFBSSxDQUFDLElBQUksR0FBRztRQUNWLE9BQU8sS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDO0lBQ3RELENBQUMsQ0FBQztBQUNKLENBQUM7QUFDRCxpQkFBUyxLQUFLLENBQUMifQ==