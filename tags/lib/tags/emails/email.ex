defmodule Tags.Emails.Email do
  import Bamboo.Email

  def tags_email(tags, email) do
    new_email
    |> from("tags@dowhile.com")
    |> subject("Confira as Tags mais usadas hoje!!!")
    |> to(email)
    |> html_body(tags)
  end
end
