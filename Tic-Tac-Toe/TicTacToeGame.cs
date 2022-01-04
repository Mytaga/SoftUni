using System;

namespace Tic_Tac_Toe
{
    public class TicTacToeGame
    {
        public TicTacToeGame(IPlayer firstPlayer, IPlayer secondPlayer)
        {
            FirstPlayer = firstPlayer;
            SecondPlayer = secondPlayer;
        }

        public IPlayer FirstPlayer { get; set; }
        public IPlayer SecondPlayer { get; set; }

        public GameResult Play()
        {
            Board board = new Board();
            IPlayer currentPlayer = this.FirstPlayer;
            Symbol symbol = Symbol.X;

            while (!IsGameOver(board))
            {
                var move = currentPlayer.Play(board, symbol);
                board.PlaceSymbol(move, symbol);

                if (currentPlayer == this.FirstPlayer)
                {
                    currentPlayer = this.SecondPlayer;
                    symbol = Symbol.O;
                }
                else
                {
                    currentPlayer = this.FirstPlayer;
                    symbol = Symbol.X;
                }
            }

            var winner = GetWinner(board);
            return new GameResult(winner, board);
        }

        private Symbol GetWinner(Board board)
        {
            for (int i = 0; i < board.Row; i++)
            {
                var winner = board.GetRowSymbol(i);
                if (winner != Symbol.Empty)
                {
                    return winner;
                }
            }

            for (int i = 0; i < board.Col; i++)
            {
                var winner = board.GetColumnSymbol(i);
                if (winner != Symbol.Empty)
                {
                    return winner;
                }
            }

            var diagonal1 = board.GetDiagonalTLBRSymbol();

            if (diagonal1 != Symbol.Empty)
            {
                return diagonal1;
            }

            var diagonal2 = board.GetDiagonalTRBLSymbol();

            if (diagonal2 != Symbol.Empty)
            {
                return diagonal2;
            }

            return Symbol.Empty;
        }

        private bool IsGameOver(Board board)
        {
            for (int i = 0; i < board.Row; i++)
            {
                if (board.GetRowSymbol(i) != Symbol.Empty)
                {
                    return true;
                }               
            }

            for (int i = 0; i < board.Col; i++)
            {
                if (board.GetColumnSymbol(i) != Symbol.Empty)
                {
                    return true;
                }
            }

            if (board.GetDiagonalTLBRSymbol() != Symbol.Empty)
            {
                return true;
            }

            if (board.GetDiagonalTRBLSymbol() != Symbol.Empty)
            {
                return true;
            }

            return board.IsFull();    
        }        
    }
}
