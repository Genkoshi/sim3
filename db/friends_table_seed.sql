create table friends (
    id serial primary key,
    user_id integer references users(id),
    friend_id integer references users(id)
)