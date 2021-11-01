defmodule Tags.Emails.Get do
  alias Tags.Messages.Get

  def call do
    Get.today_messages()
    |> Enum.map(fn elem -> elem.email end)
    |> Enum.frequencies()
    |> Map.keys()
  end
end
