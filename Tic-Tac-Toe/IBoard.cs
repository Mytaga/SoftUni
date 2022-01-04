using System;
using System.Collections.Generic;
using System.Text;

namespace Tic_Tac_Toe
{
    public interface IBoard
    {
        bool IsFull();
        void PlaceSymbol(Index index, Symbol symbol);
        IEnumerable<Index> GetEmptyPositions();

        Symbol GetRowSymbol(int row);
        Symbol GetColumnSymbol(int col);
        Symbol GetDiagonalTRBLSymbol();
        Symbol GetDiagonalTLBRSymbol();

    }
}
