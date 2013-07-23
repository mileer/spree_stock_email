class Spree::StockEmail < ActiveRecord::Base

  belongs_to :product

  validates :product, presence: true
  validates :email, presence: true, email: true

  validate :unique_product_email

  attr_accessible :email

  def self.email_exists?(product, email)
    exists?(product_id: product.id, email: email, sent_at: nil)
  end

  def self.notify(product)
    where("product_id = ? AND sent_at IS NULL", product.id).each { |e| e.notify }
  end

  def email_exists?
    self.class.email_exists?(product, email)
  end

  def notify
    Spree::StockEmailsMailer.stock_email(self).deliver
    mark_as_sent
  end

  private

  def unique_product_email
    errors.add :user, "already registered for notifications on this product" if email_exists?
  end

  def mark_as_sent
    update_attribute :sent_at, Time.zone.now
  end

end
