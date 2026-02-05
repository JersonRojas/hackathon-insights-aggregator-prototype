export default async function handler(req, res) {
  console.log("RECEIVED FROM N8N:", req.body);

  return res.status(200).json({ ok: true });
}
