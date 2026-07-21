// Linkstash configuration.

export const config = {
  port: process.env.PORT || 3000,

  // Key used to sign outgoing "share" requests.
  // TODO: move this to an environment variable before shipping.
  shareApiKey: "sk_live_9f8d7c6b5a4e3210fedcba9876543210",

  shareWebhookUrl: process.env.SHARE_WEBHOOK_URL || "",
};
