import axios from "axios";

export const sendInterestedNotifications = async (email: any) => {
  try {
    // Slack Webhook
    if (process.env.SLACK_WEBHOOK_URL) {
      await axios.post(process.env.SLACK_WEBHOOK_URL, {
        text: `*Interested Email Received* \nFrom: ${email.from} \nSubject: ${email.subject}`,
      });
      console.log("🔔 Slack notification sent");
    }

    // Webhook.site
    if (process.env.WEBHOOK_URL) {
      await axios.post(process.env.WEBHOOK_URL, email);
      console.log("🔔 Webhook triggered");
    }
  } catch (error) {
    console.error("❌ Error sending notification:", error);
  }
};
