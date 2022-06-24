CREATE DATABASE challenge_melhorcom;


CREATE TABLE devices (
    id  INT AUTO_INCREMENT PRIMARY KEY,
    model       VARCHAR(255),
    price       DECIMAL(19,2),
    brand       VARCHAR(255),
    startDate   DATE,
    endDate     DATE,
    color       VARCHAR(10),
    code        VARCHAR(8),
    UNIQUE (code)
);
