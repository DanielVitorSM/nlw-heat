defmodule Tags.Emails.Send do
  alias Tags.Emails.Get
  alias Tags.Emails.Email
  alias Tags.Tags.Count
  alias Tags.Mailer

  def call do
    tags = Count.call()
    Get.call()
    |> Enum.map(&send_email(tags, &1))
  end

  defp send_email(tags, email) do
    Email.tags_email(tags, email)
    |> Mailer.deliver_later
  end
end
