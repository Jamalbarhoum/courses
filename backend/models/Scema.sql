
CREATE TABLE Roles (
    id SERIAL NOT NULL,
    role VARCHAR(255) NOT NULL,
    PRIMARY KEY (id)
);


CREATE TABLE Permissions (
    id SERIAL NOT NULL,
    permission VARCHAR(255) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE role_permission (
    id SERIAL NOT NULL,
    role_id INT,
    permission_id INT,
    FOREIGN KEY (role_id) REFERENCES Roles (id),
    FOREIGN KEY (permission_id) REFERENCES Permissions (id),
    PRIMARY KEY (id)
);

CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    role_id INT
    FOREIGN KEY (role_id) REFERENCES Roles (id)
);

CREATE TABLE courses (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    image TEXT,
    teacher_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    FOREIGN KEY (teacher_id) REFERENCES users (id) ON DELETE CASCADE
);

