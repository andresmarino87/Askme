require 'rails_helper'

RSpec.describe Question, type: :model do
    let(:question)   { FactoryGirl.build :question }

	it "has a valid factory question" do
		expect(question).to be_valid
	end

	it "question when has_many :Answers" do
		should have_many(:answers)
	end
end
