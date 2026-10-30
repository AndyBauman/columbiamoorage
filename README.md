# Columbia Moorage

Riverfront RV resort, private boat launch, and angler basecamp site for [columbiamoorage.com](https://columbiamoorage.com).

```bash
npm install
npm run dev
```

Reservation requests post to `src/app/api/inquiries/route.ts`. Set `INQUIRY_WEBHOOK_URL` when you want that route to forward the JSON payload. No database is required.

## Domain

The domain stays registered at GoDaddy. Point DNS at the Vercel project using the records Vercel shows after the domain is added — keep the existing `_dmarc` TXT and `_domainconnect` CNAME.
