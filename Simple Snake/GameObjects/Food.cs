using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace SimpleSnake.GameObjects
{
    public abstract class Food : Point
    {       
        private Random random;
        private Wall wall;
        private char foodSymbol;
        protected Food(Wall wall, char foodSymbol, int points) 
            : base(wall.LeftX, wall.TopY)
        {
            this.wall = wall;
            this.FoodPoints = points;
            this.foodSymbol = foodSymbol;
            this.random = new Random();
        }

        public int FoodPoints { get; private set; }

        public void SetRandomPosition(Queue<Point> snakeElements)
        {
            this.LeftX = random.Next(2, wall.LeftX - 2);
            this.TopY = random.Next(2, wall.TopY - 2);

            bool isPointOfSnake = snakeElements.Any(x => x.LeftX == this.LeftX && x.TopY == this.TopY);

            while (isPointOfSnake)
            {
                this.LeftX = random.Next(2, wall.LeftX - 2);
                this.TopY = random.Next(2, wall.TopY - 2);

                isPointOfSnake = snakeElements.Any(x => x.LeftX == this.LeftX && x.TopY == this.TopY);
            }
            
            if (foodSymbol == '*')
            {
                Console.BackgroundColor = ConsoleColor.Red;
            }
            else if (foodSymbol == '$')
            {
                Console.BackgroundColor = ConsoleColor.Green;
            }
            else
            {
                Console.BackgroundColor = ConsoleColor.Yellow;
            }

            this.Draw(foodSymbol);
            Console.BackgroundColor = ConsoleColor.White;
        }

        public bool IsFoodPoint(Point snake)
        {
            return snake.TopY == this.TopY && snake.LeftX == this.LeftX;
        }
    }
}
