using System;
using System.Collections.Generic;
using System.Text;

namespace Tic_Tac_Toe
{
    public interface IPlayer
    {
        Index Play(Board board, Symbol symbol);
    }
}
