# README

This project can be found live in the next link https://askme-ruby.herokuapp.com

* Pre-requisites
	* Ruby 2.3.1
	* Rails 5.0.1
	* rvm install ruby-2.3.1
	* gem install rails
* Used technologies
	* Ruby
	* Ruby on Rails
	* Bootstrap
	* Angularjs
	* Rspec for testing
	* Sqlite 
	* Posgresql
* Install project from scratch on Mac:
	* First install rvm
		* Follow 
	* Second Open terminal and run
		* rvm install ruby-2.3.1
		* gem install rails
	* Third Clone or download the project
		* Open terminal
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