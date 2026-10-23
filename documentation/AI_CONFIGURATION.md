# AI Configuration

Configure keys in `backend/.env` and restart the backend. Keep keys out of the
frontend and Git. The backend tries Groq first, then OpenAI.

```env
GROQ_API_KEY=your_actual_groq_key
GROQ_MODEL=openai/gpt-oss-120b
```

`GROQ_MODEL` is optional and defaults to `openai/gpt-oss-120b`. The previous
`llama-3.3-70b-versatile` returned `model_not_found` for this app.
Current availability: https://console.groq.com/docs/models

Chat sends the current question and up to 10 recent messages. EduBot answers in
the user's language, including Bengali. Failed providers or missing keys return
HTTP 503; both chat interfaces display the error instead of a canned answer.
Old demo replies remain in history. Use Clear Chat for a fresh conversation.

Roadmap and skill analysis also return HTTP 503 when providers fail. No AI tool
substitutes a demo response for a failed generation.
`GEMINI_API_KEY` is not currently used by this service.

Run chat regression tests from `backend`:

```powershell
node --test tests/aiService.test.js
```
