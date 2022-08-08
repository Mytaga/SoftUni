namespace Footballers.DataProcessor
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.Globalization;
    using System.IO;
    using System.Linq;
    using System.Text;
    using System.Xml.Serialization;
    using Data;
    using Footballers.Data.Models;
    using Footballers.Data.Models.Enums;
    using Footballers.DataProcessor.ImportDto;
    using Newtonsoft.Json;

    public class Deserializer
    {
        private const string ErrorMessage = "Invalid data!";

        private const string SuccessfullyImportedCoach
            = "Successfully imported coach - {0} with {1} footballers.";

        private const string SuccessfullyImportedTeam
            = "Successfully imported team - {0} with {1} footballers.";

        public static string ImportCoaches(FootballersContext context, string xmlString)
        {
            var xmlConverter = new XmlSerializer(typeof(List<ImportCoachesDto>), new XmlRootAttribute("Coaches"));
            var coaches = (List<ImportCoachesDto>)xmlConverter.Deserialize(new StringReader(xmlString));
            var sb = new StringBuilder();

            var validCoaches = new List<Coach>();

            foreach (var item in coaches)
            {
                if (!IsValid(item))
                {
                    sb.AppendLine(ErrorMessage);
                    continue;
                }

                Coach coach = new Coach()
                {
                    Name = item.Name,
                    Nationality = item.Nationality
                };

                foreach (var footB in item.Footballers)
                {
                    if (!IsValid(footB))
                    {
                        sb.AppendLine(ErrorMessage);
                        continue;
                    }

                    DateTime contractStartDate = DateTime.ParseExact(footB.ContractStartDate, "dd/MM/yyyy", CultureInfo.InvariantCulture);
                    DateTime contractEndDate = DateTime.ParseExact(footB.ContractEndDate, "dd/MM/yyyy", CultureInfo.InvariantCulture);

                    if (contractStartDate > contractEndDate)
                    {
                        sb.AppendLine(ErrorMessage);
                        continue;
                    }

                    Footballer footballer = new Footballer()
                    {
                        Name = footB.Name,
                        ContractStartDate = contractStartDate,
                        ContractEndDate = contractEndDate,
                        BestSkillType = Enum.Parse<BestSkillType>(footB.BestSkillType),
                        PositionType = Enum.Parse<PositionType>(footB.PositionType)
                    };

                    coach.Footballers.Add(footballer);
                    context.Footballers.Add(footballer);
                }

                validCoaches.Add(coach);
                sb.AppendLine(string.Format(SuccessfullyImportedCoach, coach.Name, coach.Footballers.Count));
            }

            context.AddRange(validCoaches);
            context.SaveChanges();

            return sb.ToString().TrimEnd();
        }
        public static string ImportTeams(FootballersContext context, string jsonString)
        {
            var sb = new StringBuilder();

            var teams = JsonConvert.DeserializeObject<List<ImportTeamsDto>>(jsonString);

            var validTeams = new List<Team>();
            var validTeamsFootballers = new List<TeamFootballer>();

            foreach (var item in teams)
            {
                if (!IsValid(item))
                {
                    sb.AppendLine(ErrorMessage);
                    continue;
                }

                if (item.Trophies <= 0)
                {
                    sb.AppendLine(ErrorMessage);
                    continue;
                }

                Team team = new Team()
                {
                    Name = item.Name,
                    Nationality = item.Nationality,
                    Trophies = item.Trophies
                };

                foreach (var fbItem in item.Footballers.Distinct())
                {
                    Footballer footballer = context.Footballers.FirstOrDefault(f => f.Id == fbItem);

                    //if (validTeamsFootballers.Any(tf => tf.FootballerId == fbItem))
                    //{
                    //    continue;
                    //}

                    if (footballer == null)
                    {
                        sb.AppendLine(ErrorMessage);
                        continue;
                    }

                    TeamFootballer teamFootballer = new TeamFootballer()
                    {
                        Team = team,
                        Footballer = footballer
                    };

                    validTeamsFootballers.Add(teamFootballer);
                    context.TeamsFootballers.Add(teamFootballer);
                }

                validTeams.Add(team);
                sb.AppendLine(string.Format(SuccessfullyImportedTeam, team.Name, team.TeamsFootballers.Count));
            }

            context.Teams.AddRange(validTeams);

            context.SaveChanges();

            return sb.ToString().TrimEnd();
        }

        private static bool IsValid(object dto)
        {
            var validationContext = new ValidationContext(dto);
            var validationResult = new List<ValidationResult>();

            return Validator.TryValidateObject(dto, validationContext, validationResult, true);
        }
    }
}
