import { Router } from 'express';
const router = Router();
const stripe = require('stripe')('sk_test_51OwuyFAYCK4MYNfBxKCFJCN7rDmQr0VGkkylRzvwmAc4cpq9prBlmcsVQU1I0whfolu5De7WfknH5r0KZAgLel410096ePzI5a');

router.post('/create-checkout-session', async (req, res) => {
  const { priceId } = req.body;

  try {
    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: 'http://localhost:5173/', // Replace URL with home page URL
      cancel_url: 'http://localhost:5173/cancel', // Replace URL
    });

    res.json({ id: session.id });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    res.status(500).json({ error: 'Unable to create checkout session' });
  }
});

export default router;
