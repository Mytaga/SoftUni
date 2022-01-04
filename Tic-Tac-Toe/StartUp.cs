using System;
using Tic_Tac_Toe.Players;

namespace Tic_Tac_Toe
{
    class StartUp
    {
        static void Main(string[] args)
        {
            Console.Title = "TicTacToeGame";
            while (true)
            {
                Console.Clear();
                Console.ForegroundColor = ConsoleColor.Red;
                Console.WriteLine("===TicTacToe Game===");
                Console.WriteLine("7. Exit");
                Console.WriteLine("1. Player vs Player");
                Console.WriteLine("2. Player vs Random");
                Console.WriteLine("3. Random vs Player");
                Console.WriteLine("4. Random vs Random");
                Console.WriteLine("5. Player vs Master");
                Console.WriteLine("6. Master vs Player");

                while (true)
                { 
                    Console.Write("Please enter number [0-5]: ");
                    var line = Console.ReadLine();

                    if (line == "1")
                    {
                        PlayGame(new ConsolePlayer(), new ConsolePlayer());
                        break;
                    }
                    else if (line == "2")
                    {
                        PlayGame(new ConsolePlayer(), new RandomPlayer());
                        break;
                    }
                    else if (line == "3")
                    {
                        PlayGame(new RandomPlayer(), new ConsolePlayer());
                        break;
                    }
                    else if (line == "4")
                    {
                        PlayGame(new RandomPlayer(), new RandomPlayer());
                        break;
                    }
                    else if (line == "5")
                    {
                        PlayGame(new ConsolePlayer(), new MasterPlayer());
                        break;
                    }
                    else if (line == "6")
                    {
                        PlayGame(new MasterPlayer(), new ConsolePlayer());
                        break;
                    }
                    else if (line == "7")
                    {
                        return;
                    }
                }
                Console.ResetColor();
                Console.Write("Press [enter] to continue...");
                Console.ReadLine();
            }
            
        }   
        static void PlayGame(IPlayer player1, IPlayer player2)
        {
            Console.ResetColor();
            var game = new TicTacToeGame(player1, player2);
            var result = game.Play();
            Console.ForegroundColor = ConsoleColor.DarkYellow;
            Console.WriteLine("GAME OVER");
            Console.WriteLine($"Winner: {result.Winner}");
            Console.WriteLine(result.Board.ToString());                      
        }
    }
}
