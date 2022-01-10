using NUnit.Framework;
using System;

namespace Gyms.Tests
{
    public class GymsTests
    {
        private Gym gym;
        private Athlete athlete;

        [SetUp]
        public void SetUp()
        {
            gym = new Gym("Cska", 10);
            athlete = new Athlete("Dimitar Kralev");
        }

        [Test]
        public void CheckIfConstructorInitializesProperly()
        {
            Assert.AreEqual("Cska", gym.Name);
            Assert.AreEqual(10, gym.Capacity);
            Assert.AreEqual(0, gym.Count);
        }

        [Test]
        [TestCase(null)]
        [TestCase("")]
        public void CheckThrowingExceptionForNullOrEmptyName(string name)
        {
            Assert.Throws<ArgumentNullException>(() => gym = new Gym(name, 10));
        }

        [Test]
        public void CheckThrowingExceptionForNegativeCapacity()
        {
            Assert.Throws<ArgumentException>(() => gym = new Gym("Cska", -10));
        }

        [Test]
        public void CheckAddMethodThrowingExceptionForExceedeCapacity()
        {
            gym = new Gym("Cska", 1);
            gym.AddAthlete(athlete);
            var athlete2 = new Athlete("Joro Jorov");
            Assert.Throws<InvalidOperationException>(() => gym.AddAthlete(athlete2));
        }

        [Test]
        public void CheckAddMethodWorkingProperly()
        {           
            gym.AddAthlete(athlete);
            Assert.AreEqual(1, gym.Count);
        }

        [Test]
        public void CheckRemoveMethodThrowingExceptionForNullAthlete()
        {
            Assert.Throws<InvalidOperationException>(() => gym.RemoveAthlete(null));
        }

        [Test]
        public void CheckRemoveMethodWorkingProperly()
        {
            gym.AddAthlete(athlete);
            gym.RemoveAthlete(athlete.FullName);
            Assert.AreEqual(0, gym.Count);
        }

        [Test]
        public void CheckInjureAthleteMethodThrowingExceptionForNullAthlete()
        {
            Assert.Throws<InvalidOperationException>(() => gym.InjureAthlete(null));
        }

        [Test]
        public void CheckInjureAthleteMethodWorkingProperly()
        {
            gym.AddAthlete(athlete);
            var injured = gym.InjureAthlete(athlete.FullName);
            Assert.IsTrue(athlete.IsInjured);
            Assert.AreEqual(injured, athlete);
        }

        [Test]
        public void CheckReportMethodWorkingProperly()
        {
            gym.AddAthlete(athlete);
            var athlete2 = new Athlete("Joro Jorov");
            gym.AddAthlete(athlete2);
          
            string report = gym.Report();

            Assert.AreEqual(report, $"Active athletes at Cska: Dimitar Kralev, Joro Jorov");
        }
    }
}
    