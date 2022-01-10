using Gym.Models.Athletes.Contracts;
using Gym.Models.Equipment.Contracts;
using Gym.Models.Gyms.Contracts;
using Gym.Utilities.Messages;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Gym.Models.Gyms
{
    public abstract class Gym : IGym
    {
        private string name;
        private readonly List<IAthlete> athletes;
        private readonly List<IEquipment> equipment;

        protected Gym(string name, int capacity)
        {
            Name = name;
            Capacity = capacity;
            this.equipment = new List<IEquipment>();
            this.athletes = new List<IAthlete>();
        }

        public string Name
        {
            get => this.name;
            private set
            {
                if (string.IsNullOrEmpty(value))
                {
                    throw new ArgumentException(ExceptionMessages.InvalidGymName);
                }

                this.name = value;
            }
        }

        public int Capacity { get; }

        public double EquipmentWeight => this.Equipment.Sum(e => e.Weight);

        public ICollection<IEquipment> Equipment => this.equipment;

        public ICollection<IAthlete> Athletes => this.athletes;

        public void AddAthlete(IAthlete athlete)
        {
            if (this.Athletes.Count >= this.Capacity)
            {
                throw new InvalidOperationException(ExceptionMessages.NotEnoughSize);
            }

            this.athletes.Add(athlete);
        }

        public void AddEquipment(IEquipment equipment)
        {
            this.equipment.Add(equipment);
        }

        public void Exercise()
        {
            foreach (var athlete in this.Athletes)
            {
                athlete.Exercise();
            }
        }

        public string GymInfo()
        {
            StringBuilder sb = new StringBuilder();
            sb.AppendLine($"{this.Name} is a {this.GetType().Name}:");
            if (Athletes.Count == 0)
            {
                sb.AppendLine("Athletes: No athletes");
            }
            else
            {
                sb.AppendLine($"Athletes: {string.Join(", ", this.Athletes)}");
            }

            sb.AppendLine($"Equipment total count: {this.Equipment.Count}");
            sb.AppendLine($"Equipment total weight: {this.EquipmentWeight:f2} grams");

            return sb.ToString().TrimEnd();
        }   

        public bool RemoveAthlete(IAthlete athlete)
        {
            return this.athletes.Remove(athlete);
        }
    }
}
