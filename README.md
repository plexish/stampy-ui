# Stampy UI Testing Grounds

- Testing future versions of UI for [stampy.ai](https://stampy.ai/read/Get_involved)
- Using [Remix](https://remix.run/docs) and [Cloudflare Workers](https://developers.cloudflare.com/workers)

## Development

```sh
$ npm run dev
```

## Deployment

Use [wrangler](https://developers.cloudflare.com/workers/cli-wrangler) to build and deploy your application to Cloudflare Workers. If you don't have it yet, follow [the installation guide](https://developers.cloudflare.com/workers/cli-wrangler/install-update) to get it setup. Be sure to [authenticate the CLI](https://developers.cloudflare.com/workers/cli-wrangler/authentication) as well.

If you don't already have an account, then [create a cloudflare account here](https://dash.cloudflare.com/sign-up) and after verifying your email address with Cloudflare, go to your dashboard and set up your free custom Cloudflare Workers subdomain.

Once that's done, you should be able to deploy your app:

```sh
npm run deploy
```

Live demo: https://stampy-ui.aprillion.workers.dev
