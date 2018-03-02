insert into users (auth_id)
values ($1)
returning *;