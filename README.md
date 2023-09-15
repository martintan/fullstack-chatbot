# Chatbot

The project is a FastAPI server with a Next.js / React / TypeScript frontend.

The frontend is located in the `/frontend` folder.

I chose FastAPI because it lets me create the features I need to achieve the project in a small amount of time. 
If I had more time I would have possibly chosen either Go or Rust to scaffold the backend project.

Next.js / React with TypeScript is an easy choice.

## Project setup

Install dependencies
```
pip install -r requirements.txt
cd frontend
npm install
```

Configure environment variables
- Duplicate `.env.example` into `.env.local` and `frontend/.env.example` into `frontend/.env.local`
- Update the variables with the appropriate values

## 💁‍♀️ Run the application

```
# Run the FastAPI server
uvicorn main:app --reload

# Run the frontend dev server
npm run dev
```

## ✨ Deployment

- Vercel
- Railway.app
- Heroku

## 📝 Notes

- The app contains a chat bot using GPT 3.5 Turbo from Azure Studio. I had trouble accessing the model & API Key from your attachment so I used my personal deployment in Azure Studio. Besides the chat, there is an upload button which accepts the PDF file type and a response generated based on an uploaded document.

- The conversation messages are stored in the Postgres database I launched in Railway. I originally planned to have the backend on Railway alongside the database, but I found out last minute that the backend URL was stuck on HTTP (requires custom domain for HTTPS and I don't have time to set it up). I have the backend on Heroku and it works fine (HTTPS)

- Chat request / response happens via Websocket

- Responses are generated using openai's chat completion. I was looking into text embeddings and saving it in Postgres with pgvector or an external Supabase DB with vector support (because it's free), but I didn't have time to finish the implementation.