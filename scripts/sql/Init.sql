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
    Email VARCHAR(50) NOT NULL,
    Password VARCHAR(20) NOT NULL,
    NumReviews INTEGER NOT NULL
);

INSERT INTO AppUser(UserID, FirstName, LastName, Email, Password, NumReviews)
VALUES (DEFAULT, 'Sabrina', 'Woo', 'sabrinawoo3895@gmail.com', 'iloveicecream1', 0);

INSERT INTO AppUser(UserID, FirstName, LastName, Email, Password, NumReviews)
VALUES (DEFAULT, 'Sabrina', 'Woo','wsabrina@telus.net', 'bob@!', 0);

INSERT INTO AppUser(UserID, FirstName, LastName, Email, Password, NumReviews)
VALUES (DEFAULT, 'Jerry', 'Chiang','jerrychiang@gmail.com', 'jerryc', 0);

INSERT INTO AppUser(UserID, FirstName, LastName, Email, Password, NumReviews)
VALUES (DEFAULT, 'Alex', 'Jacobson','alexjacob@gmail.com', 'alexjacob', 0);

INSERT INTO AppUser(UserID, FirstName, LastName, Email, Password, NumReviews)
VALUES (DEFAULT, 'Bob', 'Smith','bobsmith@outlook.com', 'bob', 0);


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
    PRIMARY KEY (FoodLocationName, Address, Country, PostalCode)
);

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