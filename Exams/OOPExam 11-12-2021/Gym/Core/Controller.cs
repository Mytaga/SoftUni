using Gym.Core.Contracts;
using Gym.Models.Athletes;
using Gym.Models.Athletes.Contracts;
using Gym.Models.Equipment;
using Gym.Models.Equipment.Contracts;
using Gym.Models.Gyms;
using Gym.Models.Gyms.Contracts;
using Gym.Repositories;
using Gym.Utilities.Messages;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Gym.Core
{
    public class Controller : IController
    {
        private readonly EquipmentRepository equipment;
        private readonly List<IGym> gyms;

        public Controller()
        {
            this.equipment = new EquipmentRepository();
            this.gyms = new List<IGym>();
        }

        public string AddAthlete(string gymName, string athleteType, string athleteName, string motivation, int numberOfMedals)
        {
            IAthlete athlete = null;

            if (athleteType == "Boxer")
            {
                athlete = new Boxer(athleteName, motivation, numberOfMedals);
            }
            else if (athleteType == "Weightlifter")
            {
                athlete = new Weightlifter(athleteName, motivation, numberOfMedals);
            }
            else
            {
                throw new InvalidOperationException(ExceptionMessages.InvalidAthleteType);
            }

            var gym = this.gyms.FirstOrDefault(g => g.Name == gymName);

            if (gym.GetType().Name == "BoxingGym" && athleteType == "Weightlifter")
            {
                return OutputMessages.InappropriateGym;
            }
            else if (gym.GetType().Name == "WeightliftingGym" && athleteType == "Boxer")
            {
                return OutputMessages.InappropriateGym;
            }
            else
            {
                gym.AddAthlete(athlete);
                return string.Format(OutputMessages.EntityAddedToGym, athleteType, gymName);
            }
        }

        public string AddEquipment(string equipmentType)
        {
            IEquipment equipment = null;

            if (equipmentType == "BoxingGloves")
            {
                equipment = new BoxingGloves();
            }
            else if (equipmentType == "Kettlebell")
            {
                equipment = new Kettlebell();
            }
            else
            {
                throw new InvalidOperationException(ExceptionMessages.InvalidEquipmentType);
            }

            this.equipment.Add(equipment);
            return string.Format(OutputMessages.SuccessfullyAdded, equipmentType);
        }

        public string AddGym(string gymType, string gymName)
        {
            IGym gym = null;

            if (gymType == "BoxingGym")
            {
                gym = new BoxingGym(gymName);
            }
            else if (gymType == "WeightliftingGym")
            {
                gym = new WeightliftingGym(gymName);
            }
            else
            {
                throw new InvalidOperationException(ExceptionMessages.InvalidGymType);
            }

            this.gyms.Add(gym);
            return string.Format(OutputMessages.SuccessfullyAdded, gymType);
        }

        public string EquipmentWeight(string gymName)
        {
            var gym = this.gyms.FirstOrDefault(g => g.Name == gymName);
            double totalWeight = gym.EquipmentWeight;

            return $"The total weight of the equipment in the gym {gymName} is {totalWeight:f2} grams.";
        }

        public string InsertEquipment(string gymName, string equipmentType)
        {
            var equipment = this.equipment.FindByType(equipmentType);

            if (equipment == null)
            {
                throw new InvalidOperationException(string.Format(ExceptionMessages.InexistentEquipment, equipmentType));
            }

            var gym = this.gyms.FirstOrDefault(g => g.Name == gymName);

            gym.AddEquipment(equipment);
            this.equipment.Remove(equipment);

            return string.Format(OutputMessages.EntityAddedToGym, equipmentType, gymName);
        }

        public string Report()
        {
            StringBuilder sb = new StringBuilder();

            foreach (var gym in gyms)
            {
                sb.AppendLine(gym.GymInfo());
            }

            return sb.ToString().TrimEnd();
        }

        public string TrainAthletes(string gymName)
        {
            var gym = this.gyms.FirstOrDefault(g => g.Name == gymName);

            foreach (var athlete in gym.Athletes)
            {
                athlete.Exercise();
            }

            return string.Format(OutputMessages.AthleteExercise, gym.Athletes.Count);
        }
    }
}