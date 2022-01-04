using System;

namespace AdvancedExam
{
    class Program
    {
        static void Main(string[] args)
        {
            char[,] matrix = new char[8, 8];
            int whitePownRow = 0;
            int whitePownCol = 0;
            int blackPownRow = 0;
            int blackPownCol = 0;

            for (int i = 0; i < matrix.GetLength(0); i++)
            {
                string input = Console.ReadLine();

                for (int j = 0; j < matrix.GetLength(1); j++)
                {
                    matrix[i, j] = input[j];

                    if (matrix[i, j] == 'w')
                    {
                        whitePownRow = i;
                        whitePownCol = j;
                    }

                    if (matrix[i, j] == 'b')
                    {
                        blackPownRow = i;
                        blackPownCol = j;
                    }
                }
            }

            while (true)
            {
                if (IsInside(whitePownRow - 1, whitePownCol + 1, matrix) && matrix[whitePownRow - 1, whitePownCol + 1] == 'b')
                {
                    matrix[whitePownRow - 1, whitePownCol + 1] = 'w';
                    matrix[whitePownRow, whitePownCol] = '-';
                    Console.WriteLine($"Game over! White capture on {(char)(whitePownCol + 1 + 97)}{matrix.GetLength(0) - (whitePownRow - 1)}.");
                    break;
                }

                if (IsInside(whitePownRow - 1, whitePownCol - 1, matrix) && matrix[whitePownRow - 1, whitePownCol - 1] == 'b')
                {
                    matrix[whitePownRow - 1, whitePownCol - 1] = 'w';
                    matrix[whitePownRow, whitePownCol] = '-';
                    Console.WriteLine($"Game over! White capture on {(char)(whitePownCol - 1 + 97)}{matrix.GetLength(0) - (whitePownRow - 1)}.");
                    break;
                }

                whitePownRow--;
                matrix[whitePownRow, whitePownCol] = 'w';

                if (whitePownRow == 0)
                {
                    Console.WriteLine($"Game over! White pawn is promoted to a queen at {(char)(whitePownCol + 97)}{matrix.GetLength(0) - whitePownRow}.");
                    matrix[whitePownRow + 1, whitePownCol] = '-';
                    break;
                }

                if (IsInside(blackPownRow + 1, blackPownCol + 1, matrix) && matrix[blackPownRow + 1, blackPownCol + 1] == 'w')
                {
                    matrix[blackPownRow + 1, blackPownCol + 1] = 'b';
                    matrix[blackPownRow, blackPownCol] = '-';
                    Console.WriteLine($"Game over! Black capture on {(char)(blackPownCol + 1 + 97)}{matrix.GetLength(0) - (blackPownRow + 1)}.");
                    break;
                }
                if (IsInside(blackPownRow + 1, blackPownCol - 1, matrix) && matrix[blackPownRow + 1, blackPownCol - 1] == 'w')
                {
                    matrix[blackPownRow + 1, blackPownCol - 1] = 'b';
                    matrix[blackPownRow, blackPownCol] = '-';
                    Console.WriteLine($"Game over! Black capture on {(char)(blackPownCol - 1 + 97)}{matrix.GetLength(0) - (blackPownRow + 1)}.");
                    break;
                }

                blackPownRow++;
                matrix[blackPownRow, blackPownCol] = 'b';

                if (blackPownRow == matrix.GetLength(0) - 1)
                {
                    Console.WriteLine($"Game over! Black pawn is promoted to a queen at {(char)(blackPownCol + 97)}{matrix.GetLength(0) - blackPownRow}.");
                    matrix[blackPownRow - 1, blackPownCol] = '-';
                    break;
                }
            }
        }
        private static bool IsInside(int row, int col, char[,] matrix)
        {
            return row >= 0 && row < matrix.GetLength(0) && col >= 0 && col < matrix.GetLength(1);
        }
    }  
}
