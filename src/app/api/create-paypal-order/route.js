import { NextResponse } from "next/server";

const PAYPAL_API = "https://api-m.paypal.com";

async function getAccessToken() {
  try {
    const clientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;
    const clientSecret = process.env.PAYPAL_CLIENT_SECRET;

    if (!clientId || !clientSecret) {
      throw new Error("PayPal credentials are not configured");
    }

    const auth = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");
    const response = await fetch(`${PAYPAL_API}/v1/oauth2/token`, {
      method: "POST",
      headers: {
        Authorization: `Basic ${auth}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: "grant_type=client_credentials",
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("PayPal OAuth Error:", errorData);
      throw new Error("Failed to get PayPal access token");
    }

    const data = await response.json();
    return data.access_token;
  } catch (error) {
    console.error("getAccessToken Error:", error);
    throw error;
  }
}

export async function POST(request) {
  try {
    const { amount } = await request.json();

    // Validate amount
    const parsedAmount = parseFloat(amount);
    if (!parsedAmount || isNaN(parsedAmount) || parsedAmount <= 0) {
      return NextResponse.json(
        { error: "Invalid amount provided" },
        { status: 400 }
      );
    }

    // Format amount to 2 decimal places
    const formattedAmount = parsedAmount.toFixed(2);

    const accessToken = await getAccessToken();

    const orderData = {
      intent: "CAPTURE",
      purchase_units: [
        {
          amount: {
            currency_code: "USD",
            value: formattedAmount
          }
        }
      ],
      application_context: {
        return_url: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/success`,
        cancel_url: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/cancel`,
        user_action: "PAY_NOW"
      }
    };

    const response = await fetch(`${PAYPAL_API}/v2/checkout/orders`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderData)
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("PayPal Order Error:", data);
      throw new Error(data.message || "Failed to create PayPal order");
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Create Order Error:", error);
    return NextResponse.json(
      { error: error.message || "Error creating PayPal order" },
      { status: 500 }
    );
  }
} 