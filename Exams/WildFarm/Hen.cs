using System;
using System.Collections.Generic;
using System.Text;

namespace WildFarm
{
    public class Hen : Bird
    {
        private const double WeightIncrease = 0.35;
        public Hen(string name, double weight, double wingSize)
            : base(name, weight, wingSize)
        {
        }

        public override string AskForFood()
        {
            return "Cluck";
        }

        public override void FeedAnimal(Food food)
        {
            this.FoodEaten += food.Quantity;
            this.Weight += food.Quantity * WeightIncrease;
        }
    }
}
