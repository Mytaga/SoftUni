using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Tic_Tac_Toe
{
    public class ConsolePlayer : IPlayer
    { 
        public Index Play(Board board, Symbol symbol)
        {
            Index position;
            Console.WriteLine(board.ToString());
            while (true)
            {
                Console.Write($"{symbol} PLease enter position:(0,0):");
                var line = Console.ReadLine();
               
                try
                {
                    position = new Index(line);
                } 
                catch 
                {
                    Console.WriteLine("Invalid postion format!");
                    continue;
                }

                if (!board.GetEmptyPositions().Any(x => x.Equals(position)))
                {
                    Console.WriteLine("This position is not available!");
                    continue;
                }

                break;
            }

            return position;
        }

        
    }
}
 