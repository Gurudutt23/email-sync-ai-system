import { ImapFlow } from "imapflow";
import { simpleParser } from "mailparser";
import { indexEmail } from "./esService";
import { classifyEmail } from "./aiService";
import { sendInterestedNotifications } from "./notifyService";


export const startIMAP = async (config: any) => {
  const client = new ImapFlow({
    host: config.host,
    port: config.port,
    secure: config.secure,
    auth: {
      user: config.user,
      pass: config.pass,
    },
  });

  await client.connect();
  console.log(`📬 Connected to IMAP: ${config.user}`);

  await client.mailboxOpen("INBOX");

  // Fetch last 30 days
  const since = new Date();
  since.setDate(since.getDate() - 30);

  for await (const msg of client.fetch(
    { since },
    { uid: true, source: true }
  )) {
    if (msg.source) {
      const parsed = await simpleParser(msg.source);
      await processEmail(parsed, config.user);
    }
  }

  // Real-time push via IDLE
  client.on("exists", async () => {
    const lock = await client.getMailboxLock("INBOX");
    try {
      const latest = await client.fetchOne("*", { source: true });

      if (latest && latest.source) {
        const parsed = await simpleParser(latest.source);
        await processEmail(parsed, config.user);
      }
    } finally {
      lock.release();
    }
  });
};

// Helper function
const processEmail = async (parsed: any, accountId: string) => {
  const emailData = {
    accountId,
    from: parsed.from?.text,
    to: parsed.to?.text,
    subject: parsed.subject,
    text: parsed.text,
    date: parsed.date,
    messageId: parsed.messageId,
  };

  await indexEmail(emailData);

  const label = await classifyEmail(emailData);
console.log(`📨 Email classified as: ${label}`);

if (label === "Interested") {
  await sendInterestedNotifications(emailData);
}  
};
