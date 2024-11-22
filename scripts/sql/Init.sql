DROP TABLE ReviewsDish;
DROP TABLE LimitedTimeDish;
DROP TABLE Dish;
DROP TABLE Photo;
DROP TABLE Review;
ALTER TABLE FoodLocation DROP CONSTRAINT fk_foodlocation_reference_summary;
ALTER TABLE Vote DROP CONSTRAINT fk_vote_reference_appuser;
ALTER TABLE Vote DROP CONSTRAINT fk_vote_reference_usercomment;
ALTER TABLE UserComment DROP CONSTRAINT fk_usercomment_reference_appuser;
DROP TABLE Vote;
DROP TABLE FoodLocationSummary;
DROP TABLE FoodLocation;
DROP TABLE UserComment;
DROP TABLE AppUser;

CREATE TABLE AppUser (
    UserID VARCHAR(36) PRIMARY KEY,
    FirstName VARCHAR(50),
    LastName VARCHAR(50),
    Email VARCHAR(50) UNIQUE NOT NULL,
    Password VARCHAR(20) NOT NULL,
    NumReviews INTEGER NOT NULL
);

INSERT INTO AppUser(UserID, FirstName, LastName, Email, Password, NumReviews)
VALUES ('4d7577fc-636e-40b1-ab1f-f3c12422c84a', 'Sabrina', 'Woo', 'sabrinawoo3895@gmail.com', 'iloveicecream1', 0);

INSERT INTO AppUser(UserID, FirstName, LastName, Email, Password, NumReviews)
VALUES ('45483f02-a838-4ff1-839e-d9ab83f6f46c', 'Sabrina', 'Woo','wsabrina@telus.net', 'bob@!', 0);

INSERT INTO AppUser(UserID, FirstName, LastName, Email, Password, NumReviews)
VALUES ('5aba12e6-a3b0-4d19-a078-6f9f41a81eec', 'Jerry', 'Chiang','jerrychiang@gmail.com', 'jerryc', 0);

INSERT INTO AppUser(UserID, FirstName, LastName, Email, Password, NumReviews)
VALUES ('b6751637-b434-419e-ae0d-1a0c7c405053', 'Alex', 'Jacobson','alexjacob@gmail.com', 'alexjacob', 0);

INSERT INTO AppUser(UserID, FirstName, LastName, Email, Password, NumReviews)
VALUES ('88e5791d-0fd7-4721-b8f6-5aad4845f095', 'Bob', 'Smith','bobsmith@outlook.com', 'bob', 0);


CREATE TABLE UserComment (
    CommentID VARCHAR(36) PRIMARY KEY,
    CommentLikes INTEGER NOT NULL,
    Content VARCHAR(1000) NOT NULL,
    CommentTimestamp TIMESTAMP NOT NULL,
    ParentID VARCHAR(36)  NOT NULL,
    ParentType VARCHAR(10) NOT NULL,
    UserID VARCHAR(36)  NOT NULL,
    CHECK (ParentType IN ('Review', 'Comment')),
    CONSTRAINT fk_usercomment_reference_appuser FOREIGN KEY (UserID) REFERENCES AppUser ON DELETE CASCADE
);

CREATE TABLE FoodLocation (
    FoodLocationName VARCHAR(50),
    NumReviews INTEGER NOT NULL,
    Address VARCHAR(150),
    City VARCHAR(100) NOT NULL,
    PostalCode VARCHAR(10),
    Country VARCHAR(50),
    Genre VARCHAR(50) NOT NULL,
    FoodLocationSummaryID VARCHAR(36)  NOT NULL,
    PRIMARY KEY (FoodLocationName, Address, PostalCode, Country)
);

INSERT INTO FoodLocation(FoodLocationName, NumReviews, Address, City, PostalCode, Country, Genre, FoodLocationSummaryID)
VALUES ('Sushi Mura', 0, '6485 Oak Street', 'Vancouver', 'V6M 2W7', 'Canada', 'Japanese',
        '550e8400-e29b-41d4-a716-446655440000');

INSERT INTO FoodLocation(FoodLocationName, NumReviews, Address, City, PostalCode, Country, Genre, FoodLocationSummaryID)
VALUES ('Published on Main', 200, '3593 Main Street', 'Vancouver', 'V5V 3N4', 'Canada', 'Mediterranean',
        'b7e3c2f1-7654-4321-abcd-1234567890ab');

INSERT INTO FoodLocation(FoodLocationName, NumReviews, Address, City, PostalCode, Country, Genre, FoodLocationSummaryID)
VALUES ('McDonald’s', 85, '470 Yonge Street', 'Toronto', 'M4Y 1X5', 'Canada', 'American',
        'c5d6e7f8-9a0b-1234-b7e8-f2a3b4d5e6f9');

INSERT INTO FoodLocation(FoodLocationName, NumReviews, Address, City, PostalCode, Country, Genre, FoodLocationSummaryID)
VALUES ('Café de Flore', 180, '172 Bd Saint-Germain', 'Paris', '75006', 'France', 'French',
        'dbff5e43-67b4-44e2-b78d-5331a3c33fa5');

INSERT INTO FoodLocation(FoodLocationName, NumReviews, Address, City, PostalCode, Country, Genre, FoodLocationSummaryID)
VALUES ('Miku Vancouver', 30, '200 Granville Street #70', 'Vancouver', 'V6C 1S4', 'Canada', 'Japanese',
        '11d61d1b-809f-41c3-82e5-d0a2078cfc04');


CREATE TABLE Vote (
    VoteID VARCHAR(36) PRIMARY KEY,
    Value NUMBER(1) NOT NULL, -- boolean
    UserID VARCHAR(36)  NOT NULL,
    CommentID VARCHAR(36)  NOT NULL,
    CONSTRAINT check_boolean CHECK (Value IN (0, 1)),
    CONSTRAINT fk_vote_reference_appuser FOREIGN KEY (UserID) REFERENCES AppUser ON DELETE CASCADE,
    CONSTRAINT fk_vote_reference_usercomment FOREIGN KEY (CommentID) REFERENCES UserComment ON DELETE CASCADE
);


CREATE TABLE FoodLocationSummary (
    SummaryID VARCHAR(36) PRIMARY KEY,
    AverageRating FLOAT NOT NULL,
    Description VARCHAR(255) NOT NULL,
    FoodLocationName VARCHAR(50) NOT NULL,
    Address VARCHAR(150) NOT NULL,
    PostalCode VARCHAR(10) NOT NULL,
    Country VARCHAR(50) NOT NULL,
    FOREIGN KEY (FoodLocationName, Address, PostalCode, Country) REFERENCES FoodLocation ON DELETE CASCADE
);

INSERT INTO FoodLocationSummary(SummaryID, AverageRating, Description, FoodLocationName, Address, PostalCode, Country)
VALUES ('550e8400-e29b-41d4-a716-446655440000', 4.8, 'A popular spot for authentic Japanese sushi and friendly service.',
        'Sushi Mura', '6485 Oak Street', 'V6M 2W7', 'Canada');

INSERT INTO FoodLocationSummary(SummaryID, AverageRating, Description, FoodLocationName, Address, PostalCode, Country)
VALUES ('b7e3c2f1-7654-4321-abcd-1234567890ab', 4.5, 'Known for its Mediterranean-inspired dishes with a modern twist.',
        'Published on Main', '3593 Main Street', 'V5V 3N4', 'Canada');

INSERT INTO FoodLocationSummary(SummaryID, AverageRating, Description, FoodLocationName, Address, PostalCode, Country)
VALUES ('c5d6e7f8-9a0b-1234-b7e8-f2a3b4d5e6f9', 3.8, 'A fast-food staple offering classic American burgers and fries.',
        'McDonald’s', '470 Yonge Street', 'M4Y 1X5', 'Canada');

INSERT INTO FoodLocationSummary(SummaryID, AverageRating, Description, FoodLocationName, Address, PostalCode, Country)
VALUES ('dbff5e43-67b4-44e2-b78d-5331a3c33fa5', 4.2, 'A historic café in the heart of Paris, serving traditional French cuisine.',
        'Café de Flore', '172 Bd Saint-Germain', '75006', 'France');

INSERT INTO FoodLocationSummary(SummaryID, AverageRating, Description, FoodLocationName, Address, PostalCode, Country)
VALUES ('11d61d1b-809f-41c3-82e5-d0a2078cfc04', 4.7, 'A highly rated Japanese restaurant with exquisite flavors and vibrant atmosphere.',
        'Miku Vancouver', '200 Granville Street #70', 'V6C 1S4', 'Canada');

ALTER TABLE FoodLocation ADD CONSTRAINT fk_foodlocation_reference_summary FOREIGN KEY (FoodLocationSummaryID) REFERENCES FoodLocationSummary(SummaryID);

CREATE TABLE Review (
    ReviewID VARCHAR(36) PRIMARY KEY,
    OverallRating SMALLINT NOT NULL,
    ServiceRating SMALLINT NOT NULL,
    WaitTimeRating SMALLINT NOT NULL,
    DayOfWeekVisited SMALLINT NOT NULL,
    ReviewTimeStamp TIMESTAMP NOT NULL,
    FoodLocationName VARCHAR(50) NOT NULL,
    Address VARCHAR(150) NOT NULL,
    PostalCode VARCHAR(10) NOT NULL,
    Country VARCHAR(50) NOT NULL,
    UserID VARCHAR(36)  NOT NULL,
    FOREIGN KEY (UserID) REFERENCES AppUser ON DELETE CASCADE,
    FOREIGN KEY (FoodLocationName, Address, Country, PostalCode) REFERENCES FoodLocation ON DELETE CASCADE
);

CREATE TABLE Photo (
    PhotoID VARCHAR(36) PRIMARY KEY,
    Image BLOB NOT NULL,
    PhotoLikes INTEGER NOT NULL,
    Description VARCHAR(1000),
    PhotoTimestamp TIMESTAMP NOT NULL,
    ReviewID VARCHAR(36)  NOT NULL,
    SummaryID VARCHAR(36) ,
    FOREIGN KEY (SummaryID) REFERENCES FoodLocationSummary ON DELETE CASCADE,
    FOREIGN KEY (ReviewID) REFERENCES Review ON DELETE CASCADE
);

CREATE TABLE Dish (
    DishName VARCHAR(50),
    Price FLOAT NOT NULL,
    Type VARCHAR(20) NOT NULL,
    isHalal NUMBER(1) NOT NULL,
    isGlutenFree NUMBER(1) NOT NULL,
    isVegetarian NUMBER(1) NOT NULL,
    FoodLocationName VARCHAR(50),
    Address VARCHAR(150),
    PostalCode VARCHAR(10),
    Country VARCHAR(50),
    CONSTRAINT check_booleans CHECK (
        isHalal IN (0, 1) AND
        isGlutenFree IN (0, 1) AND
        isVegetarian IN (0, 1)
        ),
    FOREIGN KEY (FoodLocationName, Address, Country, PostalCode) REFERENCES FoodLocation ON DELETE CASCADE,
    PRIMARY KEY (DishName, FoodLocationName, Address, Country, PostalCode)
);

CREATE TABLE LimitedTimeDish (
    DishName VARCHAR(50),
    FoodLocationName VARCHAR(50),
    Address VARCHAR(150),
    PostalCode VARCHAR(10),
    Country VARCHAR(50),
    StartDate DATE NOT NULL,
    EndDate DATE NOT NULL,
    FOREIGN KEY (DishName, FoodLocationName, Address, PostalCode, Country) REFERENCES Dish,
    PRIMARY KEY (DishName, FoodLocationName, Address, PostalCode, Country)
);


CREATE TABLE ReviewsDish (
    ReviewID VARCHAR(36),
    DishName VARCHAR(50),
    DishRating SMALLINT NOT NULL,
    FoodLocationName VARCHAR(50),
    Address VARCHAR(150),
    PostalCode VARCHAR(10),
    Country VARCHAR(50),
    FOREIGN KEY (ReviewID) REFERENCES Review ON DELETE CASCADE,
    FOREIGN KEY (DishName, FoodLocationName, Address, PostalCode, Country) REFERENCES Dish ON DELETE CASCADE,
    PRIMARY KEY (ReviewID, DishName, FoodLocationName, Address, PostalCode, Country)
);

COMMIT;