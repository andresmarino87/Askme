require 'rails_helper'

RSpec.describe Answer, type: :model do
	let(:answer)   { FactoryGirl.build :answer }

	it "has a valid factory question" do
		expect(answer).to be_valid
	end
end
