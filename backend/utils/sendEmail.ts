const SibApiV3Sdk = require("sib-api-v3-sdk");

export const sendEmail = async (
  to: string,
  subject: string,
  text: string
) => {
  try {
    console.log("USING BREVO API");

    const client = SibApiV3Sdk.ApiClient.instance;

    const apiKey = client.authentications["api-key"];

    apiKey.apiKey = process.env.BREVO_API_KEY;

    const tranEmailApi = new SibApiV3Sdk.TransactionalEmailsApi();

    const sender = {
      email: "tulsishuklag@gmail.com",
      name: "GiveHope",
    };

    const receivers = [
      {
        email: to,
      },
    ];

    const result = await tranEmailApi.sendTransacEmail({
      sender,
      to: receivers,
      subject,
      textContent: text,
    });

    console.log("EMAIL SENT:", result);

  } catch (error) {
    console.log("EMAIL ERROR:", error);
  }
};