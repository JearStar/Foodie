drop table User;
drop table Vote;
drop table Comment;
drop table Photo;
drop table FoodLocation;
drop table FoodLocationSummary;
drop table LimitedTimeDish;
drop table Review;
drop table ReviewsDish;
drop table Dish;

CREATE TABLE User (
    UserID RAW(16) DEFAULT SYS_GUID() PRIMARY KEY,
    Email VARCHAR(50) NOT NULL,
    Password VARCHAR(20) NOT NULL,
    NumReviews INTEGER NOT NULL
);

CREATE TABLE Vote (
    VoteID RAW(16) DEFAULT SYS_GUID() PRIMARY KEY,
    Value BOOLEAN NOT NULL,
    UserID RAW(16) DEFAULT SYS_GUID() NOT NULL,
    CommentID RAW(16) DEFAULT SYS_GUID() NOT NULL,
    FOREIGN KEY (UserID) REFERENCES User ON DELETE CASCADE,
    FOREIGN KEY (CommentID) REFERENCES Comment ON DELETE CASCADE
);

CREATE TABLE Comment (
    CommentID RAW(16) DEFAULT SYS_GUID() PRIMARY KEY,
    CommentLikes INTEGER NOT NULL,
    Content VARCHAR(1000) NOT NULL,
    CommentTimestamp TIMESTAMP NOT NULL,
    ParentID RAW(16) DEFAULT SYS_GUID() NOT NULL,
    ParentType VARCHAR(10) NOT NULL,
    UserID RAW(16) DEFAULT SYS_GUID() NOT NULL,
    CHECK (ParentType IN ('Review', 'Comment')),
    FOREIGN KEY (UserID) REFERENCES User ON DELETE CASCADE
);

CREATE TABLE Photo (
    PhotoID RAW(16) DEFAULT SYS_GUID() PRIMARY KEY,
    Image BLOB NOT NULL,
    PhotoLikes INTEGER NOT NULL,
    Description VARCHAR(1000),
    PhotoTimestamp TIMESTAMP NOT NULL,
    ReviewID RAW(16) DEFAULT SYS_GUID() NOT NULL,
    SummaryID RAW(16) DEFAULT SYS_GUID(),
    FOREIGN KEY (SummaryID) REFERENCES FoodLocationSummary ON DELETE CASCADE,
    FOREIGN KEY (ReviewID) REFERENCES Review ON DELETE CASCADE
);

CREATE TABLE FoodLocation (
    FoodLocationName VARCHAR(50),
    NumReviews INTEGER NOT NULL,
    Address VARCHAR(150),
    City VARCHAR(100) NOT NULL,
    PostalCode VARCHAR(10),
    Country VARCHAR(50),
    Genre VARCHAR(50) NOT NULL,
    FoodLocationSummaryID RAW(16) DEFAULT SYS_GUID() NOT NULL,
    FOREIGN KEY (FoodLocationSummaryID) REFERENCES FoodLocationSummary(SummaryID),
    PRIMARY KEY (FoodLocationName, Address, Country, PostalCode)
);

CREATE TABLE FoodLocationSummary (
    SummaryID RAW(16) DEFAULT SYS_GUID() PRIMARY KEY,
    AverageRating FLOAT NOT NULL,
    Description VARCHAR(255) NOT NULL,
    FoodLocationName VARCHAR(50) NOT NULL,
    Address VARCHAR(150) NOT NULL,
    PostalCode VARCHAR(10) NOT NULL,
    Country VARCHAR(50) NOT NULL,
    FOREIGN KEY (FoodLocationName, Address, PostalCode, Country) REFERENCES FoodLocation ON DELETE CASCADE
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

CREATE TABLE Review (
    ReviewID RAW(16) DEFAULT SYS_GUID() PRIMARY KEY,
    OverallRating SMALLINT NOT NULL,
    ServiceRating SMALLINT NOT NULL,
    WaitTimeRating SMALLINT NOT NULL,
    DayOfWeekVisited SMALLINT NOT NULL,
    ReviewTimeStamp TIMESTAMP NOT NULL,
    FoodLocationName VARCHAR(50) NOT NULL,
    Address VARCHAR(150) NOT NULL,
    PostalCode VARCHAR(10) NOT NULL,
    Country VARCHAR(50) NOT NULL,
    UserID RAW(16) DEFAULT SYS_GUID() NOT NULL,
    FOREIGN KEY (UserID) REFERENCES User ON DELETE CASCADE,
    FOREIGN KEY (FoodLocationName, Address, Country, PostalCode) REFERENCES FoodLocation ON DELETE CASCADE
);

CREATE TABLE ReviewsDish (
    ReviewID RAW(16) DEFAULT SYS_GUID(),
    DishName VARCHAR(50),
    DishRating SMALLINT NOT NULL,
    FoodLocationName VARCHAR(50),
    Address VARCHAR(150),
    PostalCode VARCHAR(10),
    Country VARCHAR(50),
    FOREIGN KEY (ReviewID) REFERENCES Review ON DELETE CASCADE,
    FOREIGN KEY (DishName, FoodLocationName, Address, PostalCode, Country) REFERENCES FoodLocation ON DELETE CASCADE,
    PRIMARY KEY (ReviewID, DishName, FoodLocationName, Address, PostalCode, Country)
);

CREATE TABLE Dish (
    DishName VARCHAR(50),
    Price FLOAT NOT NULL,
    Type VARCHAR(20) NOT NULL,
    isHalal BOOLEAN NOT NULL,
    isGlutenFree BOOLEAN NOT NULL,
    isVegetarian BOOLEAN NOT NULL,
    FoodLocationName VARCHAR(50),
    Address VARCHAR(150),
    PostalCode VARCHAR(10),
    Country VARCHAR(50),
    FOREIGN KEY (FoodLocationName, Address, Country, PostalCode) REFERENCES FoodLocation ON DELETE CASCADE,
    PRIMARY KEY (DishName, FoodLocationName, Address, Country, PostalCode)
);

COMMIT;