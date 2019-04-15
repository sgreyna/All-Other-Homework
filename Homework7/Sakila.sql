/*============================================================================================
Name:  Reyna Gaoaen
Homework:  SQL Assignment
Date:  4/15/2019
============================================================================================*/

/*-----------------------------------------------------
Specificy database
-----------------------------------------------------*/

Use Sakila;

/*-----------------------------------------------------
* 1a. Display the first and last names of all actors from the table `actor`.
* 1b. Display the first and last name of each actor in a single column in upper case letters. Name the column `Actor Name`.
-----------------------------------------------------*/

-- 1a.
select first_name, last_name
from sakila.actor;

-- 1b.
select upper(concat(first_name,' ',last_name)) as 'Actor Name'
from sakila.actor;

/*-----------------------------------------------------
* 2a. You need to find the ID number, first name, and last name of an actor, of whom you know only the first name, "Joe." What is one query would you use to obtain this information?
* 2b. Find all actors whose last name contain the letters `GEN`:
* 2c. Find all actors whose last names contain the letters `LI`. This time, order the rows by last name and first name, in that order:
* 2d. Using `IN`, display the `country_id` and `country` columns of the following countries: Afghanistan, Bangladesh, and China:
-----------------------------------------------------*/
-- 2a.
select actor_id, first_name, last_name
from sakila.actor
where first_name ='Joe';

-- 2b.
select *
from sakila.actor
where upper(last_name) like '%GEN%';

-- 2c.
select *
from sakila.actor
where upper(last_name) like '%LI%'
order by last_name, first_name asc;

-- 2d.
select *
from sakila.country
where upper(country) in ('AFGHANISTAN', 'BANGLADESH', 'CHINA');

/*-----------------------------------------------------
* 3a. You want to keep a description of each actor. You don't think you will be performing queries on a description, 
so create a column in the table `actor` named `description` and use the data type `BLOB` (Make sure to research the type `BLOB`, 
as the difference between it and `VARCHAR` are significant).
* 3b. Very quickly you realize that entering descriptions for each actor is too much effort. Delete the `description` column.
-----------------------------------------------------*/
-- 3a.
Alter table sakila.actor
add column (description blob );

select * 
from sakila.actor
limit 2;

-- 3b.
Alter table sakila.actor
drop column description ;

select * 
from sakila.actor
limit 2;

/*-----------------------------------------------------
* 4a. List the last names of actors, as well as how many actors have that last name.
* 4b. List last names of actors and the number of actors who have that last name, but only for names that are shared by at least two actors
* 4c. The actor `HARPO WILLIAMS` was accidentally entered in the `actor` table as `GROUCHO WILLIAMS`. Write a query to fix the record.
* 4d. Perhaps we were too hasty in changing `GROUCHO` to `HARPO`. It turns out that `GROUCHO` was the correct name after all! 
In a single query, if the first name of the actor is currently `HARPO`, change it to `GROUCHO`.
-----------------------------------------------------*/
-- 4a.
select last_name, count(*) 'number of actors'
from sakila.actor
group by last_name;

-- 4b.
select last_name, count(*) 'number of actors'
from sakila.actor
group by last_name
having count(*)>=2;

-- 4c.
select *
from sakila.actor
where last_name = 'WILLIAMS'
and first_name = 'GROUCHO';

update sakila.actor
set first_name = 'HARPO'
where last_name = 'WILLIAMS'
and first_name = 'GROUCHO';

-- 4d.
select *
from sakila.actor
where first_name = 'HARPO';

update sakila.actor
set first_name = 'GROUCHO'
where last_name = 'WILLIAMS'
and first_name = 'HARPO';

select *
from sakila.actor
where last_name = 'WILLIAMS';

/*-----------------------------------------------------
* 5a. You cannot locate the schema of the `address` table. Which query would you use to re-create it?
  * Hint: [https://dev.mysql.com/doc/refman/5.7/en/show-create-table.html](https://dev.mysql.com/doc/refman/5.7/en/show-create-table.html)
-----------------------------------------------------*/
-- 5a.
show create table address;
 
CREATE TABLE `address` (
  `address_id` smallint(5) unsigned NOT NULL AUTO_INCREMENT,
  `address` varchar(50) NOT NULL,
  `address2` varchar(50) DEFAULT NULL,
  `district` varchar(20) NOT NULL,
  `city_id` smallint(5) unsigned NOT NULL,
  `postal_code` varchar(10) DEFAULT NULL,
  `phone` varchar(20) NOT NULL,
  `location` geometry NOT NULL,
  `last_update` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`address_id`),
  KEY `idx_fk_city_id` (`city_id`),
  SPATIAL KEY `idx_location` (`location`),
  CONSTRAINT `fk_address_city` FOREIGN KEY (`city_id`) REFERENCES `city` (`city_id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=606 DEFAULT CHARSET=utf8;

/*-----------------------------------------------------
* 6a. Use `JOIN` to display the first and last names, as well as the address, of each staff member. Use the tables `staff` and `address`:
* 6b. Use `JOIN` to display the total amount rung up by each staff member in August of 2005. Use tables `staff` and `payment`.
* 6c. List each film and the number of actors who are listed for that film. Use tables `film_actor` and `film`. Use inner join.
* 6d. How many copies of the film `Hunchback Impossible` exist in the inventory system?
* 6e. Using the tables `payment` and `customer` and the `JOIN` command, list the total paid by each customer. List the customers alphabetically by last name:
  ![Total amount paid](Images/total_payment.png)
-----------------------------------------------------*/
-- 6a
select * from staff;

select first_name, last_name, address
from sakila.staff a 
inner join sakila.address b
on a.address_id = b.address_id;

-- 6b
select a.first_name, a.last_name,  sum(amount) 'Amt'
from sakila.staff a 
inner join sakila.payment b
on a.staff_id = b.staff_id
where payment_date between '2005-08-01' and '2005-08-31'
group by a.first_name, a.last_name;

-- 6c 

select title, count(distinct actor_id) 'Cnt of actor'
from sakila.film a 
inner join sakila.film_actor b 
on a.film_id = b.film_id
group by title;

-- 6d
select title, count(distinct inventory_id) 'Cnt of film'
from sakila.film a 
inner join sakila.inventory b 
on a.film_id = b.film_id
where title = 'Hunchback Impossible'
group by title;

-- 6e
select first_name, last_name, sum(amount) 'Amt Paid'
from sakila.customer cust
left join sakila.payment pay
on cust.customer_id = pay.customer_id
group by first_name, last_name 
order by last_name asc;

/*-----------------------------------------------------
* 7a. The music of Queen and Kris Kristofferson have seen an unlikely resurgence. As an unintended consequence, films starting with the letters `K` and `Q` have also soared in popularity. 
Use subqueries to display the titles of movies starting with the letters `K` and `Q` whose language is English.
* 7b. Use subqueries to display all actors who appear in the film `Alone Trip`.
* 7c. You want to run an email marketing campaign in Canada, for which you will need the names and email addresses of all Canadian customers. Use joins to retrieve this information.
* 7d. Sales have been lagging among young families, and you wish to target all family movies for a promotion. Identify all movies categorized as _family_ films.
* 7e. Display the most frequently rented movies in descending order.
* 7f. Write a query to display how much business, in dollars, each store brought in.
* 7g. Write a query to display for each store its store ID, city, and country.
* 7h. List the top five genres in gross revenue in descending order. (**Hint**: you may need to use the following tables: category, film_category, inventory, payment, and rental.)
-----------------------------------------------------*/
-- 7a
select *
from sakila.film
where (title like 'K%' or title like 'Q%')
and language_id in (select distinct language_id from sakila.language where name = 'English') ;

-- 7b
select *
from sakila.actor
where actor_id in (select distinct actor_id
					from sakila.film_actor
					where film_id in (select distinct film_id
										from sakila.film
										where title = 'Alone Trip'));

-- 7c
select a.first_name,a.last_name, a.email
from sakila.customer a
inner join sakila.address b on a.address_id = b.address_id
inner join sakila.city c on b.city_id = c.city_id
inner join sakila.country d on c.country_id = d.country_id
where d.country = 'Canada';

-- 7d

select a.title
from film a, film_category b, category c
where a.film_id = b.film_id
and c.category_id = b.category_id
and c.name = 'Family';

-- 7e
select title, rental_rate
from film
order by rental_rate desc, title asc;

-- 7f
select *
from sales_by_store;

-- 7g
select a.store_id, c.city, d.country
from store a, address b, city c, country d
where a.address_id  = b.address_id
and b.city_id = c.city_id
and c.country_id = d.country_id;

-- 7h    
select c.name, sum(amount) as 'revenue'
from payment p left join rental r on p.rental_id = r.rental_id
left join inventory i on i.inventory_id = r.inventory_id
left join film f on f.film_id = i.film_id
left join film_category fc on fc.film_id = f.film_id
left join category c on c.category_id = fc.category_id
group by c.name
order by sum(amount) desc
limit 5;


/*-----------------------------------------------------
* 8a. In your new role as an executive, you would like to have an easy way of viewing the Top five genres by gross revenue. Use the solution from the problem above to create a view. 
If you haven't solved 7h, you can substitute another query to create a view.
* 8b. How would you display the view that you created in 8a?
* 8c. You find that you no longer need the view `top_five_genres`. Write a query to delete it.
-----------------------------------------------------*/

-- 8a
create view SalesRevenue_by_Category as
select c.name, sum(amount) as 'revenue'
from payment p left join rental r on p.rental_id = r.rental_id
left join inventory i on i.inventory_id = r.inventory_id
left join film f on f.film_id = i.film_id
left join film_category fc on fc.film_id = f.film_id
left join category c on c.category_id = fc.category_id
group by c.name
order by sum(amount) desc
limit 5;

-- 8b

select * from SalesRevenue_by_Category;

-- 8c
drop view SalesRevenue_by_Category;

