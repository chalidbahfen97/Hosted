--table 1
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

--tabel 2
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

--tabel 3
CREATE SEQUENCE seq_acc_number
INCREMENT 1
START 1
MINVALUE 1
MAXVALUE 999999999;

CREATE OR REPLACE FUNCTION acc_number() 
RETURNS VARCHAR AS $$
SELECT CONCAT('ACP-ID-',lpad(''||nextval('seq_acc_number'),4,'0'))
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

--tabel 4
CREATE SEQUENCE seq_trx_number
INCREMENT 1
START 1
MINVALUE 1
MAXVALUE 999999999;

CREATE OR REPLACE FUNCTION trx_number() 
RETURNS VARCHAR AS $$
SELECT CONCAT('P',to_char(now(),'YYYYMMDD'),lpad(''||nextval('seq_trx_number'),5,'0'))
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