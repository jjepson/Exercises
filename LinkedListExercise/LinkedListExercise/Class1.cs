using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace LinkedListExercise
{
    public static class LinkedListExercise
    {
        public static bool ValidateLinkedListsTheShortWay(LinkedList<int> lList1, LinkedList<int> lList2)
        {
            //Only finds whether or not the linked lists are intersected.  If the linked lists are intersected, the last element will be the same for both lists.
            return lList1.Last == lList2.Last;
        }


        public static bool ValidateLinkedListsTheLongerWay(LinkedList<int> lList1, LinkedList<int> lList2)
        {
            //finds the actual intersection point
            
            if (lList1.Count() >= lList2.Count())
            {
                LinkedListNode<int> lList1Node = lList1.First;
                LinkedListNode<int> lList2Node = lList2.First;
                
                int lengthDifference = lList1.Count() - lList2.Count();

                while (lengthDifference > 0)
                {
                    lList1Node = lList1Node.Next;
                    lengthDifference--;
                }

                while (lList1Node != null && lList2Node != null)
                {
                    if (lList1Node == lList2Node)
                    {
                        //intersection found!
                        return true;
                    }
                    else
                    {
                        lList1Node = lList1Node.Next;
                        lList2Node = lList2Node.Next;
                    }
                }
                //no intersection found
                return false;
            }
            else
            {
               return ValidateLinkedListsTheLongerWay(lList2, lList1);
            }
        }
    }
}
