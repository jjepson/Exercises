using System;
using System.Text;
using System.Collections.Generic;
using System.Linq;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using LinkedListExercise;

namespace LinkedListExcerciseTest
{
    [TestClass]
    public class LinkedListTest
    {
        [TestMethod]
        public void TestNonIntersection()
        {
            LinkedList<int> testLinkedList1 = new LinkedList<int>();
            testLinkedList1.AddLast(3);
            testLinkedList1.AddLast(6);
            testLinkedList1.AddLast(7);
            testLinkedList1.AddLast(9);

            LinkedList<int> testLinkedList2 = new LinkedList<int>();
            testLinkedList2.AddLast(1);
            testLinkedList2.AddLast(2);
            testLinkedList2.AddLast(5);
            testLinkedList2.AddLast(8);            

            Assert.IsFalse(LinkedListExercise.LinkedListExercise.ValidateLinkedListsTheShortWay(testLinkedList1, testLinkedList2));
            Assert.IsFalse(LinkedListExercise.LinkedListExercise.ValidateLinkedListsTheShortWay(testLinkedList2, testLinkedList1));
            Assert.IsFalse(LinkedListExercise.LinkedListExercise.ValidateLinkedListsTheLongerWay(testLinkedList1, testLinkedList2));
            Assert.IsFalse(LinkedListExercise.LinkedListExercise.ValidateLinkedListsTheLongerWay(testLinkedList2, testLinkedList1));
        }

    //    [TestMethod]
    //    public void TestIntersection()
    //    {
    //        LinkedList<int> testLinkedList1 = new LinkedList<int>();
    //        testLinkedList1.AddLast(0);
    //        testLinkedList1.AddLast(1);
    //        testLinkedList1.AddLast(2);
    //        testLinkedList1.AddLast(3);
    //        testLinkedList1.AddLast(4);
    //        testLinkedList1.AddLast(5);

    //        LinkedList<int> testLinkedList2 = new LinkedList<int>();
    //        testLinkedList2.AddLast(10);
    //        testLinkedList2.AddLast(11);
    //        testLinkedList2.AddLast(12);

    //        LinkedListNode<int> intersectionNode = testLinkedList1.FindLast(3);
    //        //this fails in C# as a node cannot be in two lists at once. 
    //        do 
    //        {
    //            testLinkedList2.AddLast(intersectionNode);
    //            intersectionNode = intersectionNode.Next;
    //        } while (intersectionNode != null);


    //        Assert.IsFalse(LinkedListExercise.LinkedListExercise.ValidateLinkedListsTheShortWay(testLinkedList1, testLinkedList2));
    //        Assert.IsFalse(LinkedListExercise.LinkedListExercise.ValidateLinkedListsTheShortWay(testLinkedList2, testLinkedList1));
    //        Assert.IsFalse(LinkedListExercise.LinkedListExercise.ValidateLinkedListsTheLongerWay(testLinkedList1, testLinkedList2));
    //        Assert.IsFalse(LinkedListExercise.LinkedListExercise.ValidateLinkedListsTheLongerWay(testLinkedList2, testLinkedList1));
    //    }
    }
}
