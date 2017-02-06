require 'rails_helper'

RSpec.describe User, type: :model do
    let(:user)   { FactoryGirl.build :user }

	it "has a valid factory user" do
		expect(user).to be_valid
	end

	it "when user has_many :Questions" do
		should have_many(:questions)
	end

	it "when user has_many :Answers" do
		should have_many(:answers)
	end
end
