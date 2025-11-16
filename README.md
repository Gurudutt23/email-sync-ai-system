\# AI-Powered Email Intelligence System  

Real-time Email Sync · Elasticsearch Search · AI Categorization · Slack Alerts · Suggested Replies



This project is an end-to-end email intelligence system that connects to IMAP accounts in real-time, indexes emails in Elasticsearch, categorizes them using AI, and provides Slack/webhook notifications along with a clean Angular UI for viewing and searching emails.



---



\## Features



\### 1. Real-Time IMAP Synchronization

\- Connects to multiple IMAP accounts.

\- Fetches last 30 days of emails.

\- Uses IDLE mode for real-time updates (no cron jobs).

\- Persistent IMAP connections for live syncing.



\### 2. Searchable Email Storage with Elasticsearch

\- Stores emails in a locally hosted Elasticsearch Docker container.

\- Supports:

&nbsp; - Full text search  

&nbsp; - Filter by folder  

&nbsp; - Filter by account  



\### 3. AI-Based Email Categorization

Emails are categorized using an AI model into:

\- Interested  

\- Meeting Booked  

\- Not Interested  

\- Spam  

\- Out of Office  



\### 4. Automations: Slack + Webhooks

\- Sends Slack notifications for Interested emails.

\- Triggers webhook (webhook.site) when email is marked Interested.



\### 5. Frontend (Angular)

\- Clean modern UI.

\- Email list and email viewer components.

\- Category badges.

\- Search + filters powered by Elasticsearch.



\### 6. AI Suggested Replies (RAG)

\- Stores context in a vector database.

\- Uses RAG to generate reply suggestions.

\- Example:  

&nbsp; - Email: “Your resume is shortlisted…”  

&nbsp; - AI Suggestion: “Thank you… You can book a slot here…”  



---



\## Tech Stack



\### Backend

\- Node.js + Express  

\- IMAP (node-imap)  

\- Elasticsearch (Docker)  

\- LLM (Gemini / OpenAI)  

\- Slack Webhooks  

\- HTTP Webhooks  



\### Frontend

\- Angular  

\- Standalone components  

\- Responsive UI  

\- Angular HTTP Client  



\### Infrastructure

\- Docker  

\- Vector Database (Chroma / Pinecone / similar)  



---



\## Project Structure



backend/  

&nbsp; src/  

&nbsp;   controllers/  

&nbsp;   routes/  

&nbsp;   services/  

&nbsp; .env (NOT uploaded)  

&nbsp; package.json  



frontend/  

&nbsp; onebox-ui/  

&nbsp;   src/  

&nbsp;     app/  

&nbsp;     assets/  

&nbsp;   angular.json  

&nbsp;   package.json  



docker/  

&nbsp; elasticsearch.yml  



---



\## Environment Variables (Backend)



Create `.env` (DO NOT COMMIT):



IMAP\_USER1=  

IMAP\_PASS1=  

IMAP\_HOST1=  

IMAP\_PORT1=  



ELASTIC\_URL=http://localhost:9200  



SLACK\_WEBHOOK\_URL=  

AI\_API\_KEY=  

WEBHOOK\_URL=  



---



\## How to Run



\### Backend

cd backend  

npm install  

npm run dev  



\### Frontend

cd frontend/onebox-ui  

npm install  

ng serve -o  



\### Start Elasticsearch (Docker)

docker run -p 9200:9200 -e "discovery.type=single-node" elasticsearch:8.13.0  



---



\## API Endpoints



\### Fetch all emails

GET /api/emails/all  



\### Create an email (manual test)

POST /api/emails  

{  

&nbsp; "from": "",  

&nbsp; "subject": "",  

&nbsp; "text": ""  

}  



---



\## Notes for Evaluators

\- `.env`, `node\_modules`, `dist` are intentionally not uploaded.

\- Frontend communicates with backend on port 4000.

\- Elasticsearch runs locally on port 9200.

\- AI model handles categorization + suggested replies.



---



\## Author

Gurudutt Sahu  

Full Stack Developer • Excel VBA Automation • AI Integrations  

Email: guruduttsahu23@gmail.com  

LinkedIn: https://www.linkedin.com/in/gurudutt-sahu-899526383/



