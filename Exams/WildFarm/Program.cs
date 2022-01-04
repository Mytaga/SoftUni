using System;
using System.Collections.Generic;
using System.Linq;

namespace WildFarm
{
    public class Program
    {
        static void Main(string[] args)
        {
            List<Animal> animals = new List<Animal>();
            Animal animal;

            while (true)
            {
                string[] animalInfo = Console.ReadLine().Split();
                
                if (animalInfo[0] == "End")
                {
                    break;
                }
                string animalType = animalInfo[0];
                string name = animalInfo[1];
                double weight = double.Parse(animalInfo[2]);

                if (animalType == "Cat")
                {
                    string livingRegion = animalInfo[3];
                    string breed = animalInfo[4];
                    animal = new Cat(name, weight, livingRegion, breed);
                    animals.Add(animal);
                }
                else if (animalType == "Tiger")
                {
                    string livingRegion = animalInfo[3];
                    string breed = animalInfo[4];
                    animal = new Tiger(name, weight, livingRegion, breed);                   
                    animals.Add(animal);
                }
                else if (animalType == "Owl")
                {
                    double wingSize = double.Parse(animalInfo[3]);                    
                    animal = new Owl(name, weight, wingSize);                  
                    animals.Add(animal);
                }
                else if (animalType == "Hen")
                {
                    double wingSize = double.Parse(animalInfo[3]);
                    animal = new Hen(name, weight, wingSize);                  
                    animals.Add(animal);
                }
                else if (animalType == "Dog")
                {
                    string livingRegion = animalInfo[3];                 
                    animal = new Dog(name, weight, livingRegion);                   
                    animals.Add(animal);
                }
                else if (animalType == "Mouse")
                {
                    string livingRegion = animalInfo[3];
                    animal = new Mouse(name, weight, livingRegion);                   
                    animals.Add(animal);
                }

                string[] foodInfo = Console.ReadLine().Split();

                var current = animals.FirstOrDefault(x => x.Name == name);
                Console.WriteLine(current.AskForFood()); 
                string foodType = foodInfo[0];
                int quantity = int.Parse(foodInfo[1]);
                Food food;

                try
                {
                    if (foodType == "Meat")
                    {
                        food = new Meat(quantity);
                        current.FeedAnimal(food);
                    }
                    else if (foodType == "Vegetable")
                    {
                        food = new Vegetable(quantity);
                        current.FeedAnimal(food);
                    }
                    else if (foodType == "Fruit")
                    {
                        food = new Fruit(quantity);
                        current.FeedAnimal(food);
                    }
                    else if (foodType == "Seeds")
                    {
                        food = new Seeds(quantity);
                        current.FeedAnimal(food);
                    }
                }
                catch (Exception ex)
                {
                    Console.WriteLine(ex.Message);
                }
            }

            foreach (var item in animals)
            {
                Console.WriteLine(item);
            }
        }
    }
}
