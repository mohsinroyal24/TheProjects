CREATE DEFINER=`root`@`localhost` PROCEDURE `insert_order_item`(
  IN p_food_item VARCHAR(255),
  IN p_quantity INT,
  IN p_order_id INT
)
BEGIN
    DECLARE v_item_id INT;
    DECLARE v_price DECIMAL(10, 2);
    DECLARE v_total_price DECIMAL(10, 2);

    -- Get the item_id and price for the food item
    SELECT item_id, price INTO v_item_id, v_price
    FROM food_items WHERE name = p_food_item;

    -- Debugging: Check the values
    SELECT p_food_item, v_item_id, v_price; -- Log the values to the console

    IF v_item_id IS NULL THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Invalid food item';
    END IF;

    -- Calculate the total price for the order item
    SET v_total_price = v_price * p_quantity;

    -- Debugging: Check the calculated values
    SELECT v_total_price; -- Log the value to the console

    -- Insert the order item into the orders table
    INSERT INTO orders (order_id, item_id, quantity, total_price)
    VALUES (p_order_id, v_item_id, p_quantity, v_total_price);
END
