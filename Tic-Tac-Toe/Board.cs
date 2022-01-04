using System;
using System.Collections.Generic;
using System.Text;

namespace Tic_Tac_Toe
{
    public class Board : IBoard
    {
        private Symbol[,] board;

        public Board() 
            : this(3, 3)
        {
            
        }

        public Board(int row, int col)
        {
            if (row != col)
            {
                throw new ArgumentException("Rows should be equal to columns");
            }
            this.Row = row;
            this.Col = col;
            this.board = new Symbol[row, col];
        }

        public int Row { get;}
        public int Col { get;}

        public Symbol[,] BoardState => this.board;

        public Symbol GetRowSymbol(int row)
        {
            var symbol = this.board[row, 0];

            if (symbol == Symbol.Empty)
            {
                return Symbol.Empty;
            }

            for (int col  = 1; col  < this.Col; col ++)
            {
                if (this.board[row, col] != symbol)
                {
                    return Symbol.Empty;
                }
            }

            return symbol;
        }

        public Symbol GetColumnSymbol(int col)
        {
            var symbol = this.board[0, col];

            if (symbol == Symbol.Empty)
            {
                return Symbol.Empty;
            }

            for (int row = 1; row < this.Row; row++)
            {
                if (this.board[row, col] != symbol)
                {
                    return Symbol.Empty;
                }
            }

            return symbol;
        }

        public Symbol GetDiagonalTLBRSymbol()
        {
            var symbol = this.board[0, 0];

            if (symbol == Symbol.Empty)
            {
                return symbol;
            }

            for (int i = 1; i < this.Row; i++)
            {
                if (this.board[i, i] != symbol)
                {
                    return Symbol.Empty;
                }
            }

            return symbol;
        }

        public Symbol GetDiagonalTRBLSymbol()
        {
            var symbol = this.board[0, this.Row - 1];

            if (symbol == Symbol.Empty)
            {
                return Symbol.Empty;
            }

            for (int row = 1; row < this.Row; row++)
            {
                if (this.board[row, this.Row - row - 1] != symbol)
                {
                    return Symbol.Empty;
                }
            }

            return symbol;
        }

        public IEnumerable<Index> GetEmptyPositions()
        {
            var positions = new List<Index>();

            for (int i = 0; i < this.board.GetLength(0); i++)
            {
                for (int j = 0; j < this.board.GetLength(1); j++)
                {
                    if (this.board[i, j] == Symbol.Empty)
                    {
                        positions.Add(new Index(i, j));
                    }
                }
            }

            return positions;
        }
      
        public bool IsFull()
        {
            for (int i = 0; i < this.board.GetLength(0); i++)
            {
                for (int j = 0; j < this.board.GetLength(1); j++)
                {
                    if (this.board[i,j] == Symbol.Empty)
                    {
                        return false;
                    }
                }                
            }
            return true;
        }

        public void PlaceSymbol(Index index, Symbol symbol)
        {
            if (index.Row < 0 || index.Column < 0 || index.Row >= this.Row || index.Column >= this.Col )
            {
                throw new IndexOutOfRangeException("Index is out of range.");
            }
            this.board[index.Row, index.Column] = symbol;
        }

        public override string ToString()
        {
            var sb = new StringBuilder();
            for (int i = 0; i < this.board.GetLength(0); i++)
            {
                for (int j = 0; j < this.board.GetLength(1); j++)
                {
                    if (board[i,j] == Symbol.Empty)
                    {
                        sb.Append('.');
                    }
                    else
                    {
                        sb.Append(board[i, j]);
                    }                   
                }
                sb.AppendLine();
            }
            return sb.ToString();
        }
    }
}
