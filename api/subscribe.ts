import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  const { email } = req.body;
  const trimmed = email?.trim?.().toLowerCase();

  if (!trimmed || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
    return res.status(400).json({ success: false, message: 'Invalid email format' });
  }

  const isUnsubscribe = req.query.action === 'unsubscribe';

  if (isUnsubscribe) {
    const { error } = await supabase
      .from('subscribers')
      .update({ status: 'unsubscribed' })
      .eq('email', trimmed);
    if (error) return res.status(500).json({ success: false, message: error.message });
    return res.json({ success: true, message: 'Unsubscribed' });
  }

  const { error } = await supabase
    .from('subscribers')
    .upsert({ email: trimmed, status: 'active' }, { onConflict: 'email' });

  if (error) {
    if (error.code === '23505') {
      return res.json({ success: false, alreadySubscribed: true, message: "You're already subscribed! ✓" });
    }
    return res.status(500).json({ success: false, message: error.message });
  }

  return res.json({ success: true, message: 'Subscribed successfully' });
}