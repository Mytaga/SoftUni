CREATE DATABASE Zoo

USE Zoo

--01 Database design--

CREATE TABLE Owners(
Id INT PRIMARY KEY IDENTITY,
[Name] VARCHAR(50) NOT NULL,
PhoneNumber VARCHAR(15) NOT NULL,
[Address] VARCHAR(50)
)

CREATE TABLE AnimalTypes(
Id INT PRIMARY KEY IDENTITY,
AnimalType VARCHAR(30) NOT NULL
)

CREATE TABLE Cages(
Id INT PRIMARY KEY IDENTITY,
AnimalTypeId INT FOREIGN KEY REFERENCES AnimalTypes([Id]) NOT NULL
)

CREATE TABLE Animals(
Id INT PRIMARY KEY IDENTITY,
[Name] VARCHAR(30) NOT NULL,
BirthDate DATE NOT NULL,
OwnerId INT FOREIGN KEY REFERENCES Owners([Id]),
AnimalTypeId INT FOREIGN KEY REFERENCES AnimalTypes([Id]) NOT NULL
)

CREATE TABLE AnimalsCages(
CageId INT FOREIGN KEY REFERENCES Cages([Id]) NOT NULL, 
AnimalId INT FOREIGN KEY REFERENCES Animals([Id]) NOT NULL,
PRIMARY KEY (CageId, AnimalId)
)

CREATE TABLE VolunteersDepartments(
Id INT PRIMARY KEY IDENTITY,
DepartmentName VARCHAR(30) NOT NULL
)

CREATE TABLE Volunteers(
Id INT PRIMARY KEY IDENTITY,
[Name] VARCHAR(50) NOT NULL,
PhoneNumber VARCHAR(15) NOT NULL,
[Address] VARCHAR(50),
AnimalId INT FOREIGN KEY REFERENCES Animals([Id]),
DepartmentId INT FOREIGN KEY REFERENCES VolunteersDepartments([Id]) NOT NULL
)

--02 Insert--

INSERT INTO Volunteers([Name], [PhoneNumber], [Address], [AnimalId], [DepartmentId])
VALUES
('Anita Kostova', '0896365412', 'Sofia, 5 Rosa str.', 15, 1),
('Dimitur Stoev', '0877564223',	null, 42, 4),
('Kalina Evtimova',	'0896321112', 'Silistra, 21 Breza str.', 9,	7),
('Stoyan Tomov', '0898564100', 'Montana, 1 Bor str.', 18, 8),
('Boryana Mileva', '0888112233', null,	31,	5)

INSERT INTO Animals([Name], [BirthDate], [OwnerId], [AnimalTypeId])
VALUES
('Giraffe',	'2018-09-21', 21, 1),
('Harpy Eagle',	'2015-04-17', 15, 3),
('Hamadryas Baboon', '2017-11-02', null, 1),
('Tuatara', '2021-06-30', 2, 4)

--03 Update--

UPDATE Animals
SET OwnerId = 4
WHERE OwnerId IS NULL

--04 Delete--

DELETE FROM Volunteers
WHERE DepartmentId = 2

DELETE FROM VolunteersDepartments
WHERE DepartmentName = 'Education program assistant'

--05 Volunteers--

SELECT
[Name],
[PhoneNumber],
[Address],
[AnimalId],
[DepartmentId]
FROM Volunteers
ORDER BY 1, 4, 5

--06 Animals data--

SELECT
a.[Name],
at.[AnimalType],
FORMAT(a.[BirthDate], 'dd.MM.yyyy') AS BirthDate
FROM Animals AS a
LEFT JOIN AnimalTypes AS at ON a.AnimalTypeId = at.Id
ORDER BY 1

--07 Owners and Their Animals--

SELECT TOP(5)
o.[Name],
COUNT(a.[Id]) AS CountOfAnimals
FROM Owners AS o
JOIN Animals AS a ON o.Id = a.OwnerId
GROUP BY o.[Name]
ORDER BY 2 DESC, 1

--08 Owners, Animals and Cages--

SELECT 
CONCAT(o.[Name], '-', a.[Name]) AS OwnersAnimals,
o.[PhoneNumber],
c.[Id] AS CageId
FROM Owners AS o
JOIN Animals AS a ON o.Id = a.OwnerId
JOIN AnimalTypes AS at ON a.AnimalTypeId = at.Id
JOIN AnimalsCages AS ac ON a.Id = ac.AnimalId
JOIN Cages AS c ON ac.CageId = c.Id
WHERE at.AnimalType = 'Mammals'
ORDER BY o.[Name], a.[Name] DESC

--09 Volunteers in Sofia--

SELECT
v.[Name],
v.[PhoneNumber],
SUBSTRING(v.[Address], CHARINDEX(',', v.[Address]) + 1, (LEN(v.[Address]) - CHARINDEX(',', v.[Address]) + 1)) AS Address
FROM Volunteers AS v
LEFT JOIN VolunteersDepartments AS vd ON v.DepartmentId = vd.Id
WHERE vd.DepartmentName = 'Education program assistant' 
AND v.Address LIKE '%Sofia%'
ORDER BY 1

--TASK 10 Animals for Adoption-- 

SELECT 
a.[Name],
YEAR(a.[BirthDate]) AS BirthYear,
at.[AnimalType]
FROM Animals AS a
LEFT JOIN AnimalTypes AS at ON a.AnimalTypeId = at.Id
WHERE a.OwnerId IS NULL
AND DATEDIFF(Year, a.BirthDate, '01/01/2022') < 5
AND at.AnimalType NOT IN ('Birds')
ORDER BY 1

--TASK 11 All Volunteers in a Department--

CREATE FUNCTION udf_GetVolunteersCountFromADepartment (@VolunteersDepartment VARCHAR(30))
RETURNS INT
AS
BEGIN
DECLARE @VoluneersCount INT 
SET @VoluneersCount = 
(
SELECT 
COUNT(vd.[Id])
FROM VolunteersDepartments AS vd
LEFT JOIN Volunteers AS v ON vd.Id = v.DepartmentId
WHERE vd.[DepartmentName] = @VolunteersDepartment
)
RETURN @VoluneersCount
END

--TASK 12 Animals with Owner or Not--

CREATE OR ALTER PROC usp_AnimalsWithOwnersOrNot(@AnimalName VARCHAR(30))
AS
BEGIN
SELECT 
a.[Name],
CASE WHEN a.[OwnerId] IS NULL THEN 'For adoption'
ELSE o.[Name] 
END AS OwnersName
FROM Animals AS a
LEFT JOIN Owners AS o ON a.[OwnerId] = o.[Id]
WHERE a.[Name] = @AnimalName
END
