CREATE DATABASE products;

\c products;

CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  slogan VARCHAR(255) NOT NULL,
  description VARCHAR (255) NOT NULL,
  category VARCHAR (50) NOT NULL,
  default_price VARCHAR(10) NOT NULL
);

CREATE TABLE styles (
  id SERIAL PRIMARY KEY,
  productId INT NOT NULL,
  name VARCHAR(255) NOT NULL,
  sale_price VARCHAR(10),
  original_price VARCHAR(10) NOT NULL,
  default_style BOOLEAN NOT NULL,
  CONSTRAINT fk_styles
    FOREIGN KEY(productId)
      REFERENCES products(id)
      ON DELETE CASCADE
);

CREATE TABLE features (
  id SERIAL PRIMARY KEY,
  product_id INT NOT NULL,
  feature VARCHAR(120) NOT NULL,
  value VARCHAR(120),
  CONSTRAINT fk_features
    FOREIGN KEY(product_id)
      REFERENCES products(id)
      ON DELETE CASCADE
);

CREATE TABLE skus (
  id SERIAL PRIMARY KEY,
  styleId INT NOT NULL,
  size VARCHAR(25) NOT NULL,
  quantity INT NOT NULL,
  CONSTRAINT fk_skus
    FOREIGN KEY(styleId)
      REFERENCES styles(id)
      ON DELETE CASCADE
);

CREATE TABLE photos (
  id SERIAL PRIMARY KEY,
  styleId INT NOT NULL,
  url VARCHAR(800) NOT NULL,
  thumbnail_url VARCHAR NOT NULL,
  CONSTRAINT fk_photos
    FOREIGN KEY(styleId)
      REFERENCES styles(id)
      ON DELETE CASCADE
);

CREATE TABLE related (
  id SERIAL PRIMARY KEY,
  current_product_id INT NOT NULL,
  related_product_id INT NOT NULL,
  CONSTRAINT fk_related
    FOREIGN KEY(current_product_id) REFERENCES products(id)
    ON DELETE CASCADE
);
