create table if not exists user_info (
    id serial primary key,
    user_id integer references users(id),
    first_name varchar(50),
    last_name varchar(50),
    gender varchar(15),
    hair_color varchar(15),
    eye_color varchar(15),
    hobby varchar(300),
    birthday integer,
    birth_month integer,
    birth_year integer,
    img text
);