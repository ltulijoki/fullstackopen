CREATE TABLE blogs (
    id SERIAL PRIMARY KEY,
    author TEXT,
    url TEXT NOT NULL,
    title TEXT NOT NULL,
    likes INTEGER DEFAULT 0
);
INSERT INTO blogs (author, url, title) VALUES ('testaaja', 'http://urli.fi', 'blogi');
INSERT INTO blogs (url, title, likes) VALUES ('http://urli.fi', 'toinen blogi', 100);