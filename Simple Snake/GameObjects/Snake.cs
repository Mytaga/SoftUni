using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace SimpleSnake.GameObjects
{
    public class Snake
    {
        private Queue<Point> snakeElements;
        private const char SnakeSymbol = '\u25CF';
        private Food[] food;
        private Wall wall;
        private int nextLeftX;
        private int nextTopY;
        private int foodIndex;
        public Snake(Wall wall)
        {
            this.wall = wall;
            this.snakeElements = new Queue<Point>();
            this.food = new Food[3];
            this.foodIndex = RandomFoodIndex;            
            this.GetFood();
            this.CreateSnake();
        }

        private int RandomFoodIndex => new Random().Next(0, this.food.Length);
        private void CreateSnake()
        {
            for (int topY = 1; topY <= 6; topY++)
            {
                this.snakeElements.Enqueue(new Point(2, topY));
            }
        }   

        private void GetFood()
        {
            this.food[0] = new FoodHash(this.wall);
            this.food[1] = new FoodDollar(this.wall);
            this.food[2] = new FoodAsterisk(this.wall);
            this.foodIndex = this.RandomFoodIndex;
            this.food[foodIndex].SetRandomPosition(this.snakeElements);
        }

        private void GetNextPoint(Point direction, Point snakeHead)
        {
            this.nextLeftX = snakeHead.LeftX + direction.LeftX;
            this.nextTopY = snakeHead.TopY + direction.TopY;
        }
       

        public bool IsMoving(Point direction)
        {
            Point currentSnakeHead = this.snakeElements.Last();

            GetNextPoint(direction, currentSnakeHead);

            bool isPointOfSnake = this.snakeElements.Any(x => x.LeftX == nextLeftX && x.TopY == nextTopY);

            if (isPointOfSnake)
            {
                return false;
            }

            Point snakeNewHead = new Point(this.nextLeftX, this.nextTopY);

            if (this.wall.IsPointOfWall(snakeNewHead))
            {
                return false;
            }

            this.snakeElements.Enqueue(snakeNewHead);
            snakeNewHead.Draw(SnakeSymbol);

            if (food[foodIndex].IsFoodPoint(snakeNewHead))
            {
                this.Eat(direction, currentSnakeHead);
            }

            Point snakeTail = this.snakeElements.Dequeue();
            snakeTail.Draw(' ');

            return true;
        }

        private void Eat(Point direction, Point currentSnakeHead)
        {
            int length = food[foodIndex].FoodPoints;

            for (int i = 0; i < length; i++)
            {
                this.snakeElements.Enqueue(new Point(this.nextLeftX, this.nextTopY));
                GetNextPoint(direction, currentSnakeHead);
            }

            this.foodIndex = this.RandomFoodIndex;
            this.food[foodIndex].SetRandomPosition(this.snakeElements);
        }
    }
}
