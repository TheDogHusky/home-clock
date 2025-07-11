![image](https://github.com/user-attachments/assets/8943e8a9-6eb3-4f05-8e26-58850abeba1b)
# Home Clock

Home Clock is a simple, customizable and minimalistic clock web application built with Nuxt 3.

It can:

- Display the current time in various formats.
- Display a countdown timer.
- Display a stopwatch.
- *Schedule alarms. (soon)*

Yes, it is overengineered for a clock app, but it is built with the intention of being fully customizable.

Check out the [demo](https://clock.classydev.fr).

## Why?

I'm terrible at concentrating on studying. I found a way: setting timers for each tasks with breaks. But an issue came: all clock websites have a bunch of useless bloat, features, ads, and other distractions.

So I decided to build my own clock app that is simple, minimalistic, and distraction-free. It has only the features I need, and nothing more.

You can fullscreen it to cover the entire screen with just the clock, nothing else, helping you focus on your tasks.

## Contributing

Make sure to install dependencies:

```bash
yarn install
```

Start the development server on `http://localhost:3000`:

```bash
yarn dev
```

## Deploying your own instance

SImply clone the repository, run `yarn build` and `node .output/server/index.mjs`. Don't forget the `NITRO_PORT` env variable!
