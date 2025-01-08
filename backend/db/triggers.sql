CREATE TRIGGER prevent_duplicate_vaccine
BEFORE INSERT ON vaccine_record
FOR EACH ROW
BEGIN
    IF EXISTS (
        SELECT 1 FROM vaccine_record
        WHERE child_id = NEW.child_id AND v_id = NEW.v_id
    ) THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Duplicate vaccine record for the child is not allowed';
    END IF;
END;
