# README

This project can be found live in the next link https://askme-ruby.herokuapp.com

* Pre-requisites
	* Ruby 2.3.1
	* Rails 5.0.1
* Used technologies
	* Ruby
	* Ruby on Rails
	* Bootstrap
	* Angularjs
	* Rspec for testing
	* Sqlite 
	* Posgresql
* Installation
	* Clone or download the project
	* Unzipped if necessary
	* Run bundle install
	* Run rake db:migrate
	* In app/assets/javascripts/home.js -> find "URL" in config and change it to you hosting's URL (other wise won't work)
	* Run Rails s to test the project locally or deploy it in your hosting
	* Currently use postgresql for production (necessary for deploying on heroku) if you don't wish to use postgresql just remove gem "pg" and put gem 'sqlite3' outside any group and then run bundle install

* Unit testing:
    * All test are in the spec folder
    * To run this test in the project exec rspec