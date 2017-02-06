FactoryGirl.define do
	factory :question do
    	user
        question { Faker::Lorem.sentence }
	end
end
