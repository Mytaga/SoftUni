using System;
using System.Collections.Generic;
using System.Text;

namespace WildFarm
{
    public abstract class Animal
    {
        protected Animal(string name, double weight)
        {
            this.Name = name;
            this.Weight = weight;
        }

        public string Name { get; private set; }
        protected double Weight { get; set; }
        public int FoodEaten { get; set; }
        public abstract string AskForFood();
        public abstract void FeedAnimal(Food food);
        
    }
}
