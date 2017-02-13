CREATE OR REPLACE FUNCTION get_product (integer) RETURNS text AS '
DECLARE
  product_id ALIAS FOR $1;
  found_product products%ROWTYPE;
BEGIN
  SELECT INTO found_product * FROM products WHERE id = product_id;
  RETURN found_product.id || '' '' || found_product.title;
END;
' LANGUAGE 'plpgsql';