-- Trigger to update vaccination status based on vaccination date
DELIMITER //

CREATE TRIGGER before_vaccine_records_update
BEFORE UPDATE ON vaccine_records
FOR EACH ROW
BEGIN
    DECLARE current_date DATE;
    SET current_date = CURDATE();

    IF NEW.vaccination_date > current_date THEN
        SET NEW.status = 'Upcoming';
    ELSEIF NEW.vaccination_date = current_date THEN
        SET NEW.status = 'Due';
    ELSE
        SET NEW.status = 'Overdue';
    END IF;
END //

DELIMITER ;
