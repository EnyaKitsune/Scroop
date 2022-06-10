getcodes = async (hex) => {
  let codesDropDown = document.getElementById("codes");

  if (hex.trim() === "") {
    codesDropDown.disabled = true;
    codesDropDown.selectedIndex = 0;
    return false;
  }
  const url = "hexs.json";

  await fetch(url)
    .then((response) => response.json())
    .then((data) => {
      let codes = data[hex];
      let out = "";
      out += `<option value="">Select code</option>`;
      for (let code of codes) {
        out += `<option value="${code}">${code}</option>`;
      }
      codesDropDown.innerHTML = out;
      codesDropDown.disabled = false;
    });
};

sendReport = async (event) => {
  event.preventDefault();
  const ign = document.getElementById("name").value;
  const hex = document.getElementById("hexs").value;
  const code = document.getElementById("codes").value;
  const harvester = document.getElementById("harvester").value;
  const fueltruck = document.getElementById("fueltruck").value;
  const message = document.getElementById("message").value;

  const webhookEmbed = {
    content: `New report from ${ign || "Anonymous"} <@&984621226817376266>`,
    embeds: [
      {
        title: "📝 Report", // ${war} #${report} (report number)
        fields: [
          { name: "In Game Name", value: ign || "Anonymous" },
          { name: "Hex", value: hex  },
          { name: "Code", value: code },
          { name: "Missing Harvesters", value: harvester || "0" },
          { name: "Missing Fuel Trucks", value: fueltruck || "0" },
          { name: "Notes", value: message || "none" },
        ],
      },
    ],
  };
  
  const webhookUrl = "https://discord.com/api/webhooks/968857242034130974/q9rLSkS8DrXUViMIXc3Z9KWPwPjUbKqJTnp7u-XtVs3K76apnkyjdy1_XfCIVwzsGN0M"; // replace with config file

  const response = await fetch(webhookUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(webhookEmbed),
  });

  if (response.ok) {
    alert("We have received your report! c:");
  } else {
    alert("There was an error! :c");
  }
}