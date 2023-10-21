CREATE TABLE todolist (
    id SERIAL PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    description TEXT
);

INSERT INTO todolist (title, description) VALUES
('Grocery Shopping', 'Buy vegetables, fruits, and dairy products.'),
('Study for Exam', 'Review chapters 1 to 5 from the textbook.'),
('Book Doctor Appointment', 'Schedule a check-up for next month.'),
('Attend Team Meeting', 'Discuss the project milestones and updates.'),
('Finish Assignment', 'Complete and submit the software engineering assignment before the deadline.');