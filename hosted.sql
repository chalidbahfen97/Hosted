-- 1
CREATE TABLE users (
	user_id SERIAL NOT NULL,
    user_name VARCHAR(20) NOT NULL,
    user_email VARCHAR(55) NOT NULL,
    user_password VARCHAR(100) NOT NULL,
    user_handphone VARCHAR(15) NOT NULL,
    user_role VARCHAR(15),
    CONSTRAINT user_id_pk PRIMARY KEY(user_id),
    CONSTRAINT user_email_uc UNIQUE(user_email)
);

-- 2
CREATE TABLE address (
	addr_id SERIAL,
	addr_name VARCHAR(255),
    addr_detail VARCHAR(55),
    addr_latitude VARCHAR(200),
    addr_longitude VARCHAR(200),
    addr_user_id INT,
    CONSTRAINT addr_id_pk PRIMARY KEY(addr_id),
    CONSTRAINT addr_user_id_fk FOREIGN KEY (addr_user_id) REFERENCES users (user_id) ON UPDATE CASCADE ON DELETE CASCADE
);

-- 3
CREATE SEQUENCE seq_hosted_acc
INCREMENT 1
START 1
MINVALUE 1
MAXVALUE 999999999;

CREATE OR REPLACE FUNCTION hosted_acc() 
RETURNS VARCHAR AS $$
SELECT CONCAT('AGID','-',lpad(''||nextval('seq_hosted_acc'),5,'0'))
$$ LANGUAGE SQL;

CREATE TABLE hosted (
	hosted_acc VARCHAR(10) DEFAULT hosted_acc(),
	hosted_fullname VARCHAR(55),
    hosted_level VARCHAR(15),
    hosted_user_id INT,
    CONSTRAINT hosted_acc_pk PRIMARY KEY(hosted_acc),
    CONSTRAINT hosted_user_id_fk FOREIGN KEY (hosted_user_id) REFERENCES users (user_id) ON UPDATE CASCADE ON DELETE CASCADE
);

-- 4
CREATE TABLE houses (
	house_id SERIAL,
    house_name VARCHAR(150),
    house_title VARCHAR(150),
    house_rating INT,
    house_bedrooms INT,
    house_occupied INT,
    house_beds INT,
    house_baths INT,
    house_address VARCHAR(255),
    house_province VARCHAR(55),
    house_city VARCHAR(55),
    house_country VARCHAR(55),
    house_latitude VARCHAR(255),
    house_longitude VARCHAR(255),
    house_offer VARCHAR(255),
    house_approval BOOLEAN,
    house_hosted_account VARCHAR(10),
    CONSTRAINT house_id_pk PRIMARY KEY(house_id),
    CONSTRAINT house_hosted_account_fk FOREIGN KEY(house_hosted_account) REFERENCES hosted(hosted_acc) ON UPDATE CASCADE ON DELETE CASCADE
);

-- 5
CREATE TABLE houses_images (
	hoim_id SERIAL,
	hoim_url_name VARCHAR(255),
    hoim_filesize INT,
    hoim_filetype VARCHAR(15),
    hoim_house_id INT,
    CONSTRAINT hoim_id_pk PRIMARY KEY(hoim_id),
    CONSTRAINT hoim_house_id_fk FOREIGN KEY (hoim_house_id) REFERENCES houses (house_id) ON UPDATE CASCADE ON DELETE CASCADE
);

-- 6
CREATE TABLE houses_reviews (
	hore_id SERIAL,
	hore_comments VARCHAR(255),
    hore_rating INT,
    hore_user_id INT,
    hore_house_id INT,
    CONSTRAINT hore_id_pk PRIMARY KEY(hore_id),
    CONSTRAINT hore_user_id_fk FOREIGN KEY(hore_user_id) REFERENCES users(user_id) ON UPDATE CASCADE ON DELETE CASCADE,
    CONSTRAINT hore_house_id_fk FOREIGN KEY(hore_house_id) REFERENCES houses(house_id) ON UPDATE CASCADE ON DELETE CASCADE
);

-- 7
CREATE TABLE houses_bedroom (
	hobed_id SERIAL,
	hobed_name VARCHAR(150),
    hobed_price NUMERIC(15,2),
    hobed_service_fee NUMERIC(15,2),
    hobed_house_id INT,
    CONSTRAINT hobed_id_pk PRIMARY KEY(hobed_id),
    CONSTRAINT hobed_house_id_fk FOREIGN KEY(hobed_house_id) REFERENCES houses(house_id) ON UPDATE CASCADE ON DELETE CASCADE
);

-- 8
CREATE TABLE houses_reserve (
	hove_id SERIAL,
	hove_created DATE,
    hove_status VARCHAR(15),
    hove_user_id INT,
    CONSTRAINT hove_id_pk PRIMARY KEY(hove_id),
    CONSTRAINT hove_user_id_fk FOREIGN KEY(hove_user_id) REFERENCES users(user_id) ON UPDATE CASCADE ON DELETE CASCADE
);

-- 9
CREATE SEQUENCE seq_order_name
INCREMENT 1
START 1
MINVALUE 1
MAXVALUE 999999999;

CREATE OR REPLACE FUNCTION ord_name() 
RETURNS VARCHAR AS $$
SELECT CONCAT('ORD',to_char(now(),'YYYYMMDD'),'#',lpad(''||nextval('seq_order_name'),3,'0'))
$$ LANGUAGE SQL;

CREATE TABLE orders (
    order_name VARCHAR(15) DEFAULT ord_name(),
    order_created DATE,
    order_subtotal NUMERIC(15,2),
    order_qty INT,
    order_tax NUMERIC(15,2),
    order_discount NUMERIC(15,2),
    order_promo NUMERIC(15,2),
    order_total_price NUMERIC(15,2),
    order_status VARCHAR(15),
    order_payment_type VARCHAR(15),
    order_payment_trx VARCHAR(15),
    order_user_id INT,
    CONSTRAINT order_name_pk PRIMARY KEY (order_name),
    CONSTRAINT order_user_id_fk FOREIGN KEY (order_user_id) REFERENCES users(user_id) ON UPDATE CASCADE ON DELETE CASCADE
);

-- 10
CREATE TABLE houses_reserve_lines (
	hrit_id SERIAL,
    hrit_checkin DATE,
    hrit_checkout DATE,
    hrit_adult INT,
    hrit_children INT,
    hrit_infant INT,
    hrit_total_nights INT,
    hrit_price NUMERIC(15,2),
    hrit_service_fee NUMERIC(15,2),
    hrit_subtotal NUMERIC(15,2),
    hrit_houses_id INT,
    hrit_hove_id INT,
    hrit_hobed_id INT,
    hrit_order_name VARCHAR(15),
    CONSTRAINT hrit_id_pk PRIMARY KEY (hrit_id),
    CONSTRAINT hrit_houses_id_fk FOREIGN KEY (hrit_houses_id) REFERENCES houses(house_id) ON UPDATE CASCADE ON DELETE CASCADE,
    CONSTRAINT hrit_hove_id_fk FOREIGN KEY (hrit_hove_id) REFERENCES houses_reserve(hove_id) ON UPDATE CASCADE ON DELETE CASCADE,
    CONSTRAINT hrit_hobed_id_fk FOREIGN KEY (hrit_hobed_id) REFERENCES houses_bedroom(hobed_id) ON UPDATE CASCADE ON DELETE CASCADE,
    CONSTRAINT hrit_order_name_fk FOREIGN KEY (hrit_order_name) REFERENCES orders(order_name) ON UPDATE CASCADE ON DELETE CASCADE
);

-- 11
CREATE SEQUENCE seq_bank_id
INCREMENT 1
START 1
MINVALUE 1
MAXVALUE 999999999;

CREATE OR REPLACE FUNCTION bank_id() 
RETURNS VARCHAR AS $$
SELECT lpad(''||nextval('seq_bank_id'),3,'0')
$$ LANGUAGE SQL;

CREATE TABLE bank (
	bank_id VARCHAR(3) DEFAULT bank_id(),
	bank_name VARCHAR(25),
	CONSTRAINT bank_id_pk PRIMARY KEY(bank_id)
);

-- 12
CREATE TABLE bank_account (
    baac_acc_bank VARCHAR(25) NOT NULL,
    baac_owner VARCHAR(85) NOT NULL,
    baac_saldo NUMERIC,
    baac_pin_number VARCHAR(6),
    baac_start_date DATE,
    baac_end_date DATE,
    baac_type VARCHAR(20) NOT NULL,
    baac_user_id INT,
    baac_bank_id VARCHAR(3),
    CONSTRAINT baac_acc_bank_pk PRIMARY KEY(baac_acc_bank),
    CONSTRAINT baac_user_id_fk FOREIGN KEY (baac_user_id) REFERENCES users (user_id) ON UPDATE CASCADE ON DELETE CASCADE,
    CONSTRAINT baac_bank_id_fk FOREIGN KEY (baac_bank_id) REFERENCES bank (bank_id) ON UPDATE CASCADE ON DELETE CASCADE
);

-- 13
CREATE SEQUENCE seq_acc_number
INCREMENT 1
START 1
MINVALUE 1
MAXVALUE 999999999;

CREATE OR REPLACE FUNCTION acc_number() 
RETURNS VARCHAR AS $$
SELECT CONCAT('ACP','-','ID','-',lpad(''||nextval('seq_acc_number'),4,'0'))
$$ LANGUAGE SQL;

CREATE TABLE account_payment (
	acc_number VARCHAR(15) NOT NULL DEFAULT acc_number(),
    acc_saldo NUMERIC,
    acc_pin_number VARCHAR(6),
    acc_total_point INT,
    acc_user_id INT,
    CONSTRAINT acc_number_pk PRIMARY KEY(acc_number),
    CONSTRAINT acc_user_id_fk FOREIGN KEY(acc_user_id) REFERENCES users(user_id) ON UPDATE CASCADE ON DELETE CASCADE
);

-- 14
CREATE SEQUENCE seq_trx_number
INCREMENT 1
START 1
MINVALUE 1
MAXVALUE 999999999;

CREATE OR REPLACE FUNCTION trx_number() 
RETURNS VARCHAR AS $$
SELECT CONCAT('P',to_char(now(),'YYYYMMDD'),'#',lpad(''||nextval('seq_trx_number'),5,'0'))
$$ LANGUAGE SQL;

CREATE TABLE payment_transaction (
	payt_id SERIAL,
    payt_trx_number VARCHAR(15) DEFAULT trx_number(),
    payt_order_number VARCHAR(150),
    payt_baac_acc_bank VARCHAR(25),
    payt_trx_number_ref VARCHAR(25),
    payt_date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    payt_debet NUMERIC,
    payt_credit NUMERIC,
    payt_desc VARCHAR(255),
    payt_type VARCHAR(20),
    payt_promo_point INT,
    payt_acc_number VARCHAR(15),
    CONSTRAINT payt_id_pk PRIMARY KEY(payt_id),
    CONSTRAINT payt_acc_number_fk FOREIGN KEY(payt_acc_number) REFERENCES account_payment(acc_number) ON UPDATE CASCADE ON DELETE CASCADE
);