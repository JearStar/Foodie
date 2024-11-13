ALTER SESSION SET CURRENT_SCHEMA = ORA_<CWL>;

BEGIN
    EXECUTE IMMEDIATE 'DROP TABLE ReviewsDish';
EXCEPTION
    WHEN OTHERS THEN
        NULL;  -- Do nothing if table doesn't exist
END;
/

BEGIN
    EXECUTE IMMEDIATE 'DROP TABLE LimitedTimeDish';
EXCEPTION
    WHEN OTHERS THEN
        NULL;
END;
/

BEGIN
    EXECUTE IMMEDIATE 'DROP TABLE Dish';
EXCEPTION
    WHEN OTHERS THEN
        NULL;
END;
/

BEGIN
    EXECUTE IMMEDIATE 'DROP TABLE Photo';
EXCEPTION
    WHEN OTHERS THEN
        NULL;
END;
/

BEGIN
    EXECUTE IMMEDIATE 'DROP TABLE Review';
EXCEPTION
    WHEN OTHERS THEN
        NULL;
END;
/

BEGIN
    EXECUTE IMMEDIATE 'ALTER TABLE FoodLocation DROP CONSTRAINT fk_foodlocation_reference_summary';
EXCEPTION
    WHEN OTHERS THEN
        NULL;
END;
/

BEGIN
    EXECUTE IMMEDIATE 'ALTER TABLE Vote DROP CONSTRAINT fk_vote_reference_appuser';
EXCEPTION
    WHEN OTHERS THEN
        NULL;
END;
/

BEGIN
    EXECUTE IMMEDIATE 'ALTER TABLE Vote DROP CONSTRAINT fk_vote_reference_usercomment';
EXCEPTION
    WHEN OTHERS THEN
        NULL;
END;
/

BEGIN
    EXECUTE IMMEDIATE 'ALTER TABLE UserComment DROP CONSTRAINT fk_usercomment_reference_appuser';
EXCEPTION
    WHEN OTHERS THEN
        NULL;
END;
/

BEGIN
    EXECUTE IMMEDIATE 'DROP TABLE Vote';
EXCEPTION
    WHEN OTHERS THEN
        NULL;
END;
/

BEGIN
    EXECUTE IMMEDIATE 'DROP TABLE FoodLocationSummary';
EXCEPTION
    WHEN OTHERS THEN
        NULL;
END;
/

BEGIN
    EXECUTE IMMEDIATE 'DROP TABLE FoodLocation';
EXCEPTION
    WHEN OTHERS THEN
        NULL;
END;
/

BEGIN
    EXECUTE IMMEDIATE 'DROP TABLE UserComment';
EXCEPTION
    WHEN OTHERS THEN
        NULL;
END;
/

BEGIN
    EXECUTE IMMEDIATE 'DROP TABLE AppUser';
EXCEPTION
    WHEN OTHERS THEN
        NULL;
END;
/

COMMIT;