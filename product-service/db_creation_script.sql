--create extension if not exists "uuid-ossp";

--create table products (
--	id uuid primary key default uuid_generate_v4(),
--	title text not null,
--	description text,
--	price integer
--);

--create table stocks (
--	product_id uuid, 
--	count integer,
--	foreign key ("product_id") references "products" ("id")
--);

--insert into products (title, description, price) values
--('Design Patterns: Elements of Reusable Object-Oriented Software', 'Capturing a wealth of experience about the design of object-oriented software, four top-notch designers present a catalog of simple and succinct solutions to commonly occurring design problems. Previously undocumented, these 23 patterns allow designers to create more flexible, elegant, and ultimately reusable designs without having to rediscover the design solutions themselves.', 52),
--('Code Complete: A Practical Handbook of Software Construction', 'Widely considered one of the best practical guides to programming, Steve McConnell’s original code complete has been helping developers write better software for more than a decade. Now this classic book has been fully updated and revised with leading-edge practices—and hundreds of new code samples—illustrating the art and science of software construction. Capturing the body of knowledge available from research, academia, and everyday commercial practice, McConnell synthesizes the most effective techniques and must-know principles into clear, pragmatic guidance. No matter what your experience level, development environment, or project size, this book will inform and stimulate your thinking—and help you build the highest quality code.', 55),
--('Clean Code: A Handbook of Agile Software Craftsmanship', 'Even bad code can function. But if code isn’t clean, it can bring a development organization to its knees. Every year, countless hours and significant resources are lost because of poorly written code. But it doesn’t have to be that way.', 56),
--('Refactoring: Improving the Design of Existing Code', 'Refactoring is about improving the design of existing code. It is the process of changing a software system in such a way that it does not alter the external behavior of the code, yet improves its internal structure. With refactoring you can even take a bad design and rework it into a good one. This book offers a thorough discussion of the principles of refactoring, including where to spot opportunities for refactoring, and how to set up the required tests. There is also a catalog of more than 40 proven refactorings with details as to when and why to use the refactoring, step by step instructions for implementing it, and an example illustrating how it works The book is written using Java as its principle language, but the ideas are applicable to any OO language.', 80),
--('You Don’t Know JS Yet: Get Started', 'It seems like there''s never been as much widespread desire before for a better way to deeply learn the fundamentals of JavaScript. But with a million blogs, books, and videos out there, just where do you START? Look no further! The worldwide best selling "You Don''t Know JS" book series is back for a 2nd edition: "You Don''t Know JS Yet". All 6 books are brand new, rewritten to cover all sides of JS for 2020 and beyond. "Get Started" prepares you for the journey ahead, first surveying the language then detailing how the rest of the You Don''t Know JS Yet book series guides you to knowing JS more deeply.', 15),
--('Algorithms', 'The latest edition of the essential text and professional reference, with substantial new material on such topics as vEB trees, multithreaded algorithms, dynamic programming, and edge-based flow.', 112),
--('Eloquent JavaScript: A Modern Introduction to Programming', 'Completely revised and updated, this best-selling introduction to programming in JavaScript focuses on writing real applications.', 89)

--insert into stocks (product_id, count) values
--('6bb23ad0-ff24-4d1c-88a5-8ea2b2313d46', 1),
--('ebf1b057-ea35-411e-a2f4-137a14b286aa', 12),
--('e8338056-a00e-4ee8-a66b-beeafc40431f', 3),
--('12ba21f1-1065-4b4c-b9f3-c9d4a7fbdc95', 0)

--drop table stocks;
--drop table products;

