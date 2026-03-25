const cron = require("node-cron");

console.log("Heartbeat system started...");

function getData() {
  return {
    messages: [
      { urgent: true },
      { urgent: false }
    ],
    deals: [{ updated: true }],
    projects: [{ risk: true }]
  };
}

function generateDigest(data) {
  const urgent = data.messages.filter(m => m.urgent).length;
  const deals = data.deals.length;
  const risks = data.projects.length;

  return `
🔥 Urgent Messages: ${urgent}
📊 Deals Updated: ${deals}
⚠️ Project Risks: ${risks}
`;
}

cron.schedule("*/5 * * * * *", () => {
  const data = getData();

  console.log(`\n🕒 ${new Date().toLocaleTimeString()}`);
  console.log("------ HEARTBEAT ------");
  console.log(generateDigest(data));
  console.log("------------------------");
});