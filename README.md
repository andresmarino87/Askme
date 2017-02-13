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
* Install project and run on development mode from scratch on Mac:
	* First: Install rvm
		* Follow this instructions for installing  rvm -> https://rvm.io/rvm/install
	* Second: Open terminal and run:
		* rvm install ruby-2.3.1
		* gem install rails
	* Third: Clone or download the project
		* Unzipped and open terminal on the project
		* In app/assets/javascripts/home.js -> find "URL"(Line 4) in config and change it to you hosting's URL (if you are testing with default values use http://localhost:3000/ other wise won't work)
		* On Terminal run:
			* rvm use 2.3.1
			* bundle install --without staging production
			* rake db:migrate
			* rails s
		* Open your browser and check http://localhost:3000/ (in case you are using default rails port)			
* Unit testing:
	* Open the project on Terminal and run:
		* rspec
