ALTER TABLE Vote DROP CONSTRAINT fk_vote_reference_appuser;
ALTER TABLE Vote DROP CONSTRAINT fk_vote_reference_usercomment;
ALTER TABLE FoodLocation DROP CONSTRAINT fk_foodlocation_reference_summary;
ALTER TABLE UserComment DROP CONSTRAINT fk_usercomment_reference_appuser;
DROP TABLE ReviewsDish;
DROP TABLE LimitedTimeDish;
DROP TABLE Dish;
DROP TABLE Vote;
DROP TABLE Photo;
DROP TABLE Review;
DROP TABLE FoodLocationSummary;
DROP TABLE FoodLocation;
DROP TABLE UserComment;
DROP TABLE AppUser;
