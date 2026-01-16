# frozen_string_literal: true

require "rails_helper"

RSpec.describe Setting, type: :model do
  describe "validations" do
    it "requires key" do
      setting = described_class.new(value: "test")
      expect(setting).not_to be_valid
    end

    it "requires unique key" do
      create(:setting, key: "test_key", value: "value1")
      duplicate = described_class.new(key: "test_key", value: "value2")
      expect(duplicate).not_to be_valid
    end
  end

  describe ".get" do
    it "returns value for existing key" do
      create(:setting, key: "test_key", value: "100.50")
      expect(described_class.get("test_key")).to eq(100.50)
    end

    it "returns default for non-existing key" do
      expect(described_class.get("non_existing", "default")).to eq("default")
    end

    it "parses numeric values" do
      create(:setting, key: "numeric", value: "123.45")
      expect(described_class.get("numeric")).to eq(123.45)
    end
  end

  describe ".set" do
    it "creates new setting" do
      described_class.set("new_key", "new_value")
      expect(described_class.find_by(key: "new_key").value).to eq("new_value")
    end

    it "updates existing setting" do
      create(:setting, key: "existing", value: "old")
      described_class.set("existing", "new")
      expect(described_class.find_by(key: "existing").value).to eq("new")
    end
  end
end
