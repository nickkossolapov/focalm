CREATE VIEW user_ingredients AS
    SELECT m.user_id, i.ingredient, i.metric
        FROM meals m INNER JOIN ingredients i ON m.id = i.meal_id