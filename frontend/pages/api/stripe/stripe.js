import Stripe from 'stripe';
import { getSession } from '@auth0/nextjs-auth0';

const stripe = new Stripe(`${process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY}`);

export default async function handler(req,res) {

    const session = getSession(req, res);
    const user = session?.user;
    const stripeId = user['http://localhost:3000/stripe_customer_id'];

    if(req.method === "POST") {
        try {
            const session = await stripe.checkout.sessions.create({
                submit_type: 'pay',
                mode: 'payment',
                customer: stripeId,
                payment_method_types: ['card'],
                allow_promotion_codes: true,
                shipping_address_collection: {
                    allowed_countries: ['IT']
                },
                shipping_options: [{shipping_rate: 'shr_1M9UBzGM0kMASagvEEhsIwv8'}],
                line_items: req.body.data.map((item) => {
                    return {
                        price_data: {
                            currency: 'eur',
                            product_data: {
                                name: item.name,
                            },
                            unit_amount: item.price * 100,
                        },
                        adjustable_quantity: {
                            enabled: true,
                            minimum: 1
                        },
                        quantity: item.quantity,
                    };
                }),
                metadata: {
                    'delivery': req.body.delivery,
                    'date': req.body.date,
                    'time': req.body.time,
                },
                success_url: `${req.headers.origin}/ordina/conferma?&session_id={CHECKOUT_SESSION_ID}`,
                cancel_url: `${req.headers.origin}/ordina`,
            });
            res.status(200).json(session);
        } catch (error) {
            res.status(error.statusCode || 500).json(error.message);
        }
    }
}